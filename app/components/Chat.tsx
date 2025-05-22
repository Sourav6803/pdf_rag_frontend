"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useParams } from "next/navigation"; // For extracting chatId from URL
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../server";

interface Doc {
  index: number;
  page: number;
  lines:
    | {
        from?: number;
        to?: number;
      }
    | "Not available";
  content: string;
  source: string | "";
}

interface IMessage {
  role: "assistant" | "user";
  content?: string;
  documents?: Doc[];
}

interface ChatResponse {
  aiAnswer: string;
  pdfMatches: Doc[];
}

type ChatComponentProps = {
  summary: string;
  loading: boolean;
  title?: string;
};

const ChatComponent: React.FC<ChatComponentProps> = ({
  summary,
  loading,
  title,
}) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const params = useParams(); // Extracts dynamic params from route
  const chatId = params?.chatId as string; // assumes the route is /chat/[chatId]
  const [loadingChat, setLoadingChat] = useState(false); // 👈 New state

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    setLoadingChat(true); // 👈 Start loader

    try {
      const res = await axios.get<ChatResponse>(
        `${server}/api/chat/chat`,
        {
          params: {
            message,
            pdfId: chatId,
          },
          withCredentials: true,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.aiAnswer,
          documents: res.data.pdfMatches,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setLoadingChat(false); // 👈 Stop loader in both success/failure
    }
  };

  useEffect(() => {
  async function loadMessages() {
    try {
      const res = await axios.get(
        `${server}/api/chat/messages/${chatId}`,
        { withCredentials: true }
      );

      const normalized: IMessage[] = [];

      for (const msg of res.data) {
        if (msg.sender === "user") {
          normalized.push({
            role: "user",
            content: msg.message,
          });
        } else if (msg.sender === "ai") {
          if (msg.messageType === "pdf") {
            normalized.push({
              role: "assistant",
              content: msg.message,
              documents: [
                {
                  index: 0, // if needed
                  page: msg.pageNumbers?.[0] ?? "N/A",
                  lines: "Not available", // or use msg.lines if available
                  content: msg.message,
                  source: "blob", // or msg.source if stored
                },
              ],
            });
          } else {
            normalized.push({
              role: "assistant",
              content: msg.message,
              documents: [],
            });
          }
        }
      }

      setMessages(normalized);
    } catch (error) {
      console.error("Failed to load messages", error);
      toast.error("Failed to load previous messages.");
    }
  }

  loadMessages();
}, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="flex flex-col h-screen  p-3">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">AI Overview</h2>
      <p className="whitespace-pre-line text-gray-700 text-xs">
        {loading ? "Generating overview..." : summary}
      </p>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 mt-5">
        {messages.map((msg: IMessage, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] sm:max-w-[70%]
              ${
                msg.role === "user"
                  ? "ml-auto items-end"
                  : "mr-auto items-start"
              }`}
          >
            <div
              className={`rounded-xl px-4 py-3 shadow-md ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 "
              }`}
            >
              <p className="whitespace-pre-line text-sm">{msg.content}</p>
            </div>

            {/* Assistant PDF References */}
            {msg.role === "assistant" &&
              msg.documents &&
              msg?.documents?.length > 0 && (
                <div className="mt-4 w-full space-y-3">
                  <p className="text-sm text-gray-600 font-medium">
                    Referenced PDFs:
                  </p>
                  {msg.documents!.map((doc: Doc, i) => {
                    const fromLine =
                      doc.lines !== "Not available"
                        ? doc.lines.from ?? "N/A"
                        : "N/A";
                    const toLine =
                      doc.lines !== "Not available"
                        ? doc.lines.to ?? "N/A"
                        : "N/A";

                    return (
                      <div
                        key={i}
                        className="bg-gray-50 border rounded-md p-3 text-sm text-gray-700 space-y-2 shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <FaFilePdf className="text-red-500" />
                            <span>{title}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Page {doc.page ?? "N/A"}, Lines {fromLine} -{" "}
                            {toLine}
                          </div>
                        </div>
                        {doc.content && (
                          <div className="bg-white border p-2 rounded text-xs overflow-y-auto max-h-32 whitespace-pre-line">
                            {doc.content}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        ))}

        {loadingChat && (
          <div className="flex justify-start items-center space-x-2 text-sm text-gray-500">
            <div className="animate-bounce">🤖</div>
            <div className="italic">AI is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 border-t bg-white px-4 py-3 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) {
                  handleSendChatMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full rounded-full border border-gray-300 bg-gray-100 px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-500"
            />
          </div>
          <button
            onClick={handleSendChatMessage}
            disabled={!message.trim()}
            className="shrink-0 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
