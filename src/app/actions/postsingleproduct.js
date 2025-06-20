"use server";

// import { revalidatePath } from "next/cache";
import dbConnect, { collectionNames } from "../../lib/dbConnect";

export const postSingleData = async (postedData) => {
  try {
    // const postedData = await req.json();
    const result = await dbConnect(collectionNames.PRACTICE_DATA).insertOne(
      postedData
    );
    revalidatePath("/products");

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
