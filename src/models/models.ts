import { Enemy, Hero } from "./types"

export type SurvivalServisInput = {
    hero: Hero,
    enemies: Enemy[],
    resourceDistance: number
}

// after use for util funcitons
type ResultSuccessType<T> = {
    success: true
    data: T
  }
  
  type ResultErrorType<U> = {
    success: false
    error: U
  }
  
  export type ResultType<T, U> = ResultSuccessType<T> | ResultErrorType<U>