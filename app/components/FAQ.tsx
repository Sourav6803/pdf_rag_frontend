'use client'
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Install lucide-react

const faqs = [
  {
    question: 'What is ChatPDF and how can it help me?',
    answer:
      'ChatPDF brings the power of conversational AI to your documents, letting you chat with your PDFs easily. Whether you’re studying, researching, or analyzing documents, our platform helps you extract insights instantly.',
  },
  {
    question: 'Is ChatPDF free?',
    answer:
      'Absolutely! Our free plan allows you to analyze up to 2 documents per day. The ChatPDF Plus plan unlocks unlimited analysis and premium features.',
  },
  {
    question: 'How does ChatPDF\'s AI technology work?',
    answer:
      'Our AI maps your document’s structure and meaning, then answers your queries with contextual understanding and relevant citations to back them up.',
  },
  {
    question: 'Does ChatPDF support other file types?',
    answer:
      'Yes! Besides PDFs, we support DOCX, PPTX, TXT, and Markdown files. You can chat with academic papers, presentations, notes, and more.',
  },
  {
    question: 'Can I trust ChatPDF with sensitive data?',
    answer:
      'Your files are encrypted and securely stored. You can delete them anytime. We never share your documents — your privacy is our priority.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className=" py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 space-y-2"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>

                  <div
                    className={`transition-transform transform rounded-full bg-yellow-400/20 p-2 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-yellow-600" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed text-[15px]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
