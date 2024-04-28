import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper ">
      {collapsed ? (
        <div className="flex justify-center text-white mt-4">
          <Link href="/">
            <Image alt="moli" width={40} height={40} src={"/moli.png"} />
          </Link>
        </div>
      ) : (
        <h3 className=" text-white">
          <Link href="/">Admin</Link>
        </h3>
      )}
    </div>
  );
};

export default Logo;
