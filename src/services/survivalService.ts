import { SurvivalServisInput } from "../models/models";
import { ErrorHandler } from "../utils/errorHandler";

export class SurvivalSimulation {
  public simulate(parameters: SurvivalServisInput): string[] {
    const { resourceDistance, hero, enemies } = parameters;
    const responseArr: string[] = [];
    if (resourceDistance <= 0) {
      throw new ErrorHandler(
        400,
        "Resource distance must be greater than zero."
      );
    }
    if (hero.hp <= 0 || hero.attack <= 0) {
      throw new ErrorHandler(
        400,
        "Hero's hp and attack must be greater than zero."
      );
    }
    enemies.forEach((enemy) => {
      if (enemy.hp <= 0 || enemy.attack <= 0) {
        throw new ErrorHandler(
          400,
          "Enemy's hp and attack must be greater than zero."
        );
      }
    });
    try {
      responseArr.push(`Hero started journey with ${hero.hp} HP!`);

      enemies.sort((a, b) => a.position - b.position);

      let lastPosition: number = 0;
      for (const enemy of enemies) {
        if (enemy.position > resourceDistance) break;

        lastPosition = enemy.position;
        const {  attack, position } = enemy;

        while (hero.hp > 0 && enemy.hp > 0) {
          hero.hp -= attack;
          enemy.hp -= hero.attack;
        }
        if (hero.hp > 0) {
          responseArr.push(
            `Hero defeated ${enemy.type} with ${hero.hp} HP remaining`
          );
          continue;
        }
        responseArr.push(
          `Hero was defeated by ${enemy.type} at position ${position}`
        );
        break;
      }

      if (hero.hp > 0) {
        responseArr.push(`Hero Survived!`);
      } else {
        responseArr.push(
          `Hero is Dead!! Last seen at position ${lastPosition}!!`
        );
      }
    } catch (error) {
      throw new ErrorHandler(500, "An error occurred during the simulation.");
    }
    return responseArr;
  }
}
