import Link from "next/link";
import Image from "next/image";
import { Calendar, Info, MapPin, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleMap } from "@/components/google-map"
import { HeroSlider } from "@/components/hero-slider"

export default function Home() {
// Update these coordinates to your actual summerhouse location
  const summerhouseCoordinates = {
    latitude: 55.06952865429421, // Replace with your actual latitude
    longitude: 10.203022059985424, // Replace with your actual longitude
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Slider Section */}
        <section className="relative">
          <HeroSlider />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container px-4 mx-auto md:px-6">
              <div className="max-w-2xl mx-auto text-center text-white">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                  Skønt Sommerhus I Dyreborg
                </h1>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  </div>
                  <span className="text-lg">
                  
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-6 text-lg">
                  <MapPin className="w-5 h-5" />
                  <span>Faaborg, Danmark</span>
                </div>

                <p className="text-lg mb-8 text-white/90 max-w-xl mx-auto">
                  Book et ophold i vores fredelige sommerhus i dyreborg,
                  beliggende tæt på havet med en dejlig natur. Perfekt til
                  familieferier eller en stille sommerhus tur med venner.
                </p>

                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Tjek Tilgængelighed
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div className="space-y-2">
                <Users className="w-8 h-8 text-green-600 mx-auto" />
                <h3 className="font-semibold">Plads til 6 personer</h3>
              </div>
              <div className="space-y-2">
                <Info className="w-8 h-8 text-green-600 mx-auto" />
                <h3 className="font-semibold">4 soveværelser</h3>
              </div>
              <div className="space-y-2">
                <Info className="w-8 h-8 text-green-600 mx-auto" />
                <h3 className="font-semibold">1 stort badeværelse</h3>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="space-y-4 lg:col-span-2">
                <h2 className="text-2xl font-bold tracking-tighter">
                  Om sommerhuset
                </h2>
                <p className="text-muted-foreground">
                  Vores smukke sommerhus tilbyder den perfekte blanding af
                  rustik charme og moderne komfort. Beliggende ved tæt på havet
                  med adgang til en dejlig sand strand, kan du nyde en betagende
                  udsigt og direkte adgang til svømning, fiskeri og sejlads.
                </p>
                <p className="text-muted-foreground">
                  Huset har fire hyggelige soveværelser, et fuldt udstyret
                  køkken, en rummelig stue med pejs og en stor terrasse, der er
                  perfekt til udendørs spisning og afslapning. Ejendommen
                  inkluderer en indedørs boblebad og en traditionel finsk sauna.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Faciliteter</h3>
                      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <li>Wifi</li>
                        <li>Pejs</li>
                        <li>Sauna</li>
                        <li>Boblebad</li>
                        <li>Udendørs Grill</li>
                        <li>Terasse</li>
                        <li>Fuldt udstyret køkken</li>
                        <li>Vaskemaskine og Tørretumbler</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Husregler</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>Check-in: 15:00 - 20:00</li>
                        <li>Check-ud: 11:00</li>
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
                      src="/master.jpeg?height=300&width=400"
                      alt="Living room"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/kokken.jpeg?height=300&width=400"
                      alt="Kitchen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/bad.jpeg?height=300&width=400"
                      alt="Bedroom"
                      fill
                      className="object-cover"
                    />
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
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Tjek Tilgængelighed
                        </Button>
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
        {/* Location Section with Google Maps */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto md:px-6">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter">Beliggenhed</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Vores sommerhus er beliggende i det smukke Dyreborg område, omgivet af natur og med nem adgang til
                  havet.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  {/* Primary map - Google Maps */}
                  <div>
                    <h3 className="text-lg font-medium mb-2"></h3>
                    <GoogleMap
                      latitude={summerhouseCoordinates.latitude}
                      longitude={summerhouseCoordinates.longitude}
                      zoom={15}
                      title="Sommerhus i Dyreborg"
                      className="w-full h-96"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Adresse</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-green-600" />
                          <div>
                            <p>Vibevej 25</p>
                            <p>5600 Faaborg</p>
                            <p>Danmark</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                 <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">I Nærheden</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Dyreborg Strand</span>
                          <span className="text-muted-foreground">2 min gåtur</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Lokal Købmand</span>
                          <span className="text-muted-foreground">5 min cykeltur</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Faaborg Havn</span>
                          <span className="text-muted-foreground">10 min kørsel</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Dyreborg Station</span>
                          <span className="text-muted-foreground">15 min kørsel</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Odense</span>
                          <span className="text-muted-foreground">47 min kørsel</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                 {/* <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Transport</h3>
                      <ul className="space-y-2 text-sm">
                        <li>🚗 Gratis parkering på stedet</li>
                        <li>🚌 Offentlig transport tilgængelig</li>
                        <li>🚲 Cykeludlejning i nærheden</li>
                        <li>✈️ 45 min fra Københavns Lufthavn</li>
                      </ul>
                    </CardContent>
                  </Card>*/}
                </div>
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
                <span className="text-lg font-semibold">Sommer Ophold</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Dit perfekte sommerhusophold midt i naturen.
              </p>
            </div>
            {/*
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
            </div>*/}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Kontakt</h3>
              <address className="not-italic text-sm text-muted-foreground">
                Email: camilla.vikoren@gmail.com
                <br />
                Phone: +45 29 60 78 21
              </address>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 mt-8 pt-6 border-t md:flex-row">
            <p className="text-xs text-muted-foreground">
              © 2025 VIKBOR Holding. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
