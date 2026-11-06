"use client"

import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import RingModel from "./ring-model"
import { ringScenarios, type RingScenarioName } from "./scenarios"

export default function Ring({
    position = "hero",
    src = "/anillo.glb",
}: {
    position?: RingScenarioName
    src?: string
}) {
    const target =
        ringScenarios.find((s) => s.name === position) ?? ringScenarios[0]

    return (
        <div className="fixed inset-0 h-dvh w-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                <directionalLight position={[5, 5, 5]} intensity={1.5} />

                <Suspense fallback={null}>
                    <RingModel src={src} target={target} />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    )
}

