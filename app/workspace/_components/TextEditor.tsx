"use client";
import "./TextEditor.css";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import React, { SetStateAction, useEffect, useRef } from "react";
import EditorExtensions from "./EditorExtensions";
import TextAlign from "@tiptap/extension-text-align";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
interface textEditorProps {
  fileId: string;
  setEditor: React.Dispatch<React.SetStateAction<any>>;
}
export default function TextEditor({ fileId, setEditor }: textEditorProps) {
  const notes = useQuery(api.notes.getNotes, { fileId: fileId! });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      Placeholder.configure({
        placeholder: "Start taking your notes here...",
      }),
    ],

    editorProps: { attributes: { class: "focus:outline-none h-screen p-5" } },
  });
  useEffect(() => {
    if (setEditor) {
      setEditor(editor);
    }
    editor?.commands.setContent(notes);
    return () => {
      if (setEditor) {
        setEditor(null);
      }
    };
  }, [notes]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white">
        <EditorExtensions editor={editor} />
      </div>

      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
