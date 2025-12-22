"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [password, setPassword] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const [isVarificationPending, setIsVarificationPending] =
    useState<boolean>(false);
  const [code, setCode] = useState("");

  const router = useRouter();

  if (!isLoaded) {
    return <Spinner />;
  }

  async function Submit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return <Spinner />;
    }

    try {
      const response = await signIn.create({
        identifier: emailAddress,
        password: password,
      });

      await signIn.prepareSecondFactor({
        strategy: "email_code",
      });
      setIsVarificationPending(true);

      console.log(response.status);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error", error.errors[0].message);
      setError(error.errors[0].message);
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return <Spinner />;
    }

    try {
      const completeSignIn = await signIn.attemptSecondFactor({
        code,
        strategy: "email_code",
      });

      console.log(completeSignIn.status);
      if (completeSignIn.status !== "complete") {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={Submit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
                </div>
                <Input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={() => {
              router.push("/sign-up");
            }}
            variant="outline"
            className="w-full"
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
      {isVarificationPending && (
        <>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Inter code</CardTitle>
            </CardHeader>

            <CardContent>
              <Input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={onVerify}>Verify</Button>
            </CardFooter>
          </Card>
        </>
      )}
    </>
  );
};

export default SignIn;
