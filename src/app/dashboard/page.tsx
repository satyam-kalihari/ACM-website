import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db/createUser";
import { getUserFromDB } from "@/lib/db/getUser";
import { Spinner } from "@/components/ui/spinner";
import Leaderboard from "@/components/Leaderboard";
import {
  AlignEndHorizontal,
  Book,
  FolderGit,
  FolderGit2,
  Star,
  Users,
} from "lucide-react";
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

const Dashboard = async () => {
  // const router = useRouter();
  const platformCardsDetail: PlatformCard[] = [
    { platform: "leetcode", heading: "Hard", value: 3, point: 12, icon: "" },
    { platform: "leetcode", heading: "Medium", value: 15, point: 30, icon: "" },
    { platform: "leetcode", heading: "Easy", value: 43, point: 34, icon: "" },
    { platform: "github", heading: "Stars", value: 43, point: 3, icon: "" },
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
      <div className="relative min-h-screen overflow-x-clip pb-10 bg-transparent text-foreground transition-colors duration-300">

        <div className="w-screen h-screen fixed -z-10 dark:bg-[#040609] bg-transparent">
          <Spotlight className="hidden dark:block" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <section id="tittle_section">
            <div
              id="hello_message"
              className="font-roboto text-2xl md:text-4xl font-bold mt-8 mb-8 text-foreground"
            >
              Good to see you, <span className="text-[#00BCA2]">{clerkUser.firstName}</span>
            </div>
          </section>

          <section id="content_section" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column: Stats & Leaderboard */}
            <div className="lg:col-span-3 space-y-8">
              {/* Platform Cards */}
              <div
                id="platform_cards"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {platformCardsDetail.map((card) => (
                  <div
                    key={card.heading}
                    className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:bg-card/80 transition-colors shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${card.platform === "leetcode" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500" : "bg-purple-500/10 text-purple-600 dark:text-purple-500"}`}>
                        {card.platform === "leetcode" ? (
                          <AlignEndHorizontal size={20} />
                        ) : (
                          <FolderGit size={20} />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-foreground">{card.point}</div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground">{card.heading}</div>
                      <div className="text-xs text-muted-foreground mt-1">Total: {card.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Leaderboard */}
              <div id="leaderboard" className="space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#00BCA2]" /> Leaderboard
                </h2>
                <Leaderboard isDashboard={true} />
              </div>
            </div>

            {/* Right Column: GitHub Profile */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* GitHub Profile Card */}
                <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden p-6 space-y-6 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-[#00BCA2] p-1 mb-4">
                      <div className="w-full h-full rounded-full bg-cover bg-center bg-gray-200 dark:bg-gray-800" style={{ backgroundImage: `url('/images/test_bg2.jpg')` }}></div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">satyam kalihari</h3>
                    <p className="text-sm text-muted-foreground">@satyam-kalihari</p>
                  </div>

                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    My journey in technology began with a curiosity for design and a desire to build premium web experiences.
                  </p>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users size={14} /> <span>10 followers</span>
                    </div>
                    <div>•</div>
                    <div>13 following</div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Repos Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Repositories</h4>
                      <FolderGit2 size={16} className="text-[#00BCA2]" />
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {githubRepos.map((repo, idx) => (
                        <div key={idx} className="group flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all border border-transparent">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <Book size={16} className="text-blue-500 shrink-0" />
                            <div className="truncate">
                              <div className="text-sm font-medium text-foreground truncate">{repo.reponame}</div>
                              <div className="text-[10px] text-muted-foreground">{repo.language}</div>
                            </div>
                          </div>
                          {repo.stared && <Star size={14} className="text-yellow-500 shrink-0 fill-yellow-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
