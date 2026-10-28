import Description from "./_home/description"
import Product from "./product"


export default function Page() {
    return (
        <>
            <header className="flex w-full flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
                <div>
                    <h1 className="text-3xl font-bold uppercase text-primary sm:text-4xl">Brillo Color</h1>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-sm tracking-wide text-primary sm:gap-4 sm:text-base">
                        <span>JOYERIA</span> •
                        <span>EST</span> •
                        <span>1984</span> •
                        <span>CALI</span> •
                        <span>COLOMBIA</span>
                    </p>
                </div>
                <div className="flex w-fit items-center gap-2 border border-primary px-4 py-2 text-primary">
                    <div className="size-2 shrink-0 rounded-full bg-primary" />
                    Verificando
                </div>
            </header>
            <main className="w-full">
                <Product />
                <Description />
            </main>
            <footer className="h-32 sm:h-50">

            </footer>
        </>
    )
}
