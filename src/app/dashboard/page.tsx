import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "@/lib/db/createUser";
import { getUserFromDB } from "@/lib/db/getUser";
import { getGithubData } from "@/lib/actions/github";
import fetchLeetCodeData from "@/lib/actions/leetcode";
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
import ProfileForm from "@/components/ProfileForm";

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

const getGithubUsernameFromUrl = (githubUrl?: string | null) => {
  if (!githubUrl) {
    return "";
  }

  return githubUrl.replace(/\/+$/, "").split("/").pop() ?? "";
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams?: {
    githubUrl?: string;
    leetcodeUsername?: string;
  };
}) => {
  // const router = useRouter();
  let dbUser = null;
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      dbUser = await getUserFromDB(clerkUser.id);
      if (dbUser) {
        break;
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

  const resolvedSearchParams = searchParams ?? {};

  const githubUrl = dbUser?.githubUrl ?? resolvedSearchParams.githubUrl ?? "";
  const githubUsername =
    getGithubUsernameFromUrl(githubUrl) || clerkUser.username || "";
  const leetcodeUsername =
    dbUser?.leetcodeUsername ?? resolvedSearchParams.leetcodeUsername ?? "";

  const [githubData, leetCodeData] = await Promise.all([
    githubUsername ? getGithubData(githubUsername) : Promise.resolve(null),
    leetcodeUsername
      ? fetchLeetCodeData(leetcodeUsername)
      : Promise.resolve(null),
  ]);

  if (!dbUser) {
    const newDbUser = await createUser({
      fullname:
        `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      email: clerkUser.emailAddresses[0].emailAddress,
      clerkId: clerkUser.id,
      avatar: clerkUser.imageUrl || "/default-avatar.png",
      role: "user",
      techStack: [],
      githubUrl,
      leetcodeUsername,
    });

    dbUser = newDbUser.dbUser;
  }

  const platformCardsDetail: PlatformCard[] = [
    {
      platform: "leetcode",
      heading: "Hard",
      value: leetCodeData?.hardSolved ?? 0,
      point: (leetCodeData?.hardSolved ?? 0) * 4,
      icon: "",
    },
    {
      platform: "leetcode",
      heading: "Medium",
      value: leetCodeData?.mediumSolved ?? 0,
      point: (leetCodeData?.mediumSolved ?? 0) * 2,
      icon: "",
    },
    {
      platform: "leetcode",
      heading: "Easy",
      value: leetCodeData?.easySolved ?? 0,
      point: leetCodeData?.easySolved ?? 0,
      icon: "",
    },
    {
      platform: "github",
      heading: "Stars",
      value: githubData?.totalStars ?? 0,
      point: githubData?.totalStars ?? 0,
      icon: "",
    },
  ];

  const githubRepos: githubReoDetail[] =
    githubData?.repos.slice(0, 4).map((repo) => ({
      reponame: repo.name,
      stared: (repo.stargazers_count ?? 0) > 0,
      language: repo.language ?? "Unknown",
      repoLink: repo.html_url,
    })) ?? [];

  return (
    <Suspense
      fallback={
        <div className="flex w-screen h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="relative min-h-screen overflow-x-clip">
        <div className="w-screen h-screen fixed -z-10">
          <Spotlight />
        </div>
        <section id="tittle_section">
          <div
            id="hello_message"
            className="font-roboto sm:ml-3 text-[29px] sm:text-[32px] lg:text-[44px] mt-5 mb-8 sm:mt-7 sm:mb-8 lg:mt-8 lg:mb-10"
          >
            Good to see you, {clerkUser.firstName}
          </div>
          <div id="total_point"></div>
        </section>
        <section id="content_section" className="md:flex">
          {/* content_left */}
          <div id="content_left" className="min-w-0 md:flex-1">
            {/* platform_cards */}
            <div
              id="platform_cards"
              className=" grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2.5 mb-8 sm:mb-10 lg:mb-12"
            >
              {platformCardsDetail.map((card) => (
                <div
                  key={card.heading}
                  className="w-[140] md:w-44 md:h-24 h-20 rounded-md mx-auto bg-cover "
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
                            <AlignEndHorizontal color="#ecdd79" size={18} />
                          ) : (
                            // <BadgeQuestionMark color="#ecdd79" />
                            <FolderGit color="#d979ec" size={18} />
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
              <h2 className="font-roboto text-[22px] sm:text-[24px] lg:text-[30px] sm:ml-3">
                Leader Board
              </h2>
              <Leaderboard />
            </div>
          </div>

          {/* content_right */}
          <div
            id="content_right"
            className="mt-5 w-full md:mt-0 md:w-[360px] lg:w-[400px] md:shrink-0 sm:px-2.5 sm:mx-auto"
          >
            {/* github_card */}
            <div
              id="github_card"
              className="min-h-70 mx-auto p-2 rounded-md backdrop-blur-xs sm:p-2.5"
            >
              <div
                id="github_avatar"
                style={{
                  backgroundImage: `url(${githubData?.profile.avatar_url || clerkUser.imageUrl})`,
                }}
                className="w-30 h-30 sm:w-50 sm:h-50 bg-cover bg-center rounded-full mx-auto mb-6"
              ></div>
              <div id="github_card_content" className="min-w-[320px] max-w-95">
                <h3 className=" font-bold">
                  {dbUser?.fullname ?? clerkUser.firstName}
                </h3>
                <h3 className=" font-extralight mb-4">
                  {githubData?.profile.login ||
                    githubUsername ||
                    "github profile unavailable"}
                </h3>
                <p className="mb-2">
                  {githubData?.profile.bio ??
                    "GitHub profile data will appear here once a GitHub username is saved for the user."}
                </p>
                <p className=" flex gap-3 font-light">
                  <Users size={18} />
                  {githubData?.profile.followers ?? 0} followers •{" "}
                  {githubData?.profile.following ?? 0} following
                </p>
              </div>
            </div>
            <ProfileForm />
            <div className="w-full mx-auto">
              {/* github_toggle */}
              <div
                id="github_toggle"
                className="mb-2 mt-7 w-40 h-10 rounded-md overflow-clip border border-fuchsia-600/50 relative flex"
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
              <div
                id="repos"
                className="flex flex-col items-center gap-2 max-h-60 overflow-y-scroll no-scrollbar"
              >
                {githubRepos.map((repo, key) => (
                  <div
                    key={key}
                    id="repo_card"
                    className=" border-white/30 sm:rounded-sm w-80 sm:w-95 h-11 p-2"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-baseline gap-2">
                        <Book size={20} />{" "}
                        <a
                          href={repo.repoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 hover:underline"
                        >
                          {repo.reponame}
                        </a>
                      </div>
                      <Star
                        fill={repo.stared ? "white" : "none"}
                        size={18}
                        className="left-0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default Dashboard;
