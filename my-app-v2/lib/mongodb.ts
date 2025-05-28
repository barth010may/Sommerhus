// lib/mongodb.ts
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {}

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let client
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db("Sommerhus") // You can specify db name if needed
  return { client, db }
}
