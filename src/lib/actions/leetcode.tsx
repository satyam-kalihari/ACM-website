"use client";
import React, { useState } from "react";
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

const Leetcode = (leetCodeUsername: string) => {
  const [leetCodeData, setLeetCodedata] = useState<leetCodeData>();

  const fetchLeetCodeData = async () => {
    try {
      const response: AxiosResponse<leetCodeData> = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`
      );
      console.log(response.data);
      if (response) {
        setLeetCodedata(response.data);
        // console.log("data: ", leetCodeData);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("Error", error);
    }
  };

  return (
    <>
      {" "}
      <div onClick={fetchLeetCodeData} className="text-black">
        page
      </div>
      <div>{leetCodeData?.ranking}</div>
      <div>{leetCodeData?.message}</div>
      <div>{leetCodeData?.status}</div>
      <div>{JSON.stringify(leetCodeData?.submissionCalendar)}</div>
    </>
  );
};

export default Leetcode;
