import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function Header({ fileName }: { fileName: string | undefined }) {
  return (
    <div className="mb-4 p-3 flex justify-between shadow-md">
      <Image src={"/logo.png"} alt="logo" width={140} height={100}></Image>
      <h2 className="font-bold ">{fileName?.toUpperCase()}</h2>
      <UserButton />
    </div>
  );
}
