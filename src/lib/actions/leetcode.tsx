import axios from "axios";

export interface LeetCodeData {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: { string: number };
}

export default async function fetchLeetCodeData(
  leetCodeUsername: string,
): Promise<LeetCodeData | null> {
  if (!leetCodeUsername) {
    return null;
  }

  try {
    const response = await axios.get<LeetCodeData>(
      `https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`,
    );

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log("Error", error);

    return null;
  }
}
