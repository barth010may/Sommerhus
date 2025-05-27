import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"

const uri = process.env.MONGODB_URI || ""
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const database = client.db("Sommerhus")
    const bookings = await database.collection("Bookings").find().toArray()

    const formattedBookings = bookings.map((booking) => ({
        id: booking._id.toString(),
        start: new Date(booking.startDate).toISOString(), // ensures valid ISO
        end: new Date(booking.endDate).toISOString(),
        createdAt: new Date().toISOString(),
        notes: booking.comment || "",
    }))

    return NextResponse.json(formattedBookings)
  } catch (error) {
    console.error("Failed to fetch bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(req: Request) {
  const data = await req.json()

  try {
    const { db } = await connectToDatabase()
    const newBooking = await db.collection("Bookings").insertOne(data)

    return NextResponse.json({ insertedId: newBooking.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Failed to insert booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}