import Description from "./_home/description"
import Product from "./product"


export default function Page() {
    return (
        <>
            <header className="flex items-center justify-between w-full pr-6">
                <div className="space-x-4">
                    <h1 className="text-4xl font-bold px-6 pt-6 uppercase text-primary">Brillo Color</h1>
                    <p className="flex items-center gap-4 px-6 pb-6 text-primary tracking-wide">
                        <span>JOYERIA</span> •
                        <span>EST</span> •
                        <span>1984</span> •
                        <span>CALI</span> •
                        <span>COLOMBIA</span> •
                    </p>
                </div>
                <div className=" border px-4 py-2 border-primary text-primary! flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary " />Verificando</div>
            </header>
            <main className="">
                <Product />
                <Description />
            </main>
            <footer className="h-50">

            </footer>
        </>
    )
}

