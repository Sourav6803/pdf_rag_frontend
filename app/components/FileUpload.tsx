"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { server } from "../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type FileUploadProps = {
  allowedTypes?: string[];
  onFilesSelected: (files: FileList) => void;
  isAuthenticated?: boolean;
  onAuthRedirect?: () => void; // redirect function
};

const FileUpload: React.FC<FileUploadProps> = ({
  allowedTypes,
  onFilesSelected,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  
  const [uploading, setUploading] = useState(false);
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const router = useRouter();

  const handleFiles = async (files: FileList) => {
    const validFiles = Array.from(files).filter(
      (file) => !allowedTypes || allowedTypes.includes(file.type)
    );

    if (validFiles.length === 0) {
      toast.info("Only allowed file types are accepted.");
      return;
    }

    onFilesSelected(files);

    const formData = new FormData();
    validFiles.forEach((file) => formData.append("pdf", file));

    try {
      setUploading(true);
      const res = await axios.post(`${server}/api/pdf/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      if (res.data) {
        console.log("Files uploaded successfully:", res.data.pdf);
        toast.success("Files uploaded successfully!");
        setTimeout(() => {
          // window.location.reload();
          router.push(`/chat/${res?.data?.pdf?._id}`);
        }, 1000);
      }
    } catch (error: any) {
      console.error("Upload failed:", error?.response?.data || error.message);
      toast.error("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      inputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div
        className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg mb-4"
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={allowedTypes?.join(",")}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        
        <h2 className=" font-normal text-base text-center text-white mt-1">
          + Upload PDF
        </h2>
      </div>

      {/* Uploading indicator */}
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-blue-600 mt-3 animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading files...
        </div>
      )}
    </div>
  );
};

export default FileUpload;
