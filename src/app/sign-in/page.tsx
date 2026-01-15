"use client";

import React, { useState, useEffect } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
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
  const { isSignedIn } = useAuth();
  const [password, setPassword] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const [isVarificationPending, setIsVarificationPending] =
    useState<boolean>(false);
  const [code, setCode] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  async function Submit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      );
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

      // console.log(response.status);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Error", error.errors[0].message);
      if (error.errors[0].code === "session_exists") {
        router.push("/dashboard");
      }
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
    <div className="flex min-h-screen w-full">
      {/* Left side: Form */}
      <div className="flex w-full flex-col justify-center items-center p-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {!isVarificationPending ? (
            <Card className="w-full border-0 shadow-none sm:border sm:shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Login to your account
                </CardTitle>
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
                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}
                  <Button type="submit" className="w-full mt-4">
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
          ) : (
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Enter verification code</CardTitle>
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

      {/* Right side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-muted">
        <img
          src="/images/sign-in-bg.png"
          alt="Sign In Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />{" "}
        {/* Optional overlay for better text contrast if we add text later */}
      </div>
    </div>
  );
};

export default SignIn;
