import { Enemy, Hero } from "./types";

export type SurvivalServisInput = {
  hero: Hero;
  enemies: Enemy[];
  resourceDistance: number;
};

// Result Type for functions general return
type ResultSuccessType<T> = {
  success: true;
  data: T;
};

type ResultErrorType<U> = {
  success: false;
  error: U;
};
export type ResultType<T, U> = ResultSuccessType<T> | ResultErrorType<U>;
