"use client"
import { Suspense, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'

import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import { Button } from '@/components/ui/button'
import { Ring } from './ring'


export default function Product({ src }: { src: string }) {
    return (
        <div className="relative">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 35 }}
                className="h-[clamp(22rem,70dvh,44rem)]!"
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
            >
                <color attach="background" args={['#00332A']} />
                <Suspense fallback={null}>
                    <Ring src={src} />
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
            <div className="absolute bottom-4 right-4 flex gap-2 sm:right-6">
                <Button size="icon" className="rounded-full">1</Button>
                <Button size="icon" className="rounded-full">2</Button>
                <Button size="icon" className="rounded-full">3</Button>

            </div>
        </div>
    )
}

