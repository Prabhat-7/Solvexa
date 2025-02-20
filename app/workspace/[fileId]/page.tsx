"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Header from "../_components/header";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoaderCircleIcon } from "lucide-react";

import dynamic from "next/dynamic";


const PdfViewer = dynamic(
  () => import("@/app/workspace/_components/PdfViewer"),
  {
    ssr: false,
  }
);

export default function Workspace() {
  const { fileId }: { fileId: string } = useParams();
  const GetFileRecord = useQuery(api.fileUpload.GetFileRecord, {
    fileId: fileId,
  });
  useEffect(() => {
    console.log(GetFileRecord);
  }, [GetFileRecord]);
  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 ">
        <div>{/* Text editor */}</div>

        <div>
          {/* Pdf viewer */}
          {GetFileRecord ? (
            <PdfViewer fileUrl={GetFileRecord.fileUrl} />
          ) : (
            <div className="flex justify-center items-center">
              Loading...
              <LoaderCircleIcon className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
