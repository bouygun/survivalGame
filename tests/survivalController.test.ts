import test from "ava";
import request from "supertest";
import express from "express";
import { simulateSurvival } from "../src/controllers/survivalController";

const app = express();
app.use(express.json());
app.post("/simulate", simulateSurvival);

test.serial("Invalid input format", async (t) => {
  const inputText = `
        Resources are 5000 meters away
        Hero has 1000 hp
        Hero attack is 10
    `;

  const res = await request(app)
    .post("/simulate")
    .send({ inputText })

  t.is(res.body.message, "Invalid input format.");
  t.is(res.body.statusCode, 400);
});

test.serial("Hero survives", async (t) => {
  const inputText = `
        Resources are 5000 meters away
        Hero has 1000 hp
        Hero attack is 10
        Bug is Enemy
        Lion is Enemy
        Zombie is Enemy
        Bug has 50 hp
        Bug attack is 2
        Lion has 100 hp
        Lion attack is 15
        Zombie has 300 hp
        Zombie attack is 7
        There is a Zombie at position 1681
        There is a Bug at position 276
        There is a Bug at position 489
        There is a Lion at position 1527
        There is a Lion at position 2865
        There is a Zombie at position 3523
    `;

  const expectedOutput = [
    "Hero started journey with 1000 HP!",
    "Hero defeated Bug with 990 HP remaining",
    "Hero defeated Bug with 980 HP remaining",
    "Hero defeated Lion with 830 HP remaining",
    "Hero defeated Zombie with 620 HP remaining",
    "Hero defeated Lion with 470 HP remaining",
    "Hero defeated Zombie with 260 HP remaining",
    "Hero Survived!",
  ];

  const res = await request(app).post("/simulate").send({ inputText });

   t.deepEqual(res.body.result, expectedOutput);
});

test.serial("Hero died", async (t) => {
  const inputText = `
        Resources are 7500 meters away
        Hero has 500 hp
        Hero attack is 9
        ZombieDog is Enemy
        Mutant is Enemy
        Zombie is Enemy
        Mutant has 400 hp
        Mutant attack is 8
        ZombieDog has 75 hp
        ZombieDog attack is 10
        Zombie has 300 hp
        Zombie attack is 7
        There is a Zombie at position 1687
        There is a Mutant at position 274
        There is a ZombieDog at position 486
        There is a ZombieDog at position 1897
        There is a Mutant at position 5332
    `;

  const expectedOutput = [
    "Hero started journey with 500 HP!",
    "Hero defeated Mutant with 140 HP remaining",
    "Hero defeated ZombieDog with 50 HP remaining",
    "Hero was defeated by Zombie at position 1687",
    "Hero is Dead!! Last seen at position 1687!!",
  ];

  const res = await request(app).post("/simulate").send({ inputText });

  t.deepEqual(res.body.result, expectedOutput);
});
