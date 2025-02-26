import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { TokenTextSplitter } from "@langchain/textsplitters";

export async function GET(request: Request) {
  const reqUrl = request.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");

  //LOAD THE PDF FILE
  const response = await fetch(pdfUrl!);

  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();
  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });
  //SPLIT THE  TEXT INTO CHUNKS
  const textSplitter = new TokenTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });
  const chunks = await textSplitter.splitText(pdfTextContent);

  return NextResponse.json({ result: chunks });
}
