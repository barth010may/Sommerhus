import Link from "next/link"
import Image from "next/image"
import { Calendar, Info, MapPin, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-600" />
            <span className="text-xl font-semibold">Summerhus Ophold</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
        </div>
      </header>
      <main>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skønt sommerhus i Dyreborg</h1>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-muted-foreground">(48 Anmeldelser)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>Faaborg, Danmark</span>
                </div>
                <p className="text-muted-foreground">
                Flygt til vores fredelige sommerhus ved søen, beliggende midt i naturen. 
                Perfekt til familieferier eller en stille retræte med venner. 
                Nyd den fantastiske udsigt over søen, privat adgang til vandet og alle moderne faciliteter for et behageligt ophold.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Plads til 6 personer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-green-600" />
                    <span className="text-sm">3 soveværelser</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-green-600" />
                    <span className="text-sm">2 badeværelser</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square">
                <Image
                  src="/Sommerhus_pic1.jpg?height=600&width=800"
                  alt="Summerhouse exterior"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="space-y-4 lg:col-span-2">
                <h2 className="text-2xl font-bold tracking-tighter">Om sommerhuset</h2>
                <p className="text-muted-foreground">
                Vores smukke sommerhus tilbyder den perfekte blanding af rustik charme og moderne komfort. 
                Beliggende ved bredden af en uberørt sø, kan du nyde en betagende udsigt og direkte adgang til svømning, fiskeri og sejlads.
                </p>
                <p className="text-muted-foreground">
                Huset har tre hyggelige soveværelser, et fuldt udstyret køkken, en rummelig stue med pejs og en stor terrasse, 
                der er perfekt til udendørs spisning og afslapning. 
                Ejendommen inkluderer en privat bådebro, en robåd til gæsternes brug og en traditionel svensk sauna.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Amenities</h3>
                      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <li>Wifi</li>
                        <li>Pejs</li>
                        <li>Sauna</li>
                        <li>Robåd</li>
                        <li>Udendørs Grill</li>
                        <li>Terasse</li>
                        <li>Fuldt udstyret køkken</li>
                        <li>Vaskemaskine og Tørretumbler</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">House Rules</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Check-in: 15:00 - 20:00</li>
                        <li>Checkout: 11:00</li>
                        <li>Rygning forbudt</li>
                        <li>Ingen fester eller større arrangementer</li>
                        <li>Kæledyr tilladt (med forudgående godkendelse)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Living room"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src="/placeholder.svg?height=300&width=400" alt="Kitchen" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src="/placeholder.svg?height=300&width=400" alt="Bedroom" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div>
                <Card className="sticky top-6">
                  <CardContent className="p-6">
                    {/*<div className="mb-4">
                      <div className="text-2xl font-bold">
                        $150 <span className="text-base font-normal text-muted-foreground">night</span>
                      </div>
                    </div>*/}
                    <div className="space-y-4">
                      <Link href="/booking" className="w-full">
                        <Button className="w-full bg-green-600 hover:bg-green-700">Tjek Tilgængelighed</Button>
                      </Link>
                      <p className="text-sm text-center text-muted-foreground">
                        Gratis afbestilling op til 14 dage før check-in
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container px-4 py-6 mx-auto md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold">Summer Ophold</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
              Dit perfekte sommerhusophold midt i naturen.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-muted-foreground hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:underline">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:underline">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Contact</h3>
              <address className="not-italic text-sm text-muted-foreground">
                Email: info@summerstay.example
                <br />
                Phone: +46 123 456 789
              </address>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 mt-8 pt-6 border-t md:flex-row">
            <p className="text-xs text-muted-foreground">© 2024 SummerStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
