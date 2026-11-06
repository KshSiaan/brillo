"use client"

import React, { useLayoutEffect, useRef } from "react"
import { toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import type { RingScenario } from "./scenarios"

const CREASE_ANGLE = Math.PI / 6
const ENV_INTENSITY = 5

function RingModel({ src, target }: { src: string; target: RingScenario }) {
    const { scene } = useGLTF(src)
    const ref = useRef<THREE.Group>(null)
    const maxAnisotropy = useThree((s) =>
        s.gl.capabilities.getMaxAnisotropy()
    )

    useLayoutEffect(() => {
        scene.traverse((obj) => {
            if (!(obj instanceof THREE.Mesh)) return

            const mesh = obj

            if (!mesh.userData.creased) {
                mesh.geometry = toCreasedNormals(mesh.geometry, CREASE_ANGLE)
                mesh.userData.creased = true
            }

            const mats = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material]

            mats.forEach((mat) => {
                const m = mat as THREE.MeshStandardMaterial

                m.flatShading = false
                m.envMapIntensity = ENV_INTENSITY

                if (m.map) m.map.anisotropy = maxAnisotropy

                m.needsUpdate = true
            })
        })
    }, [scene, maxAnisotropy])

    useFrame((_, delta) => {
        const g = ref.current
        if (!g) return

        const speed = 4
        const d = THREE.MathUtils.damp

        g.position.set(
            d(g.position.x, target.position[0], speed, delta),
            d(g.position.y, target.position[1], speed, delta),
            d(g.position.z, target.position[2], speed, delta)
        )

        g.rotation.set(
            d(g.rotation.x, target.rotation[0], speed, delta),
            d(g.rotation.y, target.rotation[1], speed, delta),
            d(g.rotation.z, target.rotation[2], speed, delta)
        )

        const s = d(g.scale.x, target.scale, speed, delta)
        g.scale.setScalar(s)
    })

    return (
        <group ref={ref}>
            <primitive object={scene} />
        </group>
    )
}

export default RingModel

useGLTF.preload("/anillo.glb")
useGLTF.preload("/dije.glb")