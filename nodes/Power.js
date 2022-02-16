export default class Power {
  constructor (...operands) {
    this.operands = operands;
    this.name = 'Power';
  }

  copy () {
    return new Power(this.operands[0].copy(), this.operands[1].copy());
  }

  execute () {
    return this.operands[0].execute() ** this.operands[1].execute();
  }

  toString () {
    return `(${this.operands[0].toString()}) ** (${this.operands[1].toString()})`;
  }
}
