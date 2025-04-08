import React from "react";
import ReactMarkdown from "react-markdown";
import '../../../styles/WikiInterface/MarkdownStrip/MarkdownStrip.css';

interface MarkdownStripProps {
  documentId: string;
}

// Simulating content for now
const mockMarkdownContent: { [key: string]: string } = {
  doc1: "# API Spec\n\nThis is the API documentation...",
  doc2: "# DB Schema\n\nThis is the schema design...",
  doc3: "# Auth Flow\n\nThis explains OAuth setup..."
};

const MarkdownStrip: React.FC<MarkdownStripProps> = ({ documentId }) => {
  const content = mockMarkdownContent[documentId] || "# Document not found";

  return (
    <div className="markdown-strip">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownStrip;