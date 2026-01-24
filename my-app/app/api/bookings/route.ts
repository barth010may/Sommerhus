import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

// GET all bookings
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const bookings = await db.collection("Bookings").find().toArray();

    const formattedBookings = bookings.map((booking) => ({
      id: booking._id.toString(),
      start: new Date(booking.start || booking.startDate).toISOString(),
      end: new Date(booking.end || booking.endDate).toISOString(),
      createdAt: new Date().toISOString(),
      notes: booking.comment || booking.notes || "",
    }));

    return NextResponse.json(formattedBookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// POST a new booking
export async function POST(req: Request) {
  const data = await req.json();

  try {
    const { db } = await connectToDatabase();
    
    // Don't store the client-provided id, let MongoDB generate _id
    const { id, ...bookingData } = data;
    
    const newBooking = await db.collection("Bookings").insertOne(bookingData);

    return NextResponse.json(
      { insertedId: newBooking.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to insert booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE a booking by ID
export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "Booking ID is required" },
      { status: 400 }
    );
  }

  try {
    const { db } = await connectToDatabase();
    const objectId = new ObjectId(id);
    const deletedBooking = await db
      .collection("Bookings")
      .findOneAndDelete({ _id: objectId });

    if (!deletedBooking || !deletedBooking._id) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
