type Vec3 = [number, number, number]

export type RingScenario = {
    name: string
    position: Vec3
    rotation: Vec3
    scale: number
}

export const ringScenarios = [
    {
        name: "hero",
        position: [0, 0, 0],
        rotation: [Math.PI / 4, Math.PI / 1, 0.2],
        scale: 0.1,
    },
    {
        name: "about",
        position: [0, 0, 0],
        rotation: [0, Math.PI / 2, 0],
        scale: 0.08,
    },
    {
        name: "contact",
        position: [2, -1, 0],
        rotation: [0, Math.PI, 0],
        scale: 0.12,
    },
] as const satisfies readonly RingScenario[]

export type RingScenarioName = (typeof ringScenarios)[number]["name"]