"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Header from "../_components/header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoaderCircleIcon } from "lucide-react";

import dynamic from "next/dynamic";
import TextEditor from "../_components/TextEditor";

const PdfViewer = dynamic(
  () => import("@/app/workspace/_components/PdfViewer"),
  {
    ssr: false,
  }
);

export default function Workspace() {
  const { fileId }: { fileId: string } = useParams();
  const fileInfo = useQuery(api.fileUpload.GetFileRecord, {
    fileId: fileId,
  });
  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div className="h-screen flex flex-col">
      <Header fileName={fileInfo?.fileName} />
      <div className="grid grid-cols-2 pr-2 flex-1 overflow-hidden">
        <div className="overflow-auto">
          {/* Text editor */}
          <TextEditor />
        </div>

        <div className="overflow-auto">
          {/* Pdf viewer */}
          {fileInfo ? (
            <PdfViewer fileUrl={fileInfo.fileUrl} />
          ) : (
            <div className="flex justify-center items-center h-full">
              Loading...
              <LoaderCircleIcon className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
