export default class Round {
  constructor (...operands) {
    this.operands = operands;
    this.name = 'Power';
  }

  copy () {
    return new Round(this.operands[0]);
  }

  execute () {
    return this.operands[0].execute() << 0;
  }

  toString () {
    return `Math.round(${this.operands[0].toString()})`;
  }
}
