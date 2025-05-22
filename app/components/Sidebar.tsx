"use client";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload"; // ⬅️ Import your reusable component
import axios from "axios";
import { server } from "../server";
import AccountModal from "./AccountModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  allowedTypes?: string[];
  onFilesSelected: (files: FileList) => void;
}

interface IPdf {
  _id: string;
  userId: string;
  title: string;
  originalName: string;
  fileUrl: string;
  checksum: string;
  numPages: number;
  uploadedAt: string; // ISO Date string
}

const Sidebar = ({
  isOpen,
  onClose,
  allowedTypes,
  onFilesSelected,
}: SidebarProps) => {
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const router = useRouter();

  const [allPdfs, setAllPdfs] = useState<IPdf[]>([]);

  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${server}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Function to fetch all pdfs
  useEffect(() => {
    const fetchAllPdfs = async () => {
      try {
        const response = await axios.get(`${server}/api/pdf/my-pdfs`, {
          withCredentials: true,
        });
        const data = (response?.data.pdfs as IPdf[]) || [];
        setAllPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };
    if (isAuthenticated) {
      fetchAllPdfs();
    }
  }, [isAuthenticated]);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white p-6 flex flex-col justify-between z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
      >
        <div>
          <h1
            className="text-3xl font-bold text-purple-400 mb-8 cursor-pointer "
            onClick={() => router.push("/")}
          >
            AskyourPDF
          </h1>

          {isAuthenticated ? (
            <div className="space-y-4">
              {/* ✅ Use the reusable FileUpload component */}
              <FileUpload
                allowedTypes={allowedTypes}
                onFilesSelected={onFilesSelected}
                onAuthRedirect={() => router.push("/login")}
              />

              <div className="text-sm text-gray-300 cursor-pointer">
                {allPdfs.length > 0 ? (
                  allPdfs.map((pdf) => (
                    <div
                      key={pdf._id}
                      onClick={() => router.push(`/chat/${pdf?._id}`)}
                      className="mb-2"
                    >
                      <p>{pdf.originalName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(pdf.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No PDFs uploaded yet.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center mt-20 px-2">
              <Image
                src="https://www.chatpdf.com/_next/static/media/SignInChatsIcon.70cb4eee.svg"
                alt="Sign in to save chat history"
                width={180}
                height={140}
                className="mb-4"
              />
              <p className="text-sm text-gray-400 mb-2">
                Sign in for free to save your chat history
              </p>
              <button
                onClick={() => router.push("/login")}
                className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-2 px-4 rounded-lg mt-2"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        <div className="text-sm space-y-4">
          <select className="w-full bg-gray-800 text-white p-2 rounded-md">
            <option>EN</option>
            <option>FR</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="text-lg">🎓</span>
            <span>AI Scholar</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">⬇️</span>
            <span>Download App</span>
          </div>

          {isAuthenticated && (
            <>
              <div
                className="flex items-center gap-2 mt-4 cursor-pointer"
                onClick={() => setShowAccountModal(true)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                  {user?.name?.[0] || "U"}
                </div>
                <span className="text-white">{user?.name}</span>
              </div>
            </>
          )}
        </div>

        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={onClose}
        >
          ✕
        </button>
      </aside>
      {showAccountModal && (
        <AccountModal
          user={{
            name: user.name,
            email: user.email,
            pdfLimitUsed: 1,
            pdfLimit: 2,
            messageLimitUsed: 5,
            messageLimit: 20,
          }}
          onClose={() => setShowAccountModal(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Sidebar;
