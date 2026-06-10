import { NextResponse } from "next/server";
import connectToDB from "@/lib/db/connectToDB";
import User from "@/lib/models/User";
import { getGithubData } from "@/lib/actions/github";
import fetchLeetCodeData from "@/lib/actions/leetcode";

const getGithubUsernameFromUrl = (githubUrl?: string | null) => {
  if (!githubUrl) {
    return "";
  }

  return githubUrl.replace(/\/+$/, "").split("/").pop() ?? "";
};

export async function GET() {
  try {
    await connectToDB();
  } catch {
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 },
    );
  }

  try {
    const users = await User.find({}).lean();

    const leaderboard = await Promise.all(
      users.map(async (user) => {
        const githubUsername = getGithubUsernameFromUrl(user.githubUrl);
        const leetcodeUsername = user.leetcodeUsername ?? "";

        const [githubData, leetcodeData] = await Promise.all([
          githubUsername
            ? getGithubData(githubUsername)
            : Promise.resolve(null),
          leetcodeUsername
            ? fetchLeetCodeData(leetcodeUsername)
            : Promise.resolve(null),
        ]);

        const points =
          (leetcodeData?.easySolved ?? 0) +
          (leetcodeData?.mediumSolved ?? 0) * 2 +
          (leetcodeData?.hardSolved ?? 0) * 4 +
          (githubData?.totalStars ?? 0);

        return {
          id: String(user._id),
          points,
          name: user.fullname || user.email,
          email: user.email,
          avatar:
            user.avatar ||
            githubData?.profile.avatar_url ||
            "/default-avatar.png",
        };
      }),
    );

    leaderboard.sort((left, right) => right.points - left.points);

    return NextResponse.json({ success: true, users: leaderboard });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, msg: "Bad Request" },
      { status: 400 },
    );
  }
}
