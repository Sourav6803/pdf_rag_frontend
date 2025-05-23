// types/pdfjs-dist.d.ts
declare module 'pdfjs-dist/build/pdf' {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export * from 'pdfjs-dist/types/src/pdf';
}