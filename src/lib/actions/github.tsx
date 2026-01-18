"use client";
// import React, { useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
// import Image from "next/image";

interface githubUserData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export async function getGithubData(username: string) {
  // const [githubData, setGithubData] = useState<githubUserData>();

  try {
    const response: AxiosResponse<githubUserData> = await axios.get(
      `https://api.github.com/users/${username}`
    );
    console.log(response.data);

    //USE RESPONSE.DATA FOR UPDATING THE BACKEND

    // if (response) {
    //   setGithubData(response.data);
    // }

    //FOR TOTAL STARS ON A GITHUB PROFILE (FOR CALCULATING LEADERBOARD SCORE)
    let repos = [];
    const repoResponce = await axios.get(
      "https://api.github.com/users/${username}/repos?per_page=100"
    );
    if (repoResponce.data) {
      repos = repoResponce.data;
      const totalStars = repos.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
        0
      );
      console.log("Total stars", totalStars);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios Error", error.message);
      if (error.response) {
        console.log(error.response.status);
      }
    }
  }
}
