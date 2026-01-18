import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-14 bg-[#050509]">
      <Link href={"dashboard"}>Dashboard</Link>
    </div>
  );
};

export default Navbar;
