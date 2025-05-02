// src/components/WikiInterface/Strip/TopicBlock.tsx
import React, { useState } from "react";
import DocumentBlock from "./DocumentBlock";
import { Topic } from "../../../../types/topic";
import { Document } from "../../../../types/document";
import "../../../../styles/WikiInterface/DocumentListStrip/TopicBlock.css";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDocument } from "../../../../store/slices/uiSlice";
import { RootState } from "../../../../store/index";
import { createDocument } from "../../../../api/document";

interface TopicWithDocuments {
  topic: Topic;
  documents: Document[];
}

interface TopicBlockProps {
  topicBlock: TopicWithDocuments;
}

const TopicBlock: React.FC<TopicBlockProps> = ({ topicBlock }) => {
  const [expanded, setExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const dispatch = useDispatch();

  const toggleTopic = () => {
    if (expanded) {
      setIsCollapsing(true);
      setExpanded(false);
      setTimeout(() => setIsCollapsing(false), 300);
    } else {
      setExpanded(true);
    }
  };

  const handleCreateDocument = async () => {
    try {
      const doc = await createDocument({
        topic_id: topicBlock.topic.id,
        text: "새 문서",
      });
      dispatch(setSelectedDocument(doc)); //set it so that the newly created doc is focused
    } catch (err) {
      console.error("Failed to create new document to server:", err)
    }
  };

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
          <DocumentBlock document={doc} />
        ))}
      </div>
    </div>
  );
};

export default TopicBlock;