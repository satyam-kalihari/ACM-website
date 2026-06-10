import axios from "axios";
export interface GithubUserData {
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

export interface GithubRepoData {
  name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}

export interface GithubData {
  profile: GithubUserData;
  repos: GithubRepoData[];
  totalStars: number;
}

export async function getGithubData(
  username: string,
): Promise<GithubData | null> {
  if (!username) {
    return null;
  }

  try {
    const response = await axios.get<GithubUserData>(
      `https://api.github.com/users/${username}`,
    );
    const repoResponse = await axios.get<GithubRepoData[]>(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );

    const repos = repoResponse.data ?? [];
    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0,
    );

    return {
      profile: response.data,
      repos,
      totalStars,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios Error", error.message);
      if (error.response) {
        console.log(error.response.status);
      }
    }

    return null;
  }
}
