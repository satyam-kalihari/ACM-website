import User from "../models/User";
import connectToDB from "./connectToDB";

export const getUserFromDB = async (clerkId: string) => {
  try {
    await connectToDB();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Database connection error!");
    } else {
      console.log("Error connection to DB", error);
    }
  }

  try {
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error fetching user", error);
    }
  }
};
