"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/convex/_generated/api";
import React, { ChangeEvent, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function UploadPdfDialog({
  HasReachedLimit,
}: {
  HasReachedLimit: boolean;
}) {
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.fileUpload.generateUploadUrl);
  const [file, setFile] = useState<File | null>();
  const [fileName, setFileName] = useState<string>("");
  const { user } = useUser();
  const embeddDocuments = useAction(api.myAction.ingest);
  const AddFileEntry = useMutation(api.fileUpload.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileUpload.getFileUrl);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  const OnFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const OnUpload = async () => {
    // Validate file and filename
    if (!file || !fileName.trim()) {
      toast({
        title: "Upload Error",
        description: "Please select a file and provide a file name.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();

      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file!.type },
        body: file,
      });
      const { storageId } = await result.json();
      const fileUrl = await getFileUrl({ storageId: storageId });

      const fileId = uuidv4();

      // Step 3: Save the newly allocated storage id to the database
      const response = await AddFileEntry({
        fileId: fileId,
        StorageId: storageId,
        fileName: fileName,
        fileUrl: fileUrl ?? "",
        createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
      });

      // Step 4: Process PDF
      const ApiResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);

      await embeddDocuments({
        chunks: ApiResponse.data.result,
        fileId: fileId,
      });

      // Success toast
      toast({
        title: "File Uploaded Successfully",
        description: `${fileName} has been uploaded and processed.`,
        variant: "default",
      });

      // Reset state
      setLoading(false);
      setOpen(false);
      setFile(null);
      setFileName("");
    } catch (error) {
      // Error toast
      toast({
        title: "Upload Failed",
        description:
          "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });

      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              if (HasReachedLimit) {
                e.preventDefault();
                toast({
                  title: "Upload Limit Reached",
                  description:
                    "You have reached your maximum file upload limit.",
                  variant: "destructive",
                });
              } else setOpen(true);
            }}
            className={`w-full ${
              HasReachedLimit
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            +Upload File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF File</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <h2 className="mt-5">Select a file to upload</h2>
                <div className="flex gap-2 p-3 rounded-md border">
                  <input
                    disabled={HasReachedLimit}
                    type="file"
                    accept="application/pdf"
                    onChange={OnFileSelect}
                    required
                  />
                </div>
                <div className="mt-2 ">
                  <label>File Name*</label>
                  <Input
                    placeholder="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="border border-black/30"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={OnUpload}
              disabled={isLoading || !file || !fileName.trim()}
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}
