import { Section } from "@/components/core/section"

export default function Page() {
    return (
        <main className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scrollbar-none">
            <Section name="hero" >
            </Section>
            <Section name="about" >
            </Section>
            <Section name="contact">
            </Section>
        </main>
    )
}