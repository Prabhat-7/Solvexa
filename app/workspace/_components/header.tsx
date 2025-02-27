"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function Header({
  fileInfo,
  editor,
}: {
  fileInfo: any;
  editor: any;
}) {
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const fileName = fileInfo?.fileName;
  const save = () => {
    saveNotes({
      notes: editor.getHTML(),
      fileId: fileInfo.fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
    });
  };
  return (
    <div className="mb-4 p-3 flex justify-between shadow-md">
      <Image src={"/logo.png"} alt="logo" width={140} height={100}></Image>
      <h2 className="font-bold ">{fileName?.toUpperCase()}</h2>
      <div className=" flex gap-2 items-center">
        <Button onClick={save}>Save</Button>
        <UserButton />
      </div>
    </div>
  );
}
