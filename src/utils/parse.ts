import { Hero, Enemy } from "../models/types";
import { ErrorHandler } from "./errorHandler";

export const simulateSurvivalParseInput = (inputText: string) => {
  // regex formatla - control et hata. pattern belirleyip tüm dizeleri gezebilirsin
  let errorMsg: string | undefined;
  try {
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const resourceDistance = parseInt(lines[0].match(/\d+/)![0]);

    const hero: Hero = {
      hp: parseInt(lines[1].match(/\d+/)![0]),
      attack: parseInt(lines[2].match(/\d+/)![0]),
    };

    const enemyTypes: { [key: string]: { hp: number; attack: number } } = {};
    const enemies: Enemy[] = [];

    // Parse enemies and their stats
    for (let i = 3; i < lines.length; i++) {
      if (lines[i].endsWith(" is Enemy")) {
        const enemyType = lines[i].split(" is Enemy")[0].trim();
        enemyTypes[enemyType] = {
          attack: 0,
          hp: 0,
        };
      } else {
        const enemyTypeKeys = Object.keys(enemyTypes);
        for (const enemyType of enemyTypeKeys) {
          if (lines[i].startsWith(enemyType) && lines[i].includes("hp")) {
            const hp = parseInt(lines[i].match(/\d+/)![0]);
            enemyTypes[enemyType].hp = hp;
          } else if (
            lines[i].startsWith(enemyType) &&
            lines[i].includes("attack")
          ) {
            const attack = parseInt(lines[i].match(/\d+/)![0]);
            enemyTypes[enemyType].attack = attack;
          }
        }
      }
    }

    // Parse enemies positions
    for (let i = 3; i < lines.length; i++) {
      const match = lines[i].match(/There is a (\w+) at position (\d+)/);
      if (match) {
        const type = match[1].trim();
        const position = parseInt(match[2].trim());
        if (enemyTypes[type]) {
          enemies.push({
            hp: enemyTypes[type].hp,
            attack: enemyTypes[type].attack,
            position: position,
            type: type,
          });
        }
      }
    }
    if (enemies.length <= 0 || !resourceDistance || !hero) {
      errorMsg = "Invalid input format.";
      throw new ErrorHandler(400, errorMsg);
    }

    return { hero, enemies, resourceDistance };
  } catch (error) {
    throw new ErrorHandler(500, errorMsg || "System Error");
  }
};
