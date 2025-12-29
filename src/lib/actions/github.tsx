"use client";
import React, { useState } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import Image from "next/image";

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
  site_admin: false;
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

const Github = (username: string) => {
  const [githubData, setGithubData] = useState<githubUserData>();

  async function getGithubData() {
    const response: AxiosResponse<githubUserData> = await axios.get(
      `https://api.github.com/users/${username}`
    );
    if (response) {
      setGithubData(response.data);
    }
  }

  return (
    <div>
      <button onClick={getGithubData}>press fot github data</button>
      {JSON.stringify(githubData)}
      {githubData?.avatar_url && (
        <Image
          src={githubData?.avatar_url}
          alt="avater"
          width={100}
          height={100}
        />
      )}
    </div>
  );
};

export default Github;
