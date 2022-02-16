export default class Value {
  constructor (...operands) {
    this.operands = operands;
    this.name = 'Value';
  }

  copy () {
    return new Value(this.operands[0]);
  }

  execute () {
    return this.operands[0];
  }

  toString () {
    return `${this.operands[0]}`;
  }
}
