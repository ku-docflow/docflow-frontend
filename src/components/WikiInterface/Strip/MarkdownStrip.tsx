import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateDocument } from "../../../api/document";
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import '../../../styles/WikiInterface/MarkdownStrip/MarkdownStrip.css';

const MarkdownStrip: React.FC = () => {
  const focusedDocument = useSelector((state: RootState) => state.ui.selectedDocument);
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

  if (!focusedDocument) {
    return <div className="markdown-strip">No document selected.</div>;
  }

  return (
    <div className="markdown-strip">
      <MDXEditor
        ref={editorRef}
        markdown={focusedDocument.text}
        onChange={handleChange}
        className="mdx-editor"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          // toolbarPlugin({
          //   toolbarContents: () => (
          //     <>
          //       <UndoRedo />
          //       <BoldItalicUnderlineToggles />
          //     </>
          //   )
          // })
        ]}
      />
    </div>
  );
};

export default MarkdownStrip;