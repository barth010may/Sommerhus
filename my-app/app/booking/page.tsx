"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import Image from "next/image";
import emailjs from "emailjs-com";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { triggerConfetti } from "@/components/confetti";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { isDateReserved } from "@/lib/reservation-utils";

export default function BookingPage() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<
    { from: Date; to?: Date } | undefined
  >(undefined);
  const [guests, setGuests] = useState<string>("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastInquiry, setLastInquiry] = useState<any | null>(null);

  // Load reservations from MongoDB API on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        console.log("Fetched bookings:", data);
        setReservations(data);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };
    
    fetchReservations();
  }, []);
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setCheckIn(dateRange.from);
      setCheckOut(dateRange.to);
    } else {
      setCheckIn(undefined);
      setCheckOut(undefined);
    }
  }, [dateRange]);

  // Check if a date range has any reserved dates in it
  const hasReservedDatesInRange = (start: Date, end: Date) => {
    const currentDate = new Date(start);
    while (currentDate <= end) {
      if (isDateReserved(new Date(currentDate))) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        checkIn,
        checkOut,
        guests,
        name,
        email,
        phone,
        specialRequests,
      };
      // Send email to admin
      const adminTemplateParams = {
        checkIn: checkIn?.toLocaleDateString() || "N/A",
        checkOut: checkOut?.toLocaleDateString() || "N/A",
        guests,
        name,
        email,
        phone,
        specialRequests: specialRequests || "None",
        numberOfNights: Math.ceil(
          (checkOut!.getTime() - checkIn!.getTime()) / (1000 * 60 * 60 * 24)
        ),
      };

      const response = await emailjs.send(
        "service_or79l6j", // Your EmailJS service ID
        "template_admin_booking", // Admin template ID
        adminTemplateParams,
        "eNLGD-6jaeg6HuZRm" // Your EmailJS user ID
      );

      console.log("Admin email sent successfully:", response.status);

      // Save submitted inquiry so the overview can show accurate details
      setLastInquiry(bookingData);

      // Show success message
      setSubmitSuccess(true);
      // Fire confetti
      try {
        triggerConfetti({ count: 60 });
      } catch (e) {
        /* ignore */
      }
      // Reset form
      setCheckIn(undefined);
      setCheckOut(undefined);
      setDateRange(undefined);
      setName("");
      setEmail("");
      setPhone("");
      setSpecialRequests("");
      setGuests("2");
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      alert("Failed to submit booking inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  Vælg dine ønskede datoer og angiv dine oplysninger, så kontakter vi dig vedrørende din booking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess ? (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center space-y-3">
                    <h3 className="text-lg font-semibold text-green-900">
                      Tak for din anmodning!
                    </h3>
                    <p className="text-green-800">
                      Tusind tak for din booking-anmodning. Vi vil kontakte dig snart på email eller telefon.
                    </p>
                    <p className="text-sm text-green-700">
                      Vi plejer at tage kontakt inden for 1-2 dage 😊
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Datoer</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="check-in">Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !dateRange && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateRange?.from && dateRange?.to ? (
                                <>
                                  {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                                  {format(dateRange.to, "dd/MM/yyyy")}
                                </>
                              ) : (
                                "Vælg periode"
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="range"
                              selected={dateRange}
                              onSelect={(range) => {
                                if (
                                  range?.from &&
                                  range?.to &&
                                  hasReservedDatesInRange(range.from, range.to)
                                ) {
                                  alert(
                                    "Der er reserverede datoer i det valgte interval."
                                  );
                                  return;
                                }
                                setDateRange(range);
                              }}
                              numberOfMonths={2}
                              disabled={(date) =>
                                date < new Date() || isDateReserved(date)
                              }
                              modifiers={{
                                reserved: (date) => isDateReserved(date),
                              }}
                              modifiersClassNames={{
                                reserved: "bg-red-100 text-red-900 line-through opacity-70",
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        {/*<Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-in"
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !checkIn && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {checkIn
                                ? checkIn.toLocaleDateString()
                                : "Vælg dato"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={checkIn}
                              onSelect={setCheckIn}
                              disabled={(date) =>
                                date < new Date() ||
                                isDateReserved(date) ||
                                (checkOut ? date >= checkOut : false)
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
                                !checkOut && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {checkOut
                                ? checkOut.toLocaleDateString()
                                : "Vælg dato"}
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
                                      "Der er reserverede datoer i det valgte interval. Vælg venligst et andet interval."
                                    );
                                    return;
                                  }
                                }
                                setCheckOut(date);
                              }}
                              disabled={(date) =>
                                date < new Date() ||
                                isDateReserved(date) ||
                                (checkIn ? date <= checkIn : false)
                              }
                              initialFocus
                              components={{
                                day: ({ date }) => DayContent(date),
                              }}
                            />
                          </PopoverContent>
                        </Popover>*/}
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
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
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
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="special-requests">
                        Specielle Ønsker (valgfrit)
                      </Label>
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
                      disabled={
                        !checkIn || !checkOut || !name || !email || !phone || isSubmitting
                      }
                    >
                      {isSubmitting ? "Sender..." : "Bekræft Bestilling"}
                    </Button>
                  </div>
                </form>
                )}
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
                    <span>
                      {submitSuccess && lastInquiry?.checkIn
                        ? new Date(lastInquiry.checkIn).toLocaleDateString()
                        : checkIn
                        ? checkIn.toLocaleDateString()
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Check-out</span>
                    <span>
                      {submitSuccess && lastInquiry?.checkOut
                        ? new Date(lastInquiry.checkOut).toLocaleDateString()
                        : checkOut
                        ? checkOut.toLocaleDateString()
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Antal Gæster</span>
                    <span>
                      {submitSuccess && lastInquiry?.guests
                        ? lastInquiry.guests
                        : guests}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
