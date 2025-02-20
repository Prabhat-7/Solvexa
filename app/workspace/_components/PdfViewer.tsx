"use client";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Update container width when component mounts and on window resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  const goToNextPage = () => {
    if (currentPage < numPages!) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center" ref={containerRef}>
      {/* Simple navigation controls */}
      <div className="w-full flex justify-between mb-4">
        <button 
          onClick={goToPrevPage} 
          disabled={currentPage <= 1}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {numPages || '--'}</span>
        
        <button 
          onClick={goToNextPage} 
          disabled={currentPage >= numPages!}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Document viewer */}
      <div className="w-fullshadow-lg border border-gray-200 rounded-lg max-h-[80vh] overflow-auto ">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) =>
            console.error("Error while loading document!", error)
          }
        >
          {numPages ? (
            <Page 
              pageNumber={currentPage}
              width={containerWidth} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ) : (
            <div className="flex justify-center items-center h-80 w-full">
              <div>Loading PDF...</div>
            </div>
          )}
        </Document>
      </div>
    </div>
  );
}

export default PdfViewer;