export default class Log {
  constructor (...operands) {
    this.operands = operands;
    this.name = 'Log';
  }

  copy () {
    return new Log(this.operands[0].copy());
  }

  execute () {
    return Math.log(this.operands[0].execute());
  }

  toString () {
    return `Math.log(${this.operands[0].toString()})`;
  }
}
