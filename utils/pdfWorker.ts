// utils/pdfWorker.ts
import { GlobalWorkerOptions, version } from 'pdfjs-dist/build/pdf';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
