"use client"
import React, { Suspense, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer, useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'

// const CREASE_ANGLE = Math.PI / 6   // 30°. Raise for smoother, lower for sharper edges
// const ENV_INTENSITY = 1.6          // only scales how much the original materials reflect the lights
// const GEM_REGEX = /gem|stone|diamond|crystal|glass/i // these meshes keep their original facets

function Ring() {
    const { scene } = useGLTF('/ring1.gltf')
    // const maxAnisotropy = useThree((s) => s.gl.capabilities.getMaxAnisotropy())

    // useLayoutEffect(() => {
    //     scene.traverse((obj) => {
    //         if (!(obj as THREE.Mesh).isMesh) return
    //         const mesh = obj as THREE.Mesh
    //         const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    //         const isGem = GEM_REGEX.test(mesh.name + mats.map((m) => m.name).join(''))

    //         // Smooth the metal parts but keep hard edges. Diamonds are left alone.
    //         if (!isGem && !mesh.userData.smoothed) {
    //             mesh.geometry = toCreasedNormals(mesh.geometry, CREASE_ANGLE)
    //             mesh.userData.smoothed = true
    //         }

    //         mats.forEach((mat) => {
    //             const m = mat as THREE.MeshStandardMaterial
    //             m.envMapIntensity = ENV_INTENSITY
    //                 // Sharper default textures at grazing angles, same textures
    //                 ;[m.map, m.normalMap, m.roughnessMap, m.metalnessMap].forEach((tex) => {
    //                     if (tex) tex.anisotropy = maxAnisotropy
    //                 })
    //             m.needsUpdate = true
    //         })
    //     })
    // }, [scene, maxAnisotropy])

    return <primitive object={scene} scale={2} />
}

export default function Page() {
    return (
        <main className="w-dvw h-dvh">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 35 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
            >
                <color attach="background" args={['#dfdfdf']} />
                <Suspense fallback={null}>
                    <Ring />
                    <Environment resolution={1024} preset='city'>
                    </Environment>
                    <ContactShadows position={[0, -1.2, 0]} opacity={0.5} blur={2.5} far={3} />
                </Suspense>
                <OrbitControls makeDefault enablePan={false} />
                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={1} intensity={0.5} mipmapBlur />
                    <SMAA />
                </EffectComposer>
            </Canvas>
        </main>
    )
}

useGLTF.preload('/ring1.gltf')