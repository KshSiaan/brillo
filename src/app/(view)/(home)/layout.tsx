"use client"
import { SceneProvider } from "@/components/core/section"
import React, { Suspense, useState } from "react"
import Product from "../product"
import { ringScenarios, type RingScenarioName } from "../scenarios"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState<RingScenarioName>("hero")
    const handleActiveChange = (name: string) => {
        if (ringScenarios.some((scenario) => scenario.name === name)) {
            setActive(name as RingScenarioName)
        }
    }

    return (
        <SceneProvider value={{ setActive: handleActiveChange }}>
            <main className="h-dvh snap-y snap-mandatory overflow-y-scroll bg-gray-300 scrollbar-none">
                <Suspense>
                    <Product position={active} />
                </Suspense>
                {children}
            </main>
        </SceneProvider>
    )
}