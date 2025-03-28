"use client";
import React from "react";

import Image from "next/image";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const path = usePathname();
  const { user } = useUser();
  const fileList = useQuery(api.fileUpload.GetUserFies, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });
  return (
    <div className="shadow-lg h-screen">
      <Image
        src={"/logo.png"}
        alt={"logo"}
        width={170}
        height={120}
        className="ml-4"
      ></Image>
      <div className="mt-10 p-3">
        {fileList && (
          <UploadPdfDialog
            HasReachedLimit={fileList?.length >= 5 ? true : false}
          />
        )}
        <Link href={"/dashboard"}>
          <div
            className={`flex gap-2 items-center p-5 mt-5 hover:bg-slate-100 cursor-pointer rounded-md ${
              path == "/dashboard" ? "bg-slate-200" : ""
            }`}
          >
            <Layout />
            <h2>Workspace</h2>
          </div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <div
            className={`flex gap-2 items-center p-5 mt-5 hover:bg-slate-100 cursor-pointer rounded-md ${
              path == "/dashboard/upgrade" ? "bg-slate-200" : ""
            }`}
          >
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>
        <div className="absolute bottom-24 w-[80%] ">
          <Progress value={(fileList ? fileList.length / 5 : 0) * 100} />
          <p className="text-sm mt-1">
            {fileList?.length} out of 5 PDF Uploaded
          </p>
          <p className="text-xs text-gray-400 mt-2 ">
            Upgrade to Upload more PDF
          </p>
        </div>
      </div>
    </div>
  );
}
