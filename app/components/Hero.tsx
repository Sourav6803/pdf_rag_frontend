
import React from "react";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";

interface HeroProps {
  allowedTypes?: string[];
  onFilesSelected: (files: FileList) => void;
  onAuthRedirect?: () => void; // redirect function
}

const Hero = ({ allowedTypes, onFilesSelected }: HeroProps) => {
  const router = useRouter();
  return (
    <main className="flex-1 flex items-center justify-center  p-8">
      <div className="max-w-3xl text-center space-y-6">
        <div className="flex justify-center gap-3 text-sm text-gray-600">
          <div>
            <p className="font-bold">#1 PDF Chat AI</p>
            <p>Original</p>
          </div>
          <div>
            <p className="font-bold">Q's answered every day</p>
            <p>1,000,000+</p>
          </div>
          <div>
            <p className="font-bold">Gen AI apps of 2024</p>
            <p>Top 50</p>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Chat with any <span className="text-purple-600">PDF</span>
        </h2>
        <p className="text-gray-700 text-lg">
          Join millions of{" "}
          <span className="text-orange-500">
            students, researchers and professionals
          </span>{" "}
          to instantly answer questions and understand research with AI
        </p>

        <div className="border-2 border-dashed border-purple-400 p-8 rounded-lg bg-white shadow-lg relative">
          <p className="text-gray-600 mb-4">
            Click to upload, or drag PDF file here
          </p>
          {/* <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Upload PDF</button> */}
          <FileUpload
            allowedTypes={allowedTypes}
            onFilesSelected={onFilesSelected}
            onAuthRedirect={() => router.push("/login")}
          />
          <span className="absolute top-0 right-0 text-xs text-gray-400 pr-4 pt-2 italic">
            Drag + drop your PDF file here
          </span>
        </div>
      </div>
    </main>
  );
};

export default Hero;
