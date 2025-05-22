import Image from "next/image";

const FeaturesSection = () => {
  return (
    <>
      <section className="w-full  py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[320px] h-[240px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[350px]">
              <Image
                src="https://www.pdfgear.com/img/chat-pdf/pdfform-filler2.png" // Replace with your optimized image path
                alt="PDF Chat Illustration"
                layout="fill"
                objectFit="contain"
                className="rounded-xl "
              />
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ask Questions to Your PDF
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              Get a better understanding of your PDFs quickly by directly asking
              questions with our smart chatbot. Whether it's research papers,
              contracts, or study material—simply upload and start interacting.
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              Get{" "}
              <span className="font-semibold text-purple-600">
                precise answers
              </span>{" "}
              instantly, with 3 smart question suggestions generated for every
              PDF.
            </p>
          </div>
        </div>
      </section>

      {/* "https://www.pdfgear.com/img/chat-pdf/pdfform-filler4.png" */}

      <section className="w-full  py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[320px] h-[240px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[350px]">
              <Image
                src="https://www.pdfgear.com/img/chat-pdf/pdfform-filler4.png" // Replace with your optimized image path
                alt="PDF Chat Illustration"
                layout="fill"
                objectFit="contain"
                className="rounded-xl "
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make Precise Your Answer
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              PDFgear’s inbuilt PDF merger and splitter features let you do a
              lot more.
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium ml-1"
              >
                Extract pages from PDF
              </a>
              to get a highly accurate answer from a specific PDF page, or
              combine PDF documents to get a holistic answer from multiple
              files.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
