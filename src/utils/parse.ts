import { Hero, Enemy } from "../models/types";
import { ErrorHandler } from "./errorHandler";

export const simulateSurvivalParseInput = (inputText: string) => {
  try {
    const lines = inputText.split("\n").map((line) => line.trim());

    const resourceDistance = parseInt(lines[0].match(/\d+/)![0]);

    const hero: Hero = {
      hp: parseInt(lines[1].match(/\d+/)![0]),
      attack: parseInt(lines[2].match(/\d+/)![0]),
    };

    const enemyTypes: { [key: string]: { hp: number; attack: number } } = {};
    let i = 3;
    while (lines[i].includes(" is Enemy")) {
      const [enemyType] = lines[i].split(" is Enemy");
      enemyTypes[enemyType] = {
        hp: parseInt(lines[i + 1].match(/\d+/)![0]),
        attack: parseInt(lines[i + 2].match(/\d+/)![0]),
      };
      i += 3;
    }

    const enemies: Enemy[] = [];
    while (i < lines.length) {
      const [type] = lines[i].split(" at position");
      const position = parseInt(lines[i].match(/\d+/)![0]);
      enemies.push({
        hp: enemyTypes[type.trim()].hp,
        attack: enemyTypes[type.trim()].attack,
        position,
        type: type.trim(),
      });
      i++;
    }

    return { hero, enemies, resourceDistance };
  } catch (error) {
    throw new ErrorHandler(400, "Invalid input format.");
  }
};
