"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<{
    fileId: string;
    fileName: string;
  } | null>(null);
  const createUser = useMutation(api.user.createUser); //call the createUser mutation

  useEffect(() => {
    console.log("User data from Clerk:", user); // Check if user data exists
    if (user) {
      console.log("Calling CheckUser...");
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    try {
      const result = await createUser({
        id: user?.id ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl ?? "",
        userName: user?.fullName ?? "",
      });
      console.log("User created:", result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const fileList = useQuery(api.fileUpload.GetUserFies, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const handleFileClick = (file: { fileId: string; fileName: string }) => {
    setSelectedFile(file);
  };

  const handleOpenFile = () => {
    if (selectedFile) {
      router.push(`/workspace/${selectedFile.fileId}`);
      setSelectedFile(null);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-medium text-3xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList
          ? fileList.map((file, index) => (
              <div
                key={index}
                onClick={() => handleFileClick(file)}
                className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border-2 hover:cursor-pointer hover:scale-105 transition-all"
              >
                <Image src={"/pdf.png"} alt={"PDF"} width={50} height={50} />
                <h2 className="mt-3 font-medium text-lg">{file.fileName}</h2>
              </div>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>

      {/* File Open Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFile?.fileName}</DialogTitle>
            <DialogDescription>
              Do you want to open the file: {selectedFile?.fileName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleOpenFile}>Open</Button>
            <Button variant="outline" onClick={() => setSelectedFile(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
