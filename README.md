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
| `resourceDistance`      | `number` | **Required**. distance of the hero from start point |
| `hero`      | `object` | **Required**. hero's skills|
| `enemies`      | `object` | **Required**. enemy's skills |


You can use this request, If you want to hero wins
```
{
    "resourceDistance": 5000,
    "hero": {
        "hp": 1000,
        "attack": 10
    },
    "enemies": [
        {
            "type": "Bug",
            "hp": 50,
            "attack": 2,
            "position": 276
        },
        {
            "type": "Bug",
            "hp": 50,
            "attack": 2,
            "position": 489
        },
        {
            "type": "Lion",
            "hp": 100,
            "attack": 15,
            "position": 1527
        },
        {
            "type": "Zombie",
            "hp": 300,
            "attack": 7,
            "position": 1681
        },
        {
            "type": "Lion",
            "hp": 100,
            "attack": 15,
            "position": 2865
        },
        {
            "type": "Zombie",
            "hp": 300,
            "attack": 7,
            "position": 3523
        }
    ]
}

```

You can use this request, If you want to enemies win
```
{
    "resourceDistance": 7500,
    "hero": {
        "hp": 500,
        "attack": 9
    },
    "enemies": [
        {
            "type": "Mutant",
            "hp": 400,
            "attack": 8,
            "position": 274
        },
        {
            "type": "ZombieDog",
            "hp": 75,
            "attack": 10,
            "position": 486
        },
        {
            "type": "Zombie",
            "hp": 300,
            "attack": 7,
            "position": 1687
        },
        {
            "type": "Mutant",
            "hp": 400,
            "attack": 8,
            "position": 1897
        },
        {
            "type": "ZombieDog",
            "hp": 75,
            "attack": 10,
            "position": 5332
        }
    ]
}
```
