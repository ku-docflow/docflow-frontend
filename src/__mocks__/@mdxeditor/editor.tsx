import React, { ReactNode } from 'react';

interface MDXEditorProps {
  children?: ReactNode;
  [key: string]: any;
}

const MDXEditor = ({ children, ...props }: MDXEditorProps) => {
  return <div data-testid="mdx-editor" {...props}>{children}</div>;
};

// Mock plugins
const headingsPlugin = () => ({});
const listsPlugin = () => ({});

// Mock style export
const styles = {};

export {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  styles
};

export default MDXEditor;

export const markdownShortcutPlugin = () => ({});
export const quotePlugin = () => ({});
export const frontmatterPlugin = () => ({});
export const linkPlugin = () => ({});
export const linkDialogPlugin = () => ({});
export const tablePlugin = () => ({});
export const imagePlugin = () => ({});
export const codeBlockPlugin = () => ({});
export const codeMirrorPlugin = () => ({});
export const diffSourcePlugin = () => ({});
export const toolbarPlugin = () => ({});
export const BlockTypeSelect = () => <div>Block Type Select Mock</div>;
export const CreateLink = () => <div>Create Link Mock</div>;
export const InsertImage = () => <div>Insert Image Mock</div>;
export const InsertTable = () => <div>Insert Table Mock</div>;
export const ListsToggle = () => <div>Lists Toggle Mock</div>;
export const UndoRedo = () => <div>Undo Redo Mock</div>;
export const BoldItalicUnderlineToggles = () => <div>Bold Italic Underline Toggles Mock</div>;
export const ChangeCodeMirrorLanguage = () => <div>Change Code Mirror Language Mock</div>;
export const ConditionalContents = () => <div>Conditional Contents Mock</div>;
export const InsertCodeBlock = () => <div>Insert Code Block Mock</div>;
export const InsertFrontmatter = () => <div>Insert Frontmatter Mock</div>;
export const InsertThematicBreak = () => <div>Insert Thematic Break Mock</div>;
export const Separator = () => <div>Separator Mock</div>;
export const ShowDiffToggle = () => <div>Show Diff Toggle Mock</div>;
export const TableActionMenu = () => <div>Table Action Menu Mock</div>;
export const ToolbarWrap = () => <div>Toolbar Wrap Mock</div>;
export const KitchenSinkToolbar = () => <div>Kitchen Sink Toolbar Mock</div>; 