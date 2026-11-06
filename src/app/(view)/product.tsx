"use client"
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'

import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import { Button } from '@/components/ui/button'
import RingModel from './ring-model'
import { ringScenarios, type RingScenarioName } from './scenarios'



export default function Product({
    src = "/anillo.glb",
    position = "hero",
}: {
    src?: string
    position?: RingScenarioName
}) {
    const [activeScenario, setActiveScenario] =
        useState<RingScenarioName>(position)

    useEffect(() => {
        setActiveScenario(position)
    }, [position])

    const target =
        ringScenarios.find((scenario) => scenario.name === activeScenario) ??
        ringScenarios[0]

    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 35 }}
                className="h-dvh!"
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
            >
                <color attach="background" args={['#00332A']} />
                <Suspense fallback={null}>
                    <RingModel src={src} target={target} />
                    <Environment resolution={1024} preset='warehouse'>
                    </Environment>
                    <ContactShadows position={[0, -1.2, 0]} opacity={0.5} blur={2.5} far={3} />
                </Suspense>
                <OrbitControls makeDefault enablePan={false} />
                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={1} intensity={0.5} mipmapBlur />
                    <SMAA />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
