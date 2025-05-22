'use client'
import React from 'react';
import Image from 'next/image';

const articles = [
  {
    title: '7 Recommended PDF Readers with Translation Option',
    description:
      'Here are 7 best PDF readers with a translation tool to help you understand PDFs in languages you are not familiar with. Read on to find out which one works best for you.',
    image: 'https://www.pdfgear.com/chat-pdf/img/pdf-reader-with-translator-1.png',
  },
  {
    title: 'How To Summarize an Article Using AI Assistant [4 Ways Introduced]',
    description:
      'With the cooperation of AI, you can summarize articles in seconds to access key info. Here are 4 ways to summarize articles efficiently with an AI chat program.',
    image: 'https://www.pdfgear.com/pdf-editor-reader/img/how-to-summarize-an-article-1.png',
  },
  {
    title: 'How To Summarize a Book: Manual vs. AI Methods',
    description:
      'In this article, we delve into the art of book summarization, exploring both manual techniques and the integration of AI for efficient and effective summaries.',
    image: 'https://www.pdfgear.com/how-to/img/how-to-summarize-a-book-1.png',
  },
];

const ArticleGrid = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Tips and Tools to Chat PDF
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={500}
                height={300}
                className="w-full h-[200px] object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#"
            className="inline-flex items-center text-blue-600 hover:underline text-base font-medium group"
          >
            Find More PDF AI Tutorials
            <svg
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;
