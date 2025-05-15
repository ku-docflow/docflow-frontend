// src/components/WikiInterface/Strip/DocumentListStrip/TopicBlock.tsx
import React from "react";
import DocumentBlock from "./DocumentBlock";
import { Topic } from "../../../../types/topic";
import { Document } from "../../../../types/document";
import "../../../../styles/WikiInterface/DocumentListStrip/TopicBlock.css";
import { useTopicBlock } from "../../../../hooks/WikiInterfaceHooks/useTopicBlock";

interface TopicWithDocuments {
  topic: Topic;
  documents: Document[];
}

interface TopicBlockProps {
  topicBlock: TopicWithDocuments;
}

const TopicBlock: React.FC<TopicBlockProps> = ({ topicBlock }) => {
  const {
    expanded,
    isCollapsing,
    toggleTopic,
    handleCreateDocument,
  } = useTopicBlock(topicBlock.topic.id);

  return (
    <div className={`TopicBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
      <div className="TopicBlock-header" onClick={toggleTopic}>
        <span>{topicBlock.topic.title}</span>
        <button
          className="add-document-button-icon"
          onClick={handleCreateDocument}
          aria-label="Add Document"
        >
          +
        </button>
      </div>
      <div className="TopicBlock-content">
        {topicBlock.documents.map((doc) => (
          <DocumentBlock key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
};

export default TopicBlock;