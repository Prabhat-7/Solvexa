import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const PdfUrl =
  "https://mellow-gopher-714.convex.cloud/api/storage/d53c6e58-6900-441f-addf-36c53c0b69f1";
export async function GET(request: Request) {
  //LOAD THE PDF FILE
  const response = await fetch(PdfUrl);

  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();
  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });
  //SPLIT THE  TEXT INTO CHUNKS
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const texts = await textSplitter.createDocuments([pdfTextContent]);
  let chunks: string[] = [];
  texts.forEach((doc: any) => {
    chunks.push(doc.pageContent);
  });
  return NextResponse.json({ result: chunks });
}
