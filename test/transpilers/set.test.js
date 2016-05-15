require('should');

const Primitive = require('../../build/classes/Primitive');
const Identifier = require('../../build/classes/Identifier');
const SetlSet = require('../../build/classes/SetlSet');
const List = require('../../build/classes/List');
const Range = require('../../build/classes/Range');
const Generator = require('../../build/classes/Generator');
const Iterator = require('../../build/classes/Iterator');

const types = require('../../build/constants/types');

const transpile = require('../../build/transpile')();

function int(number) {
  return Primitive(types.INTEGER, number);
}

function bool(val) {
  return Primitive(types.BOOLEAN, val);
}

const list = List([int(1), int(2), int(3)]);

describe('transpilers/set', () => {
  it('should transpile listings', () => {
    transpile(SetlSet([int(1), int(23), int(12)])).should.be.exactly('$s([1, 23, 12])');
  });

  it('should transpile ranges', () => {
    transpile(SetlSet(Range(int(1), int(3000)))).should.be.exactly('$s($range(1, 3000))');
  });

  it('should transpile generators', () => {
    const tree = SetlSet(Generator(Identifier('x'), [Iterator(Identifier('x'), list)], bool(true)));
    transpile(tree).should.be.exactly('$gen([1, 2, 3]).filter(x => true).map(x => x).set');
  });
});
