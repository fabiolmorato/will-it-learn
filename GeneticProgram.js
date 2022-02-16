import * as Nodes from "./nodes/index.js";
import random from "./utils/random.js";

export default class GeneticProgram {
  constructor (mutationProbability = 0.1, crossoverProbability = 0.2) {
    this.values = [];
    this.constants = [];

    this.mutationProbability = mutationProbability;
    this.crossoverProbability = crossoverProbability;
  }

  init () {
    const initialValues = this.values.length + this.constants.length;
    for (let i = initialValues; i < 2; i++) {
      this.createRandomValue();
    }

    this.ast = this.createRandomNode();
  }

  execute (context) {
    if (!this.ast) {
      return null;
    }

    Nodes.Constant.setLookupMap(context);
    return this.ast.execute();
  }

  linearize (root = this.ast, parent = null) {
    if (root instanceof Nodes.Value || root instanceof Nodes.Constant) {
      return [{
        root,
        parent
      }];
    }

    const nodes = [];

    nodes.push({ root, parent });
    
    for (const operand of root.operands) {
      if (operand instanceof Nodes.Value || operand instanceof Nodes.Constant) {
        nodes.push({ root: operand, parent: root });
      } else {
        nodes.push(...this.linearize(operand, root));
      }
    }

    return nodes;
  }

  addConstant (lex) {
    this.constants.push(new Nodes.Constant(lex));
  }

  mutate () {
    const linearized = this.linearize();
    
    if (Math.random() < this.mutationProbability) {
      const minValue = Math.random() < 0.02 ? 0 : 1;
      const shouldMutate = random(minValue, linearized.length);

      if (shouldMutate === 0) {
        this.ast = this.createRandomNode();
      } else if (linearized.length > 1) {
        const removedNode = linearized[shouldMutate].root;
        const parent = linearized[shouldMutate].parent;
        
        const index = parent.operands.findIndex(op => op === removedNode);
        const newNode = this.createRandomNode();
        parent.operands[index] = newNode;
      }
    }
  }

  crossover (program) {
    const linearized = this.linearize();

    if (Math.random() < this.crossoverProbability) {
      const linearizedProgram = program.linearize();
      const shouldCrossover = random(0, linearized.length);
      const linearizedProgramRoot = random(0, linearizedProgram.length);

      if (shouldCrossover === 0) {
        this.ast = linearizedProgram[linearizedProgramRoot].root.copy();
        
        for (const value of program.values) {
          this.values.push(value.copy());
        }
      }
    }
  }

  removeUnnecessaryValues () {
    const linearized = this.linearize();
    const newValuesList = [];

    for (const value of this.values) {
      if (linearized.find(v => v === value)) {
        newValuesList.push(value);
      }
    }

    this.values = newValuesList;
  }

  createRandomNode () {
    const allValues = [...this.values, ...this.constants];

    const firstValueIndex = random(0, allValues.length);
    const secondValueIndex = random(0, allValues.length - 1);

    const firstValue = allValues[firstValueIndex];
    allValues.splice(firstValueIndex, 1);
    const secondValue = allValues[secondValueIndex];

    const allNodes = Object.keys(Nodes);
    allNodes.splice(allNodes.findIndex(node => node === Nodes.Value), 1);
    allNodes.splice(allNodes.findIndex(node => node === Nodes.Constant), 1);
    const randomNodeIndex = random(0, allNodes.length);

    return new Nodes[allNodes[randomNodeIndex]](firstValue, secondValue);
  }

  createRandomValue () {
    const randomValue = random(-65536, 65535);
    this.values.push(new Nodes.Value(randomValue));
  }

  breed (program) {
    const child = this.copy();

    child.createRandomValue();
    child.crossover(program);
    child.mutate();
    child.removeUnnecessaryValues();

    return child;
  }

  copy () {
    const ast = this.ast.copy();
    const values = this.values.map(v => v.copy());
    const constants = this.constants.map(c => c.copy());

    const newProgram = new GeneticProgram(this.mutationProbability, this.crossoverProbability);
    newProgram.ast = ast;
    newProgram.values = values;
    newProgram.constants = constants;

    return newProgram;
  }
}
