"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarIcon, ChevronLeft, Info } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data for booked dates
const bookedDates = [
  new Date(2024, 5, 10), // June 10
  new Date(2024, 5, 11), // June 11
  new Date(2024, 5, 12), // June 12
  new Date(2024, 5, 20), // June 20
  new Date(2024, 5, 21), // June 21
  new Date(2024, 6, 15), // July 15
  new Date(2024, 6, 16), // July 16
  new Date(2024, 6, 17), // July 17
  new Date(2024, 6, 18), // July 18
  new Date(2024, 7, 5), // August 5
  new Date(2024, 7, 6), // August 6
  new Date(2024, 7, 7), // August 7
]

export default function BookingPage() {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState<string>("2")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  // Function to disable already booked dates
  const disabledDates = (date: Date) => {
    return bookedDates.some(
      (bookedDate) =>
        date.getDate() === bookedDate.getDate() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getFullYear() === bookedDate.getFullYear(),
    )
  }

  // Calculate total price (number of nights * price per night)
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights * 150 // $150 per night
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would send this data to your backend
    const bookingData = {
      checkIn,
      checkOut,
      guests,
      name,
      email,
      phone,
      specialRequests,
      totalPrice: calculateTotalPrice(),
    }

    console.log("Booking submitted:", bookingData)

    // Navigate to confirmation page
    router.push("/booking/confirmation")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex items-center h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/SommerhusLogo.jpg" // Replace with your logo path
              alt="Sommerhus Logo"
              width={40} // Adjust the width as needed
              height={40} // Adjust the height as needed
              className="rounded-full" // Optional: Add styling if needed
            />
            <span className="text-xl font-semibold">Sommerhus Ophold</span>
          </Link>
        </div>
      </header>
      <main className="container px-4 py-12 mx-auto md:px-6">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ChevronLeft className="w-4 h-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Book dit ophold</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Detaljer</CardTitle>
                <CardDescription>
                  Vælg dine ønskede datoer og angiv dine oplysninger for at booke sommerhuset.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Dates</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="check-in">Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-in"
                              variant="outline"
                              className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {checkIn ? checkIn.toLocaleDateString() : "Vælg dato"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkIn}
                              onSelect={setCheckIn}
                              disabled={(date) =>
                                date < new Date() || disabledDates(date) || (checkOut ? date >= checkOut : false)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="check-out">Check-out</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-out"
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !checkOut && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {checkOut ? checkOut.toLocaleDateString() : "Vælg dato"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkOut}
                              onSelect={setCheckOut}
                              disabled={(date) =>
                                date < new Date() || disabledDates(date) || (checkIn ? date <= checkIn : false)
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guests">Gæster</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger id="guests">
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 gæst</SelectItem>
                          <SelectItem value="2">2 gæster</SelectItem>
                          <SelectItem value="3">3 gæster</SelectItem>
                          <SelectItem value="4">4 gæster</SelectItem>
                          <SelectItem value="5">5 gæster</SelectItem>
                          <SelectItem value="6">6 gæster</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Din Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Navn</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefon Nummer</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="special-requests">Specielle Ønsker (valgfrit)</Label>
                      <Textarea
                        id="special-requests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Fortæl os hvis du har nogen specielle ønsker eller spørgsmål"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!checkIn || !checkOut || !name || !email || !phone}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Oversigt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sommerhus i Dyreborg</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Check-in</span>
                    <span>{checkIn ? checkIn.toLocaleDateString() : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Check-out</span>
                    <span>{checkOut ? checkOut.toLocaleDateString() : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Antal Gæster</span>
                    <span>{guests}</span>
                  </div>
                </div>
                {/*<div className="pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">${calculateTotalPrice()}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground"></p>
                </div>*/}
              </CardContent>
              {/*<CardFooter className="flex flex-col items-start gap-2 border-t">
                <div className="flex items-start gap-2 text-sm">
                  <Info className="w-4 h-4 mt-0.5 text-green-600" />
                  <p>Gratis annullering optil 14 dage før check-in</p>
                </div>
              </CardFooter>*/}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
