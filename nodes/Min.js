export default class Min {
  constructor (...operands) {
    this.operands = operands;
    this.name = 'Min';
  }

  copy () {
    return new Min(this.operands[0].copy(), this.operands[1].copy());
  }

  execute () {
    return Math.min(this.operands[0].execute(), this.operands[1].execute());
  }

  toString () {
    return `Math.min(${this.operands[0].toString()}, ${this.operands[1].toString()})`;
  }
}
