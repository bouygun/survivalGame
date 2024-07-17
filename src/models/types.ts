// you can use zod schemas packgace for generic types

export type BaseSkills = {
    hp: number,
    attack: number
}

export type Hero = BaseSkills

export type Enemy = BaseSkills & {
    position: number
    type: string
}
