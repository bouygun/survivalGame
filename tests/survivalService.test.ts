import test from "ava";
import { SurvivalSimulation } from "../src/services/survivalService";
import { Hero, Enemy } from "../src/models/types";
import { ErrorHandler } from "../src/utils/errorHandler";

test.serial("If hero survives", async (t) => {
  const simulationService = new SurvivalSimulation();

  const hero: Hero = { hp: 1000, attack: 10 };
  const enemies: Enemy[] = [
    {  hp: 50, attack: 2 , position: 276, type: "Bug" },
    { hp: 50, attack: 2 , position: 489, type: "Bug" },
    { hp: 100, attack: 15 , position: 1527, type: "Lion" },
    { hp: 300, attack: 7 , position: 1681, type: "Zombie" },
    { hp: 100, attack: 15 , position: 2865, type: "Lion" },
    { hp: 300, attack: 7 , position: 3523, type: "Zombie" },
  ];
  const resourceDistance = 5000;

  const result = simulationService.simulate({
    hero,
    enemies,
    resourceDistance,
  });

  const isHeroSurvived = result.some((r) => r.includes("Hero Survived!"));
  t.true(isHeroSurvived);
  // like output sample
  t.deepEqual(result, [
    "Hero started journey with 1000 HP!",
    "Hero defeated Bug with 990 HP remaining",
    "Hero defeated Bug with 980 HP remaining",
    "Hero defeated Lion with 830 HP remaining",
    "Hero defeated Zombie with 620 HP remaining",
    "Hero defeated Lion with 470 HP remaining",
    "Hero defeated Zombie with 260 HP remaining",
    "Hero Survived!",
  ]);
});

test.serial("If hero lost and dies", async (t) => {
  const simulationService = new SurvivalSimulation();

  const hero: Hero = { hp: 500, attack: 9 };
  const enemies: Enemy[] = [
    { hp: 400, attack: 8 , position: 274, type: "Mutant" },
    { hp: 75, attack: 10 , position: 486, type: "ZombieDog" },
    { hp: 75, attack: 10 , position: 1897, type: "ZombieDog" },
    { hp: 300, attack: 7 , position: 1687, type: "Zombie" },
    { hp: 400, attack: 8 , position: 5332, type: "Mutant" },
  ];
  const resourceDistance = 7500;

  const result = simulationService.simulate({
    hero,
    enemies,
    resourceDistance,
  });

  const isHeroDied = result.some((r) => r.includes("Hero Survived!"));
  t.false(isHeroDied);
  // like output sample

  t.deepEqual(result, [
    "Hero started journey with 500 HP!",
    "Hero defeated Mutant with 140 HP remaining",
    "Hero defeated ZombieDog with 50 HP remaining",
    "Hero was defeated by Zombie at position 1687",
    "Hero is Dead!! Last seen at position 1687!!",
  ]);
});

test.serial("Invalid resourceDistance in request", async (t) => {
  const simulationService = new SurvivalSimulation();

  const hero: Hero = { hp: 1000, attack: 10 };
  const enemies: Enemy[] = [
    { hp: 50, attack: 2 , position: 276, type: "Bug" },
  ];
  const resourceDistance = 0;

  const error = t.throws(
    () => {
      simulationService.simulate({ hero, enemies, resourceDistance });
    },
    { instanceOf: ErrorHandler }
  );

  t.is(error?.message, "Resource distance must be greater than zero.");
});

test.serial("Invalid hero stats", async (t) => {
  const simulationService = new SurvivalSimulation();

  const hero: Hero = { hp: 0, attack: 10 };
  const enemies: Enemy[] = [
    { hp: 50, attack: 2 , position: 276, type: "Bug" },
  ];
  const resourceDistance = 5000;

  const error = t.throws(
    () => {
      simulationService.simulate({ hero, enemies, resourceDistance });
    },
    { instanceOf: ErrorHandler }
  );

  t.is(error?.message, "Hero's hp and attack must be greater than zero.");
});

test.serial("Invalid enemy stats", async (t) => {
  const simulationService = new SurvivalSimulation();

  const hero: Hero = { hp: 1000, attack: 10 };
  const enemies: Enemy[] = [
    { hp: 0, attack: 2 , position: 276, type: "Bug" },
  ];
  const resourceDistance = 5000;

  const error = t.throws(
    () => {
      simulationService.simulate({ hero, enemies, resourceDistance });
    },
    { instanceOf: ErrorHandler }
  );

  t.is(error?.message, "Enemy's hp and attack must be greater than zero.");
});
