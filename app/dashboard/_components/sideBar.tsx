"use client";
import React from "react";
import Image from "next/image";
import { Layout, Shield, ChevronRight, FileText, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SideBar() {
  const { user } = useUser();
  const UserInfo = useQuery(api.user.getUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });
  const path = usePathname();
  const fileList = useQuery(api.fileUpload.GetUserFies, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const navigation = [
    {
      name: "Workspace",
      href: "/dashboard",
      icon: Layout,
      current: path === "/dashboard",
    },
    {
      name: "Upgrade",
      href: "/dashboard/upgrade",
      icon: Shield,
      current: path === "/dashboard/upgrade",
    },
  ];
  return (
    <div className="flex flex-col h-screen bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-6">
        <Image
          src="/logo.png"
          alt="logo"
          width={170}
          height={120}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                "hover:bg-gray-100 cursor-pointer group",
                item.current && "bg-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    item.current
                      ? "text-blue-600"
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    item.current
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-gray-900"
                  )}
                >
                  {item.name}
                </span>
              </div>
              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-transform",
                  item.current
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600",
                  "opacity-0 group-hover:opacity-100"
                )}
              />
            </div>
          </Link>
        ))}
      </nav>

      {/* Status Bar Section */}
      <div className="p-6 border-t border-gray-200">
        {UserInfo?.isProUser ? (
          // Pro User Status Bar
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-900">
                  Pro Account
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {fileList?.length || 0} PDF{fileList?.length !== 1 ? "s" : ""}{" "}
                  Uploaded
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Unlimited storage available
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Free User Status Bar
          <div className="space-y-4">
            <div className="space-y-3 pb-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Storage Usage</span>
                <span className="text-gray-500">
                  {fileList?.length || 0}/5 PDFs
                </span>
              </div>
              <Progress
                value={(fileList ? fileList.length / 5 : 0) * 100}
                className="h-2 bg-gray-100"
              />
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Upgrade Available
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Unlock unlimited PDF uploads and premium features
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
