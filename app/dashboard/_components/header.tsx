"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Header() {
  const { user } = useUser();
  const UserInfo = useQuery(api.user.getUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  return (
    <div className="flex items-center justify-end p-5 shadow-md bg-white z-10 sticky top-0 border-b border-gray-200">
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
  );
}
