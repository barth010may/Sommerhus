"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarIcon, ChevronLeft } from "lucide-react"
import Image from "next/image"
import emailjs from "emailjs-com"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { isDateReserved } from "@/lib/reservation-utils"

export default function BookingPage() {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState<string>("2")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [reservations, setReservations] = useState<any[]>([])

  // Load reservations from localStorage on component mount
  useEffect(() => {
    const savedReservations = localStorage.getItem("reservations")
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations))
    }
  }, [])

  // Custom component to render calendar days with visual indication of reserved dates
  const DayContent = (day: Date) => {
    const isReserved = isDateReserved(day)
    return (
      <div
        className={cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          isReserved && "bg-red-100 text-red-900 line-through opacity-70",
        )}
      >
        <div className="flex h-full w-full items-center justify-center rounded-md">{format(day, "d")}</div>
      </div>
    )
  }

  // Calculate total price (number of nights * price per night)
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights * 150 // 150 DKK per night
  }

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Send email using EmailJS
    try {
      const templateParams = {
        checkIn: checkIn?.toLocaleDateString() || "N/A",
        checkOut: checkOut?.toLocaleDateString() || "N/A",
        guests,
        name,
        email,
        phone,
        specialRequests: specialRequests || "None",
        totalPrice: `${calculateTotalPrice()} DKK`,
      }

      const response = await emailjs.send(
        "service_or79l6j", // Your EmailJS service ID
        "template_61xxjng", // Your EmailJS template ID
        templateParams,
        "eNLGD-6jaeg6HuZRm", // Your EmailJS user ID
      )

      console.log("Email sent successfully:", response.status, response.text)

      // Navigate to confirmation page
      const queryString = new URLSearchParams({
        checkIn: checkIn?.toISOString() || "",
        checkOut: checkOut?.toISOString() || "",
        guests,
        name,
        email,
        phone,
        specialRequests,
        totalPrice: calculateTotalPrice().toString(),
      }).toString()

      router.push(`/booking/confirmation?${queryString}`)
    } catch (error) {
      console.error("Failed to send email:", error)
      alert("Failed to send booking confirmation email. Please try again.")
    }
  }

  // Check if a date range has any reserved dates in it
  const hasReservedDatesInRange = (start: Date, end: Date) => {
    const currentDate = new Date(start)
    while (currentDate <= end) {
      if (isDateReserved(new Date(currentDate))) {
        return true
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex items-center h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/SommerhusLogo.jpg" // Your logo path
              alt="Sommerhus Logo"
              width={40}
              height={40}
              className="rounded-full"
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
                    <h3 className="font-medium">Datoer</h3>
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
                                date < new Date() || isDateReserved(date) || (checkOut ? date >= checkOut : false)
                              }
                              initialFocus
                              components={{
                                day: ({ date }) => DayContent(date),
                              }}
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
                              onSelect={(date) => {
                                if (checkIn && date) {
                                  // Check if there are any reserved dates in the range
                                  if (hasReservedDatesInRange(checkIn, date)) {
                                    alert(
                                      "Der er reserverede datoer i det valgte interval. Vælg venligst et andet interval.",
                                    )
                                    return
                                  }
                                }
                                setCheckOut(date)
                              }}
                              disabled={(date) =>
                                date < new Date() || isDateReserved(date) || (checkIn ? date <= checkIn : false)
                              }
                              initialFocus
                              components={{
                                day: ({ date }) => DayContent(date),
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <div className="w-3 h-3 bg-red-100 rounded-sm"></div>
                      <span>Reserverede datoer</span>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guests">Gæster</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger id="guests">
                          <SelectValue placeholder="Vælg antal gæster" />
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
                      Bekræft Bestilling
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
                {checkIn && checkOut && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">{calculateTotalPrice()} DKK</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nætter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
