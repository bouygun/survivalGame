import { Hero } from '../models/hero';
import { Enemy } from '../models/enemy';
import { ErrorHandler } from '../utils/errorHandler';

interface PositionedEnemy {
    enemy: Enemy;
    position: number;
}

export class SimulationService {
    public simulate(hero: Hero, enemies: PositionedEnemy[], resourceDistance: number): string[] {
        const log: string[] = [];
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
        log.push(`Hero started journey with ${hero.hp} HP!`);
        
        enemies.sort((a, b) => a.position - b.position); // Düşmanları konuma göre sırala

        for (const enemyPosition of enemies) {
            if (enemyPosition.position > resourceDistance) break;

            const { enemy, position } = enemyPosition;

            while (hero.hp > 0 && enemy.hp > 0) {
                hero.hp -= enemy.attack;
                enemy.hp -= hero.attack;
            }
            if (hero.hp > 0) {
                log.push(`Hero defeated ${enemy.type} with ${hero.hp} HP remaining`);
            } else {
                log.push(`Hero was defeated by ${enemy.type} at position ${position}`);
                log.push(`Hero is Dead!! Last seen at position ${position}!!`);
                return log;
            }
        }

        if (hero.hp > 0) {
            log.push(`Hero Survived!`);
        }

        } catch (error) {
            if (error instanceof ErrorHandler) {
                throw error;
            } else {
                throw new ErrorHandler(500, "An error occurred during the simulation.");
            }
        }
        return log
    }
}
