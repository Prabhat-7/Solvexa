"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Star } from "lucide-react";
export default function Header({ fileInfo }: { fileInfo: any }) {
  const { user } = useUser();

  const UserInfo = useQuery(api.user.getUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });
  const fileName = fileInfo?.fileName;

  return (
    <div className="mb-4 p-3 flex justify-between shadow-md">
      <Link href={"/dashboard"}>
        <Image src={"/logo.png"} alt="logo" width={140} height={100}></Image>
      </Link>
      <h2 className="font-bold ">{fileName?.toUpperCase()}</h2>
      <div className=" flex gap-2 items-center">
        {UserInfo?.isProUser ? (
          <div className="flex items-center">
            <div className="mr-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1" />
              PRO
            </div>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
              <UserButton />
            </div>
          </div>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
}
