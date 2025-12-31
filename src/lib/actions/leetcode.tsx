"use client";
// import React, { useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";

interface leetCodeData {
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

export default async function fetchLeetCodeData(leetCodeUsername: string) {
  // const [leetCodeData, setLeetCodedata] = useState<leetCodeData>();

  try {
    const response: AxiosResponse<leetCodeData> = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`
    );
    console.log(response.data);
    // if (response) {
    //   setLeetCodedata(response.data);
    // }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log("Error", error);
  }
}
