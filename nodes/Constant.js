export default class Constant {
  constructor (lex) {
    this.lex = lex;
    this.name = "Constant";
  }

  copy () {
    return new Constant(this.lex);
  }

  execute () {
    return Constant.lookupMap[this.lex];
  }

  toString () {
    return `${this.lex}`;
  }

  static setLookupMap (map) {
    Constant.lookupMap = map;
  }
}

Constant.lookupMap = {};
