import { format, parseISO, isWithinInterval } from "date-fns"

export type Reservation = {
  id: string
  start: string // ISO string
  end: string // ISO string
  createdAt: string // ISO string
  notes?: string
}

/**
 * Get all reservations from localStorage
 */
export function getReservations(): Reservation[] {
  if (typeof window === "undefined") return []

  const savedReservations = localStorage.getItem("reservations")
  if (!savedReservations) return []

  return JSON.parse(savedReservations)
}

/**
 * Save reservations to localStorage
 */
export function saveReservations(reservations: Reservation[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("reservations", JSON.stringify(reservations))
}

/**
 * Add a new reservation
 */
export function addReservation(start: Date, end: Date, notes?: string): Reservation {
  const newReservation: Reservation = {
    id: crypto.randomUUID(),
    start: start.toISOString(),
    end: end.toISOString(),
    createdAt: new Date().toISOString(),
    notes,
  }

  const reservations = getReservations()
  saveReservations([...reservations, newReservation])

  return newReservation
}

/**
 * Delete a reservation by ID
 */
export function deleteReservation(id: string): void {
  const reservations = getReservations()
  saveReservations(reservations.filter((r) => r.id !== id))
}

/**
 * Check if a date is reserved
 */
export function isDateReserved(date: Date): boolean {
  const reservations = getReservations()

  return reservations.some((reservation) => {
    const start = parseISO(reservation.start)
    const end = parseISO(reservation.end)

    return isWithinInterval(date, { start, end })
  })
}

/**
 * Get all reserved dates as Date objects
 */
export function getAllReservedDates(): Date[] {
  const reservations = getReservations()
  const dates: Date[] = []

  reservations.forEach((reservation) => {
    const start = parseISO(reservation.start)
    const end = parseISO(reservation.end)

    // Add all dates in the range
    const currentDate = new Date(start)
    while (currentDate <= end) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
  })

  return dates
}

/**
 * Format a reservation for display
 */
export function formatReservation(reservation: Reservation): string {
  const start = parseISO(reservation.start)
  const end = parseISO(reservation.end)

  return `${format(start, "PP")} - ${format(end, "PP")}`
}
