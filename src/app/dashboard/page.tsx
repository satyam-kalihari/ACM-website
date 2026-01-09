import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db/createUser";
import { getUserFromDB } from "@/lib/db/getUser";
import { Spinner } from "@/components/ui/spinner";
import { platform } from "os";
import { string } from "zod";
interface PlatformCard {
  platform: string;
  heading: string;
  value: number;
  point: number;
  icon: string;
}

const Dashboard = async () => {
  // const router = useRouter();
  const platformCardsDetail: PlatformCard[] = [
    { platform: "leetcode", heading: "hard", value: 3, point: 12, icon: "" },
    { platform: "leetcode", heading: "medium", value: 15, point: 30, icon: "" },
    { platform: "leetcode", heading: "easy", value: 43, point: 34, icon: "" },
    { platform: "github", heading: "stars", value: 43, point: 3, icon: "" },
  ];

  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    let dbUser = null;
    try {
      dbUser = await getUserFromDB(clerkUser.id);
      if (dbUser) {
        break;
      }

      if (!dbUser) {
        const newDbUser = await createUser({
          fullname: clerkUser.firstName || "" + " " + clerkUser.lastName || "",
          email: clerkUser.emailAddresses[0].emailAddress,
          clerkId: clerkUser.id,
          avatar: clerkUser.imageUrl || "/default-avatar.png",
          role: "user",
          techStack: [],
        });

        dbUser = newDbUser.dbUser;
      }
    } catch (error) {
      retries++;
      console.log(retries);
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
    await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
  }

  return (
    <Suspense
      fallback={
        <div className="flex w-screen h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <section id="tittle_section">
        <div id="hello_message">Ready to rock {clerkUser.firstName} ?</div>
        <div id="total_point"></div>
      </section>
      <section id="content_section">
        <div id="content_left">
          <div id="platform_cards" className=" grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-2.5">
            {platformCardsDetail.map((card) => (
              <div
                key={card.heading}
                className="w-[140] md:w-40 h-20 bg-amber-100 m-2 rounded-2xl mx-auto"
              ></div>
            ))}
          </div>
          <div id="leaderboard"></div>
        </div>
        <div id="content_right"></div>
      </section>
    </Suspense>
  );
};

export default Dashboard;
