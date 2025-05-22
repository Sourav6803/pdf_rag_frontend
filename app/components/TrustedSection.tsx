// components/TrustedSection.tsx
'use client'
import Image from 'next/image';
import React from 'react';

const universities = [
  { name: 'Johns Hopkins', src: '/Johns-Hopkins-University-Symbol.png' },
  { name: 'Stanford', src: '/stanford-university.png' },
  { name: 'Yale', src: '/yale.png' },
  { name: 'Princeton', src: '/princon.png' },
  { name: 'Harvard', src: '/Harvard_University_coat_of_arms.svg.png' },
];

const TrustedSection = () => {
  return (
    <section className="w-full  py-12 md:py-20 px-6">
      {/* Logos Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-gray-600 text-lg md:text-xl mb-8">
          Trusted by students and researchers from top institutions
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {universities.map((uni) => (
            <Image
              key={uni.name}
              src={uni.src}
              alt={uni.name}
              width={120}
              height={40}
              className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>

      {/* Testimonial Box */}
      <div className="mt-20 flex justify-center">
        <div className="relative bg-gray-100 rounded-2xl px-6 py-10 md:py-12 max-w-3xl text-center shadow-md">
          {/* Emojis */}
          <span className="absolute -top-3 -left-3 text-xl md:text-2xl">💖</span>
          <span className="absolute -bottom-3 -right-3 text-xl md:text-2xl">👍</span>

          {/* Quote */}
          <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed">
            "It’s like ChatGPT, but for{' '}
            <span className="text-purple-600 font-semibold">research papers</span>."
          </p>

          {/* Author */}
          <div className="mt-6 flex flex-col items-center">
            <Image
              src="https://www.chatpdf.com/_static/twitter/profile/mushtaq_64x64.webp"
              alt="Mushtaq Bilal"
              width={60}
              height={60}
              className="rounded-full"
            />
            <p className="mt-2 font-semibold text-gray-800">Mushtaq Bilal, PhD</p>
            <p className="text-gray-500 text-sm">@MushtaqBilalPhD</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
