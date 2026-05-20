import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    const { name, city, rating, review } = await req.json();

    if (!name || !rating || !review) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await client.connect();
    const db = client.db("docappoint");
    const collection = db.collection("reviews");

    await collection.insertOne({
      name,
      city: city || "",
      rating,
      review,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    await client.close();
  }
}