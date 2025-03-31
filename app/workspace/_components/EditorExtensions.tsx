"use client";
import { sendMessageWithFallback } from "@/configs/AiModel";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Download,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  ListIcon,
  ListOrderedIcon,
  SaveIcon,
  SparklesIcon,
  StrikethroughIcon,
  Subscript,
  Superscript,
  TextQuoteIcon,
  Underline,
} from "lucide-react";
import { useParams } from "next/navigation";

import React from "react";

const highlightStyles = `
  .ProseMirror .highlight {
    background-color: #fef08a;
    padding: 0.2em 0;
  }
  
  /* Override default selection color when highlighting */
  .ProseMirror .highlight::selection {
    background-color: #fef08a !important;
    color: inherit !important;
  }
  
  .ProseMirror .highlight *::selection {
    background-color: #fef08a !important;
    color: inherit !important;
  }
  
  /* Handle when the highlight is being selected */
  .ProseMirror::selection {
    background-color: rgba(200, 200, 200, 0.4) !important;
  }
  
  .ProseMirror *::selection {
    background-color: rgba(200, 200, 200, 0.4) !important;
  }
`;

function EditorExtensions({ editor }: { editor: any }) {
  const { fileId }: { fileId: string } = useParams();
  const { user } = useUser();
  const search = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const save = () => {
    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
    });
  };

  // First install these dependencies:
  // pnpm add jspdf html2canvas file-saver @types/file-saver

  // PDF download function
  const downloadAsPDF = async () => {
    if (!editor) return;

    // Get the editor's DOM element
    const editorElement = document.querySelector(
      ".ProseMirror"
    ) as HTMLElement | null;
    if (!editorElement) return;

    try {
      // Create a canvas from the editor content
      const canvas = await html2canvas(editorElement, { scale: 3 });

      // Initialize PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("notes.pdf");
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  // Simple plain text download function (as fallback for DOCX)
  const downloadAsText = () => {
    if (!editor) return;

    // Get plain text content
    const textContent = editor.getText();

    // Create a Blob with the text content
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "notes.txt");
  };
  const process = async () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    const allText = editor.getHTML();

    editor.commands.setContent(`${allText}\nGenerating...`);
    const result = await search({
      query: selectedText,
      fileId: fileId,
    });

    const JsonResult = await JSON.parse(result);
    let context = "";
    JsonResult.forEach((item: any) => {
      context += item["pageContent"] + "\n";
    });
    const prompt: string = `You are an expert in note-making. I will provide a question, and your job is to write a concise answer as if you are taking notes.  
    ### **Answering Style:**  
    1. **Start with a few direct sentences that answer the question.**  
    2. **If necessary, include a short list of key points.**  
    3. **For equations or formulas, use a line gap and proper indentation.**  
    4. **Do not add unnecessary explanations or extra points.**  
    
    For the question: **${selectedText}**  
    Provide an appropriate answer in **HTML format** (everything inside the \`<body>\` tag, but do not include the tag itself).  
    
    Only use the context provided: **${context}**  
    If the answer is not found in the context, respond with:  
    *"The answer to the question is not provided in the context."*
    `;
    const AiModelResult = await sendMessageWithFallback(prompt);

    const cleanAnswer = AiModelResult.replace(/```html/g, "") // Remove ```html
      .replace(/```/g, "") // Remove ```
      .trim(); // Trim any extra whitespace
    editor.commands.setContent(
      `${allText} 
      
        <p>
           <strong>Answer:</strong>${cleanAnswer}
        </p>
      `
    );
  };

  return (
    editor && (
      <div className="p-5 ">
        <style>{highlightStyles}</style>
        <div className="control-group ">
          <div className="button-group flex  ">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={!editor}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor?.isActive("bold") ? "is-active bg-gray-200" : ""
              }`}
              aria-label="Toggle bold"
            >
              <Bold size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("italic") ? "is-active bg-gray-200" : ""
              }`}
            >
              <Italic size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("underline") ? "is-active bg-gray-200" : ""
              }`}
            >
              <Underline size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("superscript") ? "is-active bg-gray-200" : ""
              }`}
            >
              <Superscript size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("subscript") ? "is-active bg-gray-200" : ""
              }`}
            >
              <Subscript size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive({ textAlign: "left" })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <AlignLeft size={15} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive({ textAlign: "center" })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <AlignCenter size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive({ textAlign: "right" })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <AlignRight size={15} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive({ textAlign: "justify" })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <AlignJustify size={15} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("heading", { level: 1 })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <Heading1 size={15} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("heading", { level: 2 })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <Heading2 size={15} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("heading", { level: 3 })
                  ? "is-active bg-gray-200"
                  : ""
              }`}
            >
              <Heading3 size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("blockquote") ? "is-active bg-gray-200" : ""
              }`}
            >
              <TextQuoteIcon size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("bulletList") ? "is-active bg-gray-200" : ""
              }`}
            >
              <ListIcon size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("orderedList") ? "is-active bg-gray-200" : ""
              }`}
            >
              <ListOrderedIcon size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("strike") ? "is-active bg-gray-200" : ""
              }`}
            >
              <StrikethroughIcon size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`w-8 h-8 flex items-center justify-center m-px rounded-sm ${
                editor.isActive("highlight") ? "is-active bg-gray-200" : ""
              }`}
            >
              <Highlighter size={15} />
            </button>
            <button onClick={save}>
              <SaveIcon size={18} />
            </button>
            <button
              onClick={downloadAsPDF}
              className={`w-8 h-8 flex items-center justify-center ml-3 rounded-sm hover:bg-slate-200`}
            >
              <Download />
            </button>{" "}
            <button
              onClick={(e) => process()}
              className={`w-8 h-8 flex items-center justify-center ml-3 rounded-sm hover:bg-slate-200`}
            >
              <SparklesIcon className="animate-sparkle" />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtensions;
