import { survivalServisInput } from '../models/models';
import { ErrorHandler } from '../utils/errorHandler';

export class SimulationService {
    public simulate(parameters: survivalServisInput): string[] {
        const {resourceDistance, hero, enemies} = parameters
        const responseArr: string[] = [];
        try {
            if(resourceDistance <= 0){
                throw new ErrorHandler(400, "Resource distance must be greater than zero.")
            }
            if (hero.hp <= 0 || hero.attack <= 0) {
                throw new ErrorHandler(400, "Hero's hp and attack must be greater than zero.");
            }
            enemies.forEach(enemy => {
                if (enemy.enemy.hp <= 0 || enemy.enemy.attack <= 0) {
                    throw new ErrorHandler(400, "Enemy's hp and attack must be greater than zero.");
                }
            });
            responseArr.push(`Hero started journey with ${hero.hp} HP!`);
        
        enemies.sort((a, b) => a.position - b.position)

        for (const enemyPosition of enemies) {
            if (enemyPosition.position > resourceDistance) break;

            const { enemy, position } = enemyPosition;

            while (hero.hp > 0 && enemy.hp > 0) {
                hero.hp -= enemy.attack;
                enemy.hp -= hero.attack;
            }
            if (hero.hp > 0) {
                responseArr.push(`Hero defeated ${enemyPosition.type} with ${hero.hp} HP remaining`);
            } else {
                responseArr.push(`Hero was defeated by ${enemyPosition.type} at position ${position}`);
                responseArr.push(`Hero is Dead!! Last seen at position ${position}!!`);
                return responseArr;
            }
        }

        if (hero.hp > 0) {
            responseArr.push(`Hero Survived!`);
        }

        } catch (error) {
            if (error instanceof ErrorHandler) {
                throw error;
            } else {
                throw new ErrorHandler(500, "An error occurred during the simulation.");
            }
        }
        return responseArr
    }
}
