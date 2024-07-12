// you can use zod schemas packgace for generic types

export type Skills = {
    hp: number,
    attack: number
}

export type Hero = Skills

// hero type ayır
export type Enemy = Skills &{
    position: number
    type: string
}