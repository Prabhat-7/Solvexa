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
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UploadPdfDialog from "./_components/UploadPdfDialog";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<{
    fileId: string;
    fileName: string;
  } | null>(null);
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
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
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const fileList = useQuery(api.fileUpload.GetUserFies, {
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const filteredFiles = fileList?.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 sm:p-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Workspace</h1>
            <p className="text-gray-500 mt-1">
              Welcome back, {user?.fullName || "User"}
            </p>
          </div>
          <div>
            {fileList && (
              <UploadPdfDialog
                HasReachedLimit={fileList?.length >= 5 ? true : false}
              />
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search files..."
              className="pl-10 w-full sm:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredFiles ? (
            filteredFiles.length > 0 ? (
              filteredFiles.map((file, index) => (
                <div
                  key={index}
                  onClick={() => handleFileClick(file)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-4">
                      <FileText className="w-full h-full text-blue-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h2 className="text-center font-medium text-gray-700 line-clamp-2">
                      {file.fileName}
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  No files found matching your search.
                </p>
              </div>
            )
          ) : (
            // Skeleton Loading
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-md mx-auto animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))
          )}
        </div>

        {/* File Open Dialog */}
        <Dialog
          open={!!selectedFile}
          onOpenChange={() => setSelectedFile(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">Open Document</DialogTitle>
              <DialogDescription className="pt-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <FileText className="text-blue-500" size={24} />
                  <span className="font-medium">{selectedFile?.fileName}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setSelectedFile(null)}>
                Cancel
              </Button>
              <Button onClick={handleOpenFile}>Open Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
