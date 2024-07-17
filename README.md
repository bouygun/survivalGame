# SURVIVAL GAME

This project include following requirements

In the 23rd century the war between two empires led to a nuclear apocalypse which led to extinction of nearly all civilization and animal life. As we are the only survivors we are trying to build a new civilization but resources required to sustain life are rare. The radioactivity makes outdoors dangerous. We are living in an old bunker that is left from WW2. Volunteers need to get out to the dangerous lands and get to the places where they can get resources. Luckily the bunker we are living has an old radar that can find creatures on our path to the resources. As a surviving engineer you are required to write a simulation that can simulate if a volunteer can reach to resources. Be aware that our radar indicates that there are dangerous creatures and even zombies on the wasteland.
Write a simulation that find outs if the hero would survive or not. You can use the following sample input and output as a reference. If the volunteer hero faces an enemy he needs to fight against it until one of them dies. To simulate fights you can accept that enemy and the hero attack at the same time. hp represents health points. Each attack decreases health points equal to attack. To avoid radioactivity volunteer hero wears a special heavy armor that makes him walk meter by meter.

## Tech Stack

**Server:** Node, Express, Typescript


## Folder Structure

```bash
survivalGame/
├── src/ #Source files
│   ├── models/
│   │   ├── types.ts  #All types of parameters etc
│   │   ├── models.ts #Service/method input types
│   ├── controllers/
│   │   ├── survivalController.ts #Controller for survival method. This is the main method. Includes validations etc
│   ├── routes/
│   │   ├── survivalRoutes.ts #Route the service. 
│   ├── services/
│   │   ├── simulationService.ts #Prepare response. Includes desired logic
│   ├── index.ts #start and listen the project
├── tests/  #Test files
│   ├──survivalService.test.ts  #service tests
│   ├──survivalController.test.ts #controller tests
├── utils/  #Helpers
│   ├──errorHandler.ts  #for error msg and statusCode handler
│   ├──parse.ts #for input parser
├── tsconfig.json
├── package.json
├── README.md
```

## Installation

Node and postman needs to be installed. 

## Run Locally

Clone the project

```bash
  git clone https://github.com/bouygun/survivalGame.git
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

or

```bash
  npx ts-node src/index.ts
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` // you can write 3000

## API Reference

#### POST

```http
  POST http://localhost:${PORT}/api/survivalGame
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `inputText`      | `string` | **Required**. all requirements |


You can use this request, If you want to hero wins
```
{
  "inputText": "Resources are 5000 meters away\nHero has 1000 hp\nHero attack is 10\nBug is Enemy\nLion is Enemy\nZombie is Enemy\nBug has 50 hp\nBug attack is 2\nLion has 100 hp\nLion attack is 15\nZombie has 300 hp\nZombie attack is 7\nThere is a Zombie at position 1681\nThere is a Bug at position 276\nThere is a Bug at position 489\nThere is a Lion at position 1527\nThere is a Lion at position 2865\nThere is a Zombie at position 3523"
}
```

You can use this request, If you want to enemies win
```
{
  "inputText": "Resources are 7500 meters away\nHero has 500 hp\nHero attack is 9\nZombieDog is Enemy\nMutant is Enemy\nZombie is Enemy\nMutant has 400 hp\nMutant attack is 8\nZombieDog has 75 hp\nZombieDog attack is 10\nZombie has 300 hp\nZombie attack is 7\nThere is a Zombie at position 1687\nThere is a Mutant at position 274\nThere is a ZombieDog at position 486\nThere is a ZombieDog at position 1897\nThere is a Mutant at position 5332"
}
```
