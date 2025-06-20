"use server";

import dbConnect, { collectionNames } from "@/lib/dbConnect";

const RegisterUser = async (payload) => {
  try {
    // need to check if unique username was given
    const result = await dbConnect(collectionNames.TEST_USER).insertOne(
      payload
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default RegisterUser;
