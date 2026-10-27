"use client"
import React, { Suspense, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import { Button } from '@/components/ui/button'

const CREASE_ANGLE = Math.PI / 6 // 30°. Higher = smoother band but softer diamond facets
const ENV_INTENSITY = 5       // how strongly the original material reflects the lights

function Ring() {
    const { scene } = useGLTF('/ring1.gltf')
    const maxAnisotropy = useThree((s) => s.gl.capabilities.getMaxAnisotropy())

    useLayoutEffect(() => {
        scene.traverse((obj) => {
            if (!(obj as THREE.Mesh).isMesh) return
            const mesh = obj as THREE.Mesh

            // Smooth, but keep hard edges where faces meet at a sharp angle
            if (!mesh.userData.creased) {
                mesh.geometry = toCreasedNormals(mesh.geometry, CREASE_ANGLE)
                mesh.userData.creased = true
            }

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
            mats.forEach((mat) => {
                const m = mat as THREE.MeshStandardMaterial
                m.flatShading = false // this is what was causing the polygon look
                m.envMapIntensity = ENV_INTENSITY
                if (m.map) m.map.anisotropy = maxAnisotropy // same texture, sharper at angles
                m.needsUpdate = true
            })
        })
    }, [scene, maxAnisotropy])

    return <primitive object={scene} scale={2} />
}
export default function Product() {
    return (
        <div className="relative">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 35 }}
                className="h-[70dvh]!"
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
            >
                <color attach="background" args={['#00332A']} />
                <Suspense fallback={null}>
                    <Ring />
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
            <div className="absolute bottom-4 right-6 space-x-2">
                <Button size="icon" className="rounded-full">1</Button>
                <Button size="icon" className="rounded-full">2</Button>
                <Button size="icon" className="rounded-full">3</Button>

            </div>
        </div>
    )
}

useGLTF.preload('/ring1.gltf')