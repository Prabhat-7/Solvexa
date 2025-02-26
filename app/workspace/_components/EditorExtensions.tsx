"use client";
import { chatSession } from "@/configs/AiModel";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  ListIcon,
  ListOrderedIcon,
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

  const search = useAction(api.myAction.search);
  const process = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log(selectedText);
    const result = await search({
      query: selectedText,
      fileId: fileId,
    });

    const JsonResult = await JSON.parse(result);
    console.log(JsonResult);
    let context = "";
    JsonResult.forEach((item: any) => {
      context += item["pageContent"] + "\n";
    });
    console.log(context);
    const prompt = `For the question: ${selectedText}\n Provide me an appropriate
     answer in HTML format(Put everything inside the body tag but dont include it
      . Like this  <body>{your_answer}</body>) only on the basis of the context i 
      provide. If the answer is not found in the context then say that the answer
       for the question is not provided in the context. The context is :${context}`;
    const AiModelResult = await chatSession.sendMessage(prompt);
    console.log(AiModelResult.response.text());
  };
  return (
    editor && (
      <div className="p-5">
        <style>{highlightStyles}</style>
        <div className="control-group">
          <div className="button-group flex ">
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
            <button
              onClick={(e) => process(e)}
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
