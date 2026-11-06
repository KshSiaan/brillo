// components/scene/section.tsx
"use client"
import React, { createContext, useContext, useEffect, useRef } from "react"


const SceneContext = createContext<{ setActive: (n: string) => void }>({
    setActive: () => { },
})

export const SceneProvider = SceneContext.Provider

export function Section({
    name,
    className = "",
    children,
}: {
    name: string
    className?: string
    children?: React.ReactNode
}) {
    const ref = useRef<HTMLElement>(null)
    const { setActive } = useContext(SceneContext)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setActive(name)
            },
            { threshold: 0.6 } // section counts as "current" when 60% visible
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [name, setActive])

    return (
        <section ref={ref} className={`relative h-dvh w-full snap-start ${className}`}>
            {children}
        </section>
    )
}