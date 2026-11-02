import React, { useLayoutEffect } from 'react'
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
const CREASE_ANGLE = Math.PI / 6 // 30°. Higher = smoother band but softer diamond facets
const ENV_INTENSITY = 5       // how strongly the original material reflects the lights
export function Ring({ src }: { src: string }) {
    const { scene } = useGLTF(src)
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

    return <primitive object={scene} scale={0.1} />
}
useGLTF.preload('/anillo.glb')
useGLTF.preload('/dije.glb')