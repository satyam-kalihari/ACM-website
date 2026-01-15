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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submit running");

    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      );
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
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      );
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log(completeSignUp);

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col justify-center items-center p-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {!isVarificationPending ? (
            <Card className="w-full border-0 shadow-none sm:border sm:shadow-sm">
              <CardHeader className="flex flex-col">
                <CardTitle className="text-2xl font-bold">
                  Sign-up for your account
                </CardTitle>
                <CardDescription>
                  Enter your email below to sign-up
                </CardDescription>
                <CardAction className="self-end">
                  <Button
                    variant="link"
                    className="px-0"
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                  >
                    Already have an account? Sign In
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
                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
                  <div className="flex-col mt-4">
                    <Button type="submit" className="w-full">
                      Sign-up
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
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
                  placeholder="Verification Code"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={onVerify} className="w-full">
                  Verify
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative bg-muted">
        <img
          src="/images/sign-up-bg.png"
          alt="Sign Up Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />{" "}
      </div>
    </div>
  );
};

export default SignUp;
