// import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

const page = async () => {
  // const { sessionClaims } = await auth();
  return (
    <div>
      <Navbar />
      <section
        id="hero"
        className="h-dvh w-full flex flex-col justify-center items-center"
      >
        <section id="heading">
          <div className="text-3xl md:text-6xl lg:text-8xl --font-geist-sans font-bold">
            Where Developers
          </div>
          <div className="text-3xl md:text-6xl lg:text-8xl --font-geist-sans font-bold text-[#00BCA2] text-center">
            Connect & Grow
          </div>
        </section>
        <section
          id="text"
          className=" text-[12px] md:text-[16px] mt-8 text-gray-400 text-center"
        >
          <p>
            Join topic-based rooms, showcase your projects, get help with
            problems, and compete on
          </p>
          <p> our LeetCode leaderboard. Your developer community awaits.</p>
        </section>
        <section id="CTA" className=" mt-8 grid grid-cols-2 gap-4">
          <Button className="bg-[#00BCA2] text-black text-[12px] md:text-[16px] h-12 hover:text-white">
            Explore Rooms
          </Button>
          <Button className=" text-[12px] md:text-[16px] h-12">
            View Leaderboard
          </Button>
        </section>
      </section>
      page
    </div>
  );
};

export default page;
