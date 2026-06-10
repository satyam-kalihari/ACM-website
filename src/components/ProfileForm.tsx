"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

type ProfilePayload = {
  _id: string;
  githubUrl?: string;
  leetcodeUsername?: string;
};

const ProfileForm = () => {
  const [userId, setUserId] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [leetcodeUsername, setLeetcodeUsername] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const loadProfile = React.useCallback(() => {
    fetch("/api/user/get-user")
      .then((res) => res.json())
      .then((res) => {
        if (!res?.user) {
          return;
        }

        const user = res.user as ProfilePayload;
        setUserId(user._id);
        setGithubUrl(user.githubUrl ?? "");
        setLeetcodeUsername(user.leetcodeUsername ?? "");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  React.useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleGithubUrlChange = React.useCallback((value: string) => {
    setGithubUrl(value);
  }, []);

  const handleLeetcodeUsernameChange = React.useCallback((value: string) => {
    setLeetcodeUsername(value);
  }, []);

  const statusMessage = React.useMemo(() => {
    if (status === "saved") {
      return "Profile updated";
    }

    if (status === "error") {
      return "Unable to update profile";
    }

    return "Add your GitHub and LeetCode identifiers to power the dashboard";
  }, [status]);

  const handleSave = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("saving");

      try {
        const response = await fetch("/api/user/update-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            githubUrl,
            leetcodeUsername,
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to update profile");
        }

        setStatus("saved");
      } catch {
        setStatus("error");
      }
    },
    [githubUrl, leetcodeUsername, userId],
  );

  return (
    <form
      onSubmit={handleSave}
      className="mt-4 rounded-md border border-fuchsia-600/30 bg-black/10 p-4 backdrop-blur-xs"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="profile-github-url">GitHub profile URL</Label>
          <Input
            id="profile-github-url"
            value={githubUrl}
            onChange={(event) => handleGithubUrlChange(event.target.value)}
            placeholder="https://github.com/your-handle"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-leetcode">LeetCode username</Label>
          <Input
            id="profile-leetcode"
            value={leetcodeUsername}
            onChange={(event) =>
              handleLeetcodeUsernameChange(event.target.value)
            }
            placeholder="your-leetcode-handle"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button type="submit" disabled={!userId || status === "saving"}>
          {status === "saving" ? "Saving..." : "Save profile"}
        </Button>
        <span className="text-sm text-muted-foreground">{statusMessage}</span>
      </div>
    </form>
  );
};

export default ProfileForm;
