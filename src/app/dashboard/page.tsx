import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db/createUser";
import { getUserFromDB } from "@/lib/db/getUser";
import { Spinner } from "@/components/ui/spinner";
import Leaderboard from "@/components/Leaderboard";
import { Book, Star } from "lucide-react";

interface PlatformCard {
  platform: string;
  heading: string;
  value: number;
  point: number;
  icon: string;
}

interface githubReoDetail {
  reponame: string;
  stared: boolean;
  language: string;
  repoLink: string;
}

const Dashboard = async () => {
  // const router = useRouter();
  const platformCardsDetail: PlatformCard[] = [
    { platform: "leetcode", heading: "hard", value: 3, point: 12, icon: "" },
    { platform: "leetcode", heading: "medium", value: 15, point: 30, icon: "" },
    { platform: "leetcode", heading: "easy", value: 43, point: 34, icon: "" },
    { platform: "github", heading: "stars", value: 43, point: 3, icon: "" },
  ];

  const githubRepos: githubReoDetail[] = [
    {
      reponame: "ACM-website",
      stared: true,
      language: "TypeScript",
      repoLink: "",
    },
    {
      reponame: "DSA",
      stared: false,
      language: "Java",
      repoLink: "",
    },
    {
      reponame: "clerk-practice-1",
      stared: true,
      language: "TypeScript",
      repoLink: "",
    },
    {
      reponame: "computer-network-college",
      stared: false,
      language: "C",
      repoLink: "",
    },
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
        {/* content_left */}
        <div id="content_left">
          {/* platform_cards */}
          <div
            id="platform_cards"
            className=" grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-2.5"
          >
            {platformCardsDetail.map((card) => (
              <div
                key={card.heading}
                className="w-[140] md:w-40 h-20 bg-amber-100 m-2 rounded-md mx-auto"
              ></div>
            ))}
          </div>

          {/* leaderboard */}
          <div id="leaderboard">
            <Leaderboard />
          </div>
        </div>

        {/* content_right */}
        <div
          id="content_right"
          className="min-w-fit max-w-2xl mt-5 sm:px-2.5 bg-amber-700 sm:mx-auto"
        >
          {/* github_card */}
          <div
            id="github_card"
            className="w-80 h-80 bg-amber-300 mx-auto"
          ></div>
          {/* github_toggle */}
          <div
            id="github_toggle"
            className="my-4 bg-blue-500 w-80 h-13 mx-auto"
          ></div>
          {/* repos */}
          <div id="repos" className="flex flex-col items-center gap-2">
            {githubRepos.map((repo, key) => (
              <div
                key={key}
                id="repo_card"
                className="bg-emerald-500 w-80 h-11 p-2"
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <Book /> <h2 className="ml-2">{repo.reponame}</h2>
                  </div>
                  <Star fill={repo.stared? "white" : "none"} className="left-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Dashboard;
