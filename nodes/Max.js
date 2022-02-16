export default class Max {
  constructor (...operands) {
    this.operands = operands;
    this.name = 'Max';
  }

  copy () {
    return new Max(this.operands[0].copy(), this.operands[1].copy());
  }

  execute () {
    return Math.max(this.operands[0].execute(), this.operands[1].execute());
  }

  toString () {
    return `Math.max(${this.operands[0].toString()}, ${this.operands[1].toString()})`;
  }
}
