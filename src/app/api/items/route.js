import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export async function GET() {
  const data = await dbConnect(collectionNames.PRACTICE_DATA)
    .find({})
    .toArray();

  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "API-Key": process.env.DATA_API_KEY,
  //     },
  //   });
  //   const data = await res.json();

  return Response.json({ data });
}

export async function POST(req) {
  const postedData = await req.json();
  const result = await dbConnect(collectionNames.PRACTICE_DATA).insertOne(
    postedData
  );
  revalidatePath("/products");

  return Response.json({ result });
}
