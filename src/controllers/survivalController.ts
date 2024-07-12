import { Request, Response } from "express";
import { SurvivalSimulation } from "../services/survivalService";
import { ErrorHandler } from "../utils/errorHandler";
import { simulateSurvivalParseInput } from "../utils/parse";

const simulationService = new SurvivalSimulation();

export const simulateSurvival = (req: Request, res: Response) => {
  try {
    console.log('req.body.inputText', req.body.inputText)
    const inputText: string = req.body.inputText
    console.log('req.body.inputText')
    console.log('req.body.inputText', req.body.inputText)
    const { hero, enemies, resourceDistance } =
      simulateSurvivalParseInput(inputText)
console.log('hero', hero)
console.log('enemies', enemies)
console.log('resourceDistance', resourceDistance)
    const result = simulationService.simulate({
      hero,
      enemies,
      resourceDistance,
    });

    res.json({ result });
  } catch (error) {
    ErrorHandler.handleError(error as ErrorHandler, res)
  }
}
