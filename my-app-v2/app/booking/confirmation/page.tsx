import Link from "next/link"
import { Check, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
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
            <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
            <CardDescription>Your summerhouse booking has been successfully confirmed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50">
              <h3 className="mb-2 font-medium">Booking Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Booking ID:</div>
                <div>SUM-12345</div>
                <div className="text-muted-foreground">Property:</div>
                <div>Lakeside Summerhouse</div>
                <div className="text-muted-foreground">Check-in:</div>
                <div>June 15, 2024</div>
                <div className="text-muted-foreground">Check-out:</div>
                <div>June 20, 2024</div>
                <div className="text-muted-foreground">Guests:</div>
                <div>4</div>
                <div className="text-muted-foreground">Total Amount:</div>
                <div>$750</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">What's Next?</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation email with all the details to your email address. You'll receive check-in
                instructions and directions to the property a week before your arrival.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/booking">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Make Another Booking
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
