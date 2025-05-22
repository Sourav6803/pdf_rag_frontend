"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import MobileHeader from "./components/MobileHeader";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeatureSection";
import TrustedSection from "./components/TrustedSection";
import FAQSection from "./components/FAQ";
import ArticleGrid from "./components/ArticleGrid";
import { loadUser } from "@/redux/action/user";
import { useAppDispatch } from "@/redux/hook";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  // ✅ Define allowed file types (PDF only in this case)
  const allowedTypes = ["application/pdf"];

  // ✅ Handle selected files
  const handleFilesSelected = (files: FileList) => {
    console.log("Files selected from Sidebar:", files);
    // You could also set state here if needed
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 min-h-screen  h-screen flex flex-col md:flex-row overflow-hidden">
      <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        allowedTypes={allowedTypes}
        onFilesSelected={handleFilesSelected}
      />
      <div className="flex-1 flex flex-col  overflow-y-auto h-full  bg-gray-50 pt-4 md:pt-0">
        <Hero onFilesSelected={handleFilesSelected} allowedTypes={allowedTypes}/>
        <FeaturesSection />
        <TrustedSection />
        <ArticleGrid />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
