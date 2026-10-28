import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import QRCode from 'react-qr-code'


const details = [
    {
        label: "QUALATES",
        value: "18K"
    },
    {
        label: "PESO",
        value: "4.8 g"
    },
    {
        label: "MATERIAL",
        value: "Oro Amarillo"
    }, {
        label: "Fecha de Venta",
        value: new Date().toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }
]

const moreDetails = [
    {
        label: "NOMBRE DE LA PIEZA",
        value: "Anillo Solitario"
    },
    {
        label: "REFERENCIA",
        value: "BC-2026-0001"
    },
    {
        label: "QUALATES",
        value: "18K"
    },
    {
        label: "PESO",
        value: "4.8 g"
    }
]

export default function Description() {

    return (
        <section className="space-y-4 p-4 sm:p-6 lg:p-10">
            <p className="uppercase tracking-widest text-muted-foreground">Description de la pieza</p>
            <h2 className="text-3xl! text-primary sm:text-4xl!">Anillo Solitario</h2>
            <p className="text-gray-600 uppercase">BC-2026-0001</p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2">
                {
                    details.map((detail, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: static display data
                        <div key={index} className="flex flex-col">
                            <span className="text-gray-500 uppercase text-sm">{detail.label}</span>
                            <span className="text-primary text-xl font-bold">{detail.value}</span>
                        </div>
                    ))
                }
            </div>
            <Separator className="my-8" />

            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="border p-4">
                    <QRCode value="https://example.com" className="size-40 sm:size-50" />
                </div>
                <div className="w-full min-w-0 flex-1 space-x-0 space-y-4">
                    <p className="text-gray-500 uppercase text-sm">HASH BLOCKCHAIN</p>
                    <div className="w-full break-all bg-muted p-4 font-mono text-sm">
                        0x7f3a9b2e1c8d4f6a<br />
                        5e0c3b7d9f2a8e4c <br />
                        1b6d0f3a7c9e2b5d
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground"><div className="size-2 bg-green-600 rounded-full" /> <span>Polygon</span>•  <span className="text-green-700">BLOQUE CONFIRMANDO</span></div>
                </div>
            </div>
            <div className="">
                <div className="mt-6 bg-muted border p-6 space-y-2">
                    <p className="text-muted-foreground">LICENCIA OFICIAL DE COMERCIO</p>
                    <span className="text-xl">RUCOM • Ministerio de Minas</span>
                </div>
                <div className="mb-6 p-6 space-y-2 border-x border-b">
                    <p className="text-muted-foreground">Certificado emitido por Brillo Color S.A.S.</p>
                    <span className="text-muted-foreground">Brillo Color S.A.S. • CC Pasaje Cali</span>
                </div>
            </div>
            <div className="p-4 text-center text-lg bg-primary text-white">VERIFICAR EN BLOCKCHAIN</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Button variant="outline" size="lg" className="w-full">DESCAGAR PDF</Button>
                <Button variant="outline" size="lg" className="w-full">COMPARTIR</Button>
                <Button variant="outline" size="lg" className="w-full">WHATSAPP</Button>
            </div>

            <Card className="border-border border ring-0">
                <CardHeader className="flex flex-col items-start justify-between gap-3 border-b sm:flex-row sm:items-center">
                    <CardTitle className="font-normal">
                        PANEL DE EMISION
                    </CardTitle>
                    <Badge className="border border-border p-2 bg-muted text-muted-foreground">SOLO BRILLO COLOR</Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {
                        moreDetails.map((detail, index) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: static display data
                            <div key={index} className="flex flex-col">
                                <span className="text-gray-500 uppercase text-sm">{detail.label}</span>
                                <span className="text-primary text-xl border p-4 mt-2">{detail.value}</span>
                            </div>
                        ))
                    }

                </CardContent>
            </Card>
        </section>
    )
}
