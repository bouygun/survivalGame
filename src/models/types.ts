// you can use zod schemas packgace for generic types

export type Skill = {
    hp: number,
    attack: number
}

export type Hero = Skill

export type Enemy = {
    enemy: Skill,
    position: number
    type: string
}