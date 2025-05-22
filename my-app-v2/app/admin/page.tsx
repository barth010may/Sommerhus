"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  parseISO,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Type definitions
type Reservation = {
  id: string
  start: string
  end: string
  createdAt: string
  notes?: string
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [notes, setNotes] = useState("")
  const [isAddingReservation, setIsAddingReservation] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Check if user is authenticated on page load
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)

    // Load reservations from localStorage
    const savedReservations = localStorage.getItem("reservations")
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations))
    }
  }, [])

  // Save reservations to localStorage whenever they change
  useEffect(() => {
    if (reservations.length > 0) {
      localStorage.setItem("reservations", JSON.stringify(reservations))
    }
  }, [reservations])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would validate against a secure backend
    // This is just a simple example - NEVER do authentication this way in production
    if (username === "admin" && password === "password123") {
      localStorage.setItem("adminAuthenticated", "true")
      setIsAuthenticated(true)
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      })
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    setIsAuthenticated(false)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const handleAddReservation = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates",
        variant: "destructive",
      })
      return
    }

    if (endDate < startDate) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date",
        variant: "destructive",
      })
      return
    }

    const newReservation: Reservation = {
      id: crypto.randomUUID(),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      createdAt: new Date().toISOString(),
      notes: notes || undefined,
    }

    setReservations([...reservations, newReservation])
    setStartDate(undefined)
    setEndDate(undefined)
    setNotes("")
    setIsAddingReservation(false)

    toast({
      title: "Reservation added",
      description: `Reserved from ${format(startDate, "PP")} to ${format(endDate, "PP")}`,
    })
  }

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id))
    toast({
      title: "Reservation deleted",
      description: "The reservation has been removed",
    })
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Check if a date is within any reservation
  const isDateReserved = (date: Date) => {
    return reservations.some((reservation) => {
      const start = new Date(reservation.start)
      const end = new Date(reservation.end)
      return isWithinInterval(date, { start, end })
    })
  }

  // Get reservation that contains a specific date
  const getReservationForDate = (date: Date) => {
    return reservations.find((reservation) => {
      const start = new Date(reservation.start)
      const end = new Date(reservation.end)
      return isWithinInterval(date, { start, end })
    })
  }

  // Generate days for the current month view
  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Login to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <h1 className="text-xl font-semibold">Sommerhus Admin</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto md:px-6">
        <Tabs defaultValue="calendar">
          <TabsList className="mb-8">
            <TabsTrigger value="calendar">Calendar Overview</TabsTrigger>
            <TabsTrigger value="reservations">Manage Reservations</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Booking Calendar</h2>
              <Button onClick={() => setIsAddingReservation(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Reservation
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="outline" size="sm" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                    <span className="sr-only">Previous month</span>
                  </Button>
                  <h3 className="text-xl font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                    <span className="sr-only">Next month</span>
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({
                    length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(),
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-20 p-1 border rounded-md opacity-50 bg-gray-50"></div>
                  ))}
                  {getDaysInMonth().map((day) => {
                    const isReserved = isDateReserved(day)
                    const reservation = isReserved ? getReservationForDate(day) : null
                    const isToday = isSameDay(day, new Date())

                    return (
                      <div
                        key={day.toString()}
                        className={cn(
                          "h-20 p-1 border rounded-md",
                          isReserved ? "bg-red-50 border-red-200" : "bg-white",
                          isToday && "border-green-500",
                        )}
                      >
                        <div className="flex flex-col h-full">
                          <div
                            className={cn(
                              "text-right text-sm font-medium",
                              isReserved && "text-red-600",
                              isToday && "text-green-600",
                            )}
                          >
                            {format(day, "d")}
                          </div>
                          {isReserved && reservation && (
                            <div className="mt-auto">
                              <div className="px-1 py-0.5 text-xs bg-red-100 text-red-800 rounded truncate">
                                {reservation.notes || "Reserved"}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <div className="w-3 h-3 bg-red-100 rounded-sm"></div>
                  <span>Reserved dates</span>
                  <div className="w-3 h-3 ml-4 border border-green-500 rounded-sm"></div>
                  <span>Today</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Manage Reservations</h2>
              <Button onClick={() => setIsAddingReservation(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Reservation
              </Button>
            </div>

            {reservations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <p className="mb-4 text-muted-foreground">No reservations found</p>
                  <Button onClick={() => setIsAddingReservation(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Reservation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            {format(parseISO(reservation.start), "PP")} - {format(parseISO(reservation.end), "PP")}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {Math.ceil(
                              (parseISO(reservation.end).getTime() - parseISO(reservation.start).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}{" "}
                            days
                          </p>
                          {reservation.notes && <p className="mt-2 text-sm">{reservation.notes}</p>}
                          <p className="mt-2 text-xs text-muted-foreground">
                            Added on {format(parseISO(reservation.createdAt), "PPp")}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Standalone Add Reservation Dialog */}
      <Dialog open={isAddingReservation} onOpenChange={setIsAddingReservation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Reservation</DialogTitle>
            <DialogDescription>Block dates in the calendar for a new reservation.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div>
              <Label className="block mb-2">Start Date</Label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-md border"
                initialFocus
              />
            </div>

            <div>
              <Label className="block mb-2">End Date</Label>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => (startDate ? date < startDate : false)}
                className="rounded-md border"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this reservation"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingReservation(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReservation}>Add Reservation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
