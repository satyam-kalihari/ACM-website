import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db/createUser";
import { getUserFromDB } from "@/lib/db/getUser";

const Dashboard = async () => {
  // const router = useRouter();
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  let dbUser = null;
  try {
    dbUser = await getUserFromDB(clerkUser.id);

    if (!dbUser) {
      const newDbUser = await createUser({
        fullname: clerkUser.firstName + " " + clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
        clerkId: clerkUser.id,
        avatar: clerkUser.imageUrl,
        role: "user",
        techStack: [],
      });

      dbUser = newDbUser.dbUser;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Error creating user", error);
    }
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <p className="text-red-500">
          We are having trouble loading your profile. Please try again later.
        </p>
      </div>
    );
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
