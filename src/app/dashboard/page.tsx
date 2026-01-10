import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db/createUser";
import { getUserFromDB } from "@/lib/db/getUser";
import { Spinner } from "@/components/ui/spinner";
import Leaderboard from "@/components/Leaderboard";
import { AlignEndHorizontal, Book, FolderGit, FolderGit2, Star } from "lucide-react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Spotlight } from "@/components/ui/spotlight-new";

interface PlatformCard {
  platform: "leetcode" | "github";
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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
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
      <div className="relative min-h-screen overflow-x-clip">
        {/* <BackgroundRippleEffect rows={16} /> */}
        <div className="w-screen h-screen fixed">
          <Spotlight />
        </div>
        <section id="tittle_section">
          <div id="hello_message">Ready to rock {clerkUser.firstName} ?</div>
          <div id="total_point"></div>
        </section>
        <section id="content_section" className="lg:flex">
          {/* content_left */}
          <div id="content_left" className="sm:w-3/4">
            {/* platform_cards */}
            <div
              id="platform_cards"
              className=" grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-2.5"
            >
              {platformCardsDetail.map((card) => (
                <div
                  key={card.heading}
                  className="w-[140] md:w-40 h-20 m-2 rounded-md mx-auto bg-cover "
                >
                  <div
                    className={`h-full w-full p-1 sm:pl-2 sm:pt-2 ${
                      card.platform == "leetcode"
                        ? "from-yellow-400/30 to-yellow-50/30"
                        : "from-fuchsia-400/30 to-red-100/30"
                    } bg-linear-to-br rounded-md backdrop-blur-xs border ${
                      card.platform == "leetcode"
                        ? "border-yellow-500/50"
                        : "border-fuchsia-600/50"
                    }`}
                  >
                    <div
                      id="platform_card_header"
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-4 items-center">
                        <div id="platform_card_icon">
                          {card.platform == "leetcode" ? (
                            <AlignEndHorizontal color="#ecdd79" />
                          ) : (
                            // <BadgeQuestionMark color="#ecdd79" />
                            <FolderGit color="#d979ec" />
                          )}
                        </div>
                        <div id="platform_card_header_text">{card.heading}</div>
                      </div>
                      <div id="platform_card_value" className="mx-1">
                        {card.value}
                      </div>
                    </div>
                    <div
                      id="platform_card_points"
                      className="mx-1 flex justify-center items-center font-bold text-3xl m-auto "
                    >
                      {card.point}
                    </div>
                  </div>
                </div>
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
            className="min-w-fit mt-5 sm:px-2.5 sm:mx-auto"
          >
            {/* github_card */}
            <div
              id="github_card"
              className="w-70 h-70 mx-auto p-1 sm:pl-2 sm:pt-2
                       sm:rounded-md backdrop-blur-xs border border-white/30"
            ></div>
            {/* github_toggle */}
            <div
              id="github_toggle"
              className="mb-2 mt-7 w-40 h-10 b sm:rounded-sm  border border-fuchsia-600/50 relative flex"
            >
              <div className="w-1/2 flex justify-center items-center">
                <FolderGit2 size={18} />
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <Star size={18} />
              </div>
              <div className="w-1/2 absolute left-0 bg-fuchsia-400/20 sm:rounded-sm backdrop-blur-xs -z-10 h-full"></div>
            </div>
            {/* repos */}
            <div id="repos" className="flex flex-col items-center gap-2">
              {githubRepos.map((repo, key) => (
                <div
                  key={key}
                  id="repo_card"
                  className="border border-white/30 sm:rounded-sm w-80 sm:w-95 h-11 p-2"
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <Book /> <h2 className="ml-2">{repo.reponame}</h2>
                    </div>
                    <Star
                      fill={repo.stared ? "white" : "none"}
                      className="left-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Dashboard;
