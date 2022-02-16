import Population from "../../Population.js";
import random from "../../utils/random.js";

const shouldGoUpPopulation = new Population();
const shouldGoDownPopulation = new Population();
const shouldGoLeftPopulation = new Population();
const shouldGoRightPopulation = new Population();

shouldGoUpPopulation.registerContextVariables('y', 'goalY');
shouldGoDownPopulation.registerContextVariables('y', 'goalY');
shouldGoLeftPopulation.registerContextVariables('x', 'goalX');
shouldGoRightPopulation.registerContextVariables('x', 'goalX');

shouldGoUpPopulation.setFitnessOrderFunction((a, b) => a.score - b.score);
shouldGoDownPopulation.setFitnessOrderFunction((a, b) => a.score - b.score);
shouldGoLeftPopulation.setFitnessOrderFunction((a, b) => a.score - b.score);
shouldGoRightPopulation.setFitnessOrderFunction((a, b) => a.score - b.score);

shouldGoUpPopulation.init();
shouldGoDownPopulation.init();
shouldGoLeftPopulation.init();
shouldGoRightPopulation.init();

function train (generations) {
  for (let i = 0; i < generations; i++) {
    const player = {
      x: random(0, 250),
      y: random(0, 250)
    };
  
    const goal = {
      x: random (0, 250),
      y: random(0, 250)
    };
  
    const shouldGoUp = goal.y < player.y;
    const shouldGoDown = goal.y > player.y;
    const shouldGoLeft = goal.x < player.x;
    const shouldGoRight = goal.x > player.x;
  
    shouldGoUpPopulation.setFitnessFunction(result => result === shouldGoUp ? 0 : typeof result === 'boolean' ? 0.5 : 1);
    shouldGoDownPopulation.setFitnessFunction(result => result === shouldGoDown ? 0 : typeof result === 'boolean' ? 0.5 : 1);
    shouldGoLeftPopulation.setFitnessFunction(result => result === shouldGoLeft ? 0 : typeof result === 'boolean' ? 0.5 : 1);
    shouldGoRightPopulation.setFitnessFunction(result => result === shouldGoRight ? 0 : typeof result === 'boolean' ? 0.5 : 1);
  
    shouldGoUpPopulation.runGeneration({ y: player.y, goalY: goal.y });
    shouldGoDownPopulation.runGeneration({ y: player.y, goalY: goal.y });
    shouldGoLeftPopulation.runGeneration({ x: player.x, goalX: goal.x });
    shouldGoRightPopulation.runGeneration({ x: player.x, goalX: goal.x });
  }
}


export {
  train,
  shouldGoUpPopulation,
  shouldGoDownPopulation,
  shouldGoLeftPopulation,
  shouldGoRightPopulation
};
