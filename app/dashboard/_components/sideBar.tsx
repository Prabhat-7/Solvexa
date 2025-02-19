import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";

export default function SideBar() {
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
        <UploadPdfDialog />
        <div className="flex gap-2 items-center p-5 mt-5 hover:bg-slate-100 cursor-pointer rounded-md">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-5 mt-1 cursor-pointer hover:bg-slate-100 rounded-md">
          <Shield />
          <h2>Upgrade</h2>
        </div>
        <div className="absolute bottom-24 w-[80%] ">
          <Progress value={33} />
          <p className="text-sm mt-1">2 out of 5 PDF Uploaded</p>
          <p className="text-xs text-gray-400 mt-2 ">
            Upgrade to Upload more PDF
          </p>
        </div>
      </div>
    </div>
  );
}
