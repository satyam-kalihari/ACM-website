"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
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

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [password, setPassword] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isVarificationPending, setIsVarificationPending] =
    useState<boolean>(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  if (!isLoaded) {
    return <Spinner />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submit running");

    if (!isLoaded) {
      return <Spinner />;
    }

    try {
      await signUp?.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setIsVarificationPending(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return <Spinner />;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log(completeSignUp)

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        router.push("/api/user/create-user");
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
          <CardTitle>Sign-up for your account</CardTitle>
          <CardDescription>Enter your email below to sign-up</CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              Sign In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                  id="email"
                  type="email"
                  placeholder="example@sitnagpur.siu.edu.in"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
            <div className="flex-col mt-2">
              <Button type="submit" className="w-full">
                Sign-up
              </Button>
            </div>
          </form>
        </CardContent>
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
                onKeyDown={(e) => {
                  if (e.key == "Enter"){
                    onVerify(e);
                  }
                }}
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

export default SignUp;
