import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import TopicBlock from "./TopicBlock";
import { useCreateTopic } from "../../../../hooks/useCreateTopic";
import '../../../../styles/WikiInterface/DocumentListStrip/DocumentListStrip.css';



const DocumentListStrip: React.FC = () => {
  const hierarchy = useSelector((state: RootState) => state.documents.organizations);
  const focusedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const orgData = hierarchy.find(o => o.organization.id === focusedOrg?.id);

  const [isAdding, setIsAdding] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  const { handleCreateTopic } = useCreateTopic(() => {
    setIsAdding(false);
    setNewTopicName("");
    // automatic rendering expected
  });

  if (!orgData) return <div className="document-list-strip">No topics found.</div>;

  const handleAddTopic = () => {
    const trimmed = newTopicName.trim();
    if (!trimmed) {
      setIsAdding(false);
      setNewTopicName("");
      return;
    }
    handleCreateTopic(orgData.organization.id, trimmed);
  };

  return (
    <div className="document-list-strip">
      <div className="document-list-strip-header">
        <h3>{orgData.organization.name}</h3>
        <button
          className="add-topic-button-icon"
          onClick={() => setIsAdding(true)}
          aria-label="Add Topic"
        >
          +
        </button>
      </div>
      <div className="topic-list">
        {orgData.topics.map((topicBlock) => (
          <TopicBlock
            topicBlock={topicBlock}
          />
        ))}
        {isAdding && (
          <div className="topic-block add-topic-input">
            <input
              autoFocus
              type="text"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              onBlur={handleAddTopic}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTopic();
                if (e.key === 'Escape') {
                  setIsAdding(false);
                  setNewTopicName("");
                }
              }}
              placeholder="Enter topic name"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentListStrip;