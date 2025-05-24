
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import { server } from "@/app/server";
import axios from "axios";

// PDF Viewer
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// PDF Worker
import * as pdfjs from "pdfjs-dist/build/pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// UI
import MobileHeader from "@/app/components/MobileHeader";
import Sidebar from "@/app/components/Sidebar";
import { useAppDispatch } from "@/redux/hook";
import { loadUser } from "@/redux/action/user";
import ChatComponent from "@/app/components/Chat";

const ChatPage = () => {
  const { chatId } = useParams() as { chatId: string };
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [chatSummary, setChatSummary] = useState<string>("Loading AI summary...");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const allowedTypes = ["application/pdf"];
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleFilesSelected = (files: FileList) => {
    console.log("Files selected:", files);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!chatId) return;

    const fetchChatData = async () => {
      try {
        const res = await axios.get(`${server}/api/pdf/${chatId}`, {
          withCredentials: true,
        });
        const data = res.data;
        setPdfUrl(data?.fileUrl );
        setChatSummary(data?.summary || "AI overview will appear here.");
        setTitle(data?.title || "XYZ.PDF");
      } catch (error) {
        setPdfUrl("/static/sample.pdf");
        setChatSummary("Failed to fetch AI overview.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId]);

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 min-h-screen h-screen flex flex-col md:flex-row overflow-hidden">
      <Head>
        <title>PDF Chat - {chatId}</title>
      </Head>

      <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        allowedTypes={allowedTypes}
        onFilesSelected={handleFilesSelected}
      />

      <div className="flex flex-col lg:flex-row h-screen overflow-hidden w-full">
        <div className="w-full lg:w-1/2 bg-gray-100 overflow-auto p-4">
          {loading ? (
            <p className="text-gray-500 text-center h-screen">Loading PDF...</p>
          ) : (
            <div className="h-full border rounded shadow-sm">
              <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 bg-white p-2 overflow-auto h-screen">
          <ChatComponent summary={chatSummary} loading={loading} title={title}/>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;



// "use client";
// import "@/utils/pdfWorker";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Head from "next/head";
// import { server } from "@/app/server";
// import axios from "axios";

// // PDF Viewer
// import { Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// // Styles
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// // UI Components
// import MobileHeader from "@/app/components/MobileHeader";
// import Sidebar from "@/app/components/Sidebar";
// import { useAppDispatch } from "@/redux/hook";
// import { loadUser } from "@/redux/action/user";
// import ChatComponent from "@/app/components/Chat";

// const ChatPage = () => {
//   const { chatId } = useParams() as { chatId: string };
//   const [pdfUrl, setPdfUrl] = useState<string>("");
//   const [chatSummary, setChatSummary] = useState<string>("Loading AI summary...");
//   const [title, setTitle] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const dispatch = useAppDispatch();
//   const allowedTypes = ["application/pdf"];
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   const handleFilesSelected = (files: FileList) => {
//     console.log("Files selected:", files);
//   };

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!chatId) return;

//     const fetchChatData = async () => {
//       try {
//         const res = await axios.get(`${server}/api/pdf/${chatId}`, {
//           withCredentials: true,
//         });
//         const data = res.data;
//         setPdfUrl(data?.fileUrl);
//         setChatSummary(data?.summary || "AI overview will appear here.");
//         setTitle(data?.title || "XYZ.PDF");
//       } catch (error) {
//         setPdfUrl("/static/sample.pdf");
//         setChatSummary("Failed to fetch AI overview.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatData();
//   }, [chatId]);

//   console.log("PDF URL:", pdfUrl);

//   return (
//     <div className="bg-gradient-to-br from-white to-purple-50 min-h-screen h-screen flex flex-col md:flex-row overflow-hidden">
//       <Head>
//         <title>PDF Chat - {chatId}</title>
//       </Head>

//       <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         allowedTypes={allowedTypes}
//         onFilesSelected={handleFilesSelected}
//       />

//       <div className="flex flex-col lg:flex-row h-screen overflow-hidden w-full">
//         <div className="w-full lg:w-1/2 bg-gray-100 overflow-auto p-4">
//           {loading ? (
//             <p className="text-gray-500 text-center h-screen">Loading PDF...</p>
//           ) : (
//             <div className="h-full border rounded shadow-sm">
//               <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
//             </div>
//           )}
//         </div>

//         <div className="w-full lg:w-1/2 bg-white p-2 overflow-auto h-screen">
//           <ChatComponent summary={chatSummary} loading={loading} title={title} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;




// "use client";

// import { useEffect, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useParams } from "next/navigation";
// import Head from "next/head";
// import axios from "axios";
// import { server } from "@/app/server";

// // Styles
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// // UI Components
// import MobileHeader from "@/app/components/MobileHeader";
// import Sidebar from "@/app/components/Sidebar";
// import { useAppDispatch } from "@/redux/hook";
// import { loadUser } from "@/redux/action/user";
// import ChatComponent from "@/app/components/Chat";

// // ✅ Correct PDF.js Worker (version must match installed react-pdf/pdfjs-dist)
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js`;

// const ChatPage = () => {
//   const { chatId } = useParams() as { chatId: string };
//   const [pdfUrl, setPdfUrl] = useState<string>("");
//   const [chatSummary, setChatSummary] = useState<string>("Loading AI summary...");
//   const [title, setTitle] = useState<string>("Loading...");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const dispatch = useAppDispatch();
//   const allowedTypes = ["application/pdf"];

//   const handleFilesSelected = (files: FileList) => {
//     console.log("Files selected:", files);
//   };

//   // Load logged-in user (auth)
//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   // Load chat data and PDF URL
//   useEffect(() => {
//     if (!chatId) return;

//     const fetchChatData = async () => {
//       try {
//         const res = await axios.get(`${server}/api/pdf/${chatId}`, {
//           withCredentials: true,
//         });
//         const data = res.data;

//         if (!data?.fileUrl) throw new Error("Missing file URL");

//         setPdfUrl(data.fileUrl);
//         setChatSummary(data.summary || "AI overview will appear here.");
//         setTitle(data.title || "Document.pdf");
//       } catch (error) {
//         console.error("Error fetching chat data:", error);
//         setPdfUrl("/static/sample.pdf"); // fallback
//         setChatSummary("Failed to fetch AI overview.");
//         setTitle("Sample.pdf");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatData();
//   }, [chatId]);

//   return (
//     <div className="bg-gradient-to-br from-white to-purple-50 min-h-screen flex flex-col md:flex-row overflow-hidden">
//       <Head>
//         <title>{`PDF Chat - ${title}`}</title>
//       </Head>

//       <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         allowedTypes={allowedTypes}
//         onFilesSelected={handleFilesSelected}
//       />

//       <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
//         {/* PDF Section */}
//         <div className="w-full lg:w-1/2 bg-gray-100 overflow-auto p-4">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading PDF...</p>
//           ) : (
//             <div className="h-full border rounded shadow flex flex-col items-center">
//               {pdfUrl ? (
//                 <Document
//                   file={pdfUrl}
//                   onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//                   onLoadError={(error) =>
//                     console.error("PDF load error:", error)
//                   }
//                   loading={<p>Loading PDF...</p>}
//                   error={<p className="text-red-500">Failed to load PDF.</p>}
//                 >
//                   {Array.from(new Array(numPages), (_, index) => (
//                     <Page
//                       key={`page_${index + 1}`}
//                       pageNumber={index + 1}
//                       width={600}
//                     />
//                   ))}
//                 </Document>
//               ) : (
//                 <p className="text-red-500">PDF URL is missing.</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Chat Section */}
//         <div className="w-full lg:w-1/2 bg-white p-2 overflow-auto h-screen">
//           <ChatComponent summary={chatSummary} loading={loading} title={title} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
