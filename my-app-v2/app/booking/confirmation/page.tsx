"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  // Retrieve query parameters
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const specialRequests = searchParams.get("specialRequests");
  const totalPrice = searchParams.get("totalPrice");

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container flex items-center justify-center px-4 py-12 mx-auto md:px-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Booking Bekræftet!</CardTitle>
            <CardDescription>
              Tak, {name || "Gæst"}! Din booking er bekræftet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50">
              <h3 className="mb-2 font-medium">Booking Detaljer</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Navn:</div>
                <div>{name || "N/A"}</div>
                <div className="text-muted-foreground">Email:</div>
                <div>{email || "N/A"}</div>
                <div className="text-muted-foreground">Telefon:</div>
                <div>{phone || "N/A"}</div>
                <div className="text-muted-foreground">Check-in:</div>
                <div>
                  {checkIn ? new Date(checkIn).toLocaleDateString() : "N/A"}
                </div>
                <div className="text-muted-foreground">Check-out:</div>
                <div>
                  {checkOut ? new Date(checkOut).toLocaleDateString() : "N/A"}
                </div>
                <div className="text-muted-foreground">Antal Gæster:</div>
                <div>{guests || "N/A"}</div>
                <div className="text-muted-foreground">Specielle Ønsker:</div>
                <div>{specialRequests || "Ingen"}</div>
                <div className="text-muted-foreground">Samlet Pris:</div>
                <div>{/*totalPrice ? `${totalPrice} DKK` : "N/A"*/}???</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Hvad er det næste?</h3>
              <p className="text-sm text-muted-foreground">
                Tak for din booking! Vi glæder os til at byde dig velkommen i
                vores sommerhus. Vi kontakter dig så snart som muligt for at
                aftale videre detaljer af din booking.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
              <Link href="/">Tilbage til hovedsiden</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/booking">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Lav endnu en booking
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
