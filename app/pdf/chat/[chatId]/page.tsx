
// import { useEffect, useState } from 'react';
// import Head from 'next/head';

// interface ChatPageProps {
//   chatId: string;
// }

// const ChatPage = ({ chatId }: ChatPageProps) => {
//   const [pdfUrl, setPdfUrl] = useState<string>('');
//   const [chatSummary, setChatSummary] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);

//   console.log("ChatPage loaded with chatId:", chatId);

//   useEffect(() => {
//     const fetchChatData = async () => {
//       try {
//         const res = await fetch(`/api/chat/${chatId}`);
//         const data = await res.json();
//         setPdfUrl(data.pdfUrl || `/static/sample.pdf`); // fallback static file
//         setChatSummary(data.chatSummary || 'AI overview will appear here.');
//       } catch (error) {
//         setPdfUrl(`/static/sample.pdf`); // fallback static file on error
//         setChatSummary('Failed to fetch AI overview.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatData();
//   }, [chatId]);

//   return (
//     <>
//       <Head>
//         <title>PDF Chat - {chatId}</title>
//       </Head>
//       <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
//         {/* Left: PDF Viewer */}
//         <div className="w-full lg:w-1/2 bg-gray-100 overflow-auto p-4">
//           {loading ? (
//             <p className="text-gray-500">Loading PDF...</p>
//           ) : (
//             <iframe
//               src={pdfUrl}
//               className="w-full h-full rounded-md border"
//               title="PDF Viewer"
//             />
//           )}
//         </div>

//         {/* Right: AI Overview */}
//         <div className="w-full lg:w-1/2 bg-white p-6 overflow-auto">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Overview</h2>
//           <p className="whitespace-pre-line text-gray-700">
//             {loading ? 'Generating overview...' : chatSummary}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };



// export default ChatPage;


import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FiSend, FiUpload, FiLoader, FiMessageSquare, FiFileText } from 'react-icons/fi';

interface ChatPageProps {
  chatId: string;
}

const ChatPage = ({ chatId }: ChatPageProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [chatSummary, setChatSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{sender: string, message: string}>>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Dummy data for initial state
  const dummyPDF = '/static/sample.pdf';
  const dummyAISummary = `This document appears to be a collection of frontend interview questions covering:
  
  - JavaScript fundamentals (closures, promises, ES6+ features)
  - React concepts (hooks, component lifecycle, state management)
  - CSS layout techniques (Flexbox, Grid)
  - Common algorithms and data structures
  
  The sample code shows a JavaScript sorting implementation that needs correction. Would you like me to analyze the sorting algorithm or explain any specific concept in more detail?`;

  const dummyChatHistory = [
    { sender: 'AI', message: 'Welcome to PDF Chat Assistant! I can help you analyze and discuss this document.' },
    { sender: 'AI', message: 'Would you like me to summarize any particular section or explain concepts from this PDF?' }
  ];

  useEffect(() => {
    // Simulate API fetch with timeout for demo purposes
    const timer = setTimeout(() => {
      setPdfUrl(dummyPDF);
      setChatSummary(dummyAISummary);
      setChatHistory(dummyChatHistory);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [chatId]);

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    setIsProcessing(true);
    const newUserMessage = { sender: 'User', message: userMessage };
    setChatHistory([...chatHistory, newUserMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        sender: 'AI', 
        message: `I've analyzed your question about "${userMessage}". In this document, that topic is covered in section 3.2 with examples. Would you like me to go deeper into this?`
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setUserMessage('');
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>PDF Chat - {chatId}</title>
      </Head>
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
        {/* Left: PDF Viewer with upload option */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-gray-200">
          <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiFileText className="mr-2" /> Document Viewer
            </h2>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <FiUpload className="mr-2" /> Upload PDF
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FiLoader className="animate-spin text-gray-400 text-4xl mb-4" />
                <p className="text-gray-500">Loading document...</p>
              </div>
            ) : (
              <iframe
                src={pdfUrl}
                className="w-full h-full min-h-[70vh] rounded-lg shadow-sm border border-gray-300 bg-white"
                title="PDF Viewer"
              />
            )}
          </div>
        </div>

        {/* Right: AI Chat Interface */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="p-4 bg-white border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiMessageSquare className="mr-2" /> PDF Assistant
            </h2>
          </div>
          
          {/* AI Overview Section */}
          <div className="p-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-sm font-medium text-gray-500 mb-2">DOCUMENT SUMMARY</h3>
            <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              {loading ? (
                <div className="flex items-center text-gray-500">
                  <FiLoader className="animate-spin mr-2" /> Generating summary...
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{chatSummary}</p>
              )}
            </div>
          </div>
          
          {/* Chat History */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.sender === 'AI' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${chat.sender === 'AI' 
                    ? 'bg-white border border-gray-200' 
                    : 'bg-blue-600 text-white'}`}
                >
                  <p className="whitespace-pre-wrap">{chat.message}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center text-gray-500">
                    <FiLoader className="animate-spin mr-2" /> Thinking...
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask about this document..."
                className="flex-1 px-4 py-2 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isProcessing}
              />
              <button
                onClick={handleSendMessage}
                disabled={isProcessing}
                className="px-4 py-2 bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-blue-400 transition"
              >
                {isProcessing ? <FiLoader className="animate-spin" /> : <FiSend />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ask questions about the document, request summaries, or clarify concepts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
