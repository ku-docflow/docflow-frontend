import { useEffect, useRef } from "react";
import { updateDocument } from "../../api/document";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Document } from "../../types/document";

export const useMarkdownEditor = (focusedDocument: Document | null) => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (focusedDocument && editorRef.current) {
          const markdown = editorRef.current.getMarkdown();
          updateDocument(focusedDocument.id, { text: markdown });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedDocument]);

  useEffect(() => {
    if (!editorRef.current) return;
    if (focusedDocument) {
      editorRef.current.setMarkdown(focusedDocument.text || "");
    } else {
      editorRef.current.setMarkdown("");
    }
  }, [focusedDocument]);

  const handleChange = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!focusedDocument || !editorRef.current) return;
      const markdown = editorRef.current.getMarkdown();
      updateDocument(focusedDocument.id, { text: markdown });
    }, 5000);
  };

  return {
    editorRef,
    handleChange,
  };
};
