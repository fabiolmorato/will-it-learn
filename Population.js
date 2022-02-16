import GeneticProgram from "./GeneticProgram.js";

export default class Population {
  constructor (initialSize = 8) {
    this.programs = new Array(initialSize).fill(0).map(_ => new GeneticProgram());
    this.variables = [];
    this.currentGeneration = 1;

    this.fitnessFunction = () => 0;
    this.fitnessOrderFunction = (a, b) => a - b;
  }

  registerContextVariables (...variables) {
    this.variables.push(...variables);
  }

  init () {
    for (const program of this.programs) {
      this.variables.forEach(variable => program.addConstant(variable));
      program.init();
    }
  }

  runGeneration (variables) {
    const results = this.programs.map(program => program.execute(variables));
    const score = results.map((result, index) => ({ score: this.fitnessFunction(result), index }));
    score.sort(this.fitnessOrderFunction);

    const winners = score.map(score => this.programs[score.index]).slice(0, 2);

    winners.push(...new Array(3).fill(0).map(_ => winners[0].breed(winners[1])));
    winners.push(...new Array(3).fill(0).map(_ => winners[1].breed(winners[0])));

    this.programs.splice(0, this.programs.length, ...winners);
  }

  setFitnessFunction (fitnessFunction) {
    this.fitnessFunction = fitnessFunction;
  }
  
  setFitnessOrderFunction (fitnessOrderFunction) {
    this.fitnessOrderFunction = fitnessOrderFunction;
  }

  execute (variables) {
    return this.programs[0].execute(variables);
  }

  getProgram () {
    return this.programs[0].ast.toString();
  }
}
