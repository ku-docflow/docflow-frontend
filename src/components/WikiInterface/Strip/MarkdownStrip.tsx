import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
} from "@mdxeditor/editor";

// Only import CSS in non-test environments
if (process.env.NODE_ENV !== 'test') {
  require("@mdxeditor/editor/style.css");
}

import '../../../styles/WikiInterface/MarkdownStrip/MarkdownStrip.css';
import { useMarkdownEditor } from "../../../hooks/WikiInterfaceHooks/useMarkdownStrip";

const MarkdownStrip: React.FC = () => {
  const focusedDocument = useSelector((state: RootState) => state.ui.selectedDocument);
  const { editorRef, handleChange } = useMarkdownEditor(focusedDocument);

  if (!focusedDocument) {
    return <div className="markdown-strip">선택된 문서가 없습니다.</div>;
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
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default MarkdownStrip;