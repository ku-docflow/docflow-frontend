import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import TopicBlock from "./TopicBlock";
import { useDocumentListStrip } from "../../../../hooks/WikiInterfaceHooks/DocumentListStrip/useDocumentListStrip";
import '../../../../styles/WikiInterface/DocumentListStrip/DocumentListStrip.css';

const DocumentListStrip: React.FC = () => {
  const hierarchy = useSelector((state: RootState) => state.documents.organizations);
  const focusedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const orgData = hierarchy.find(o => o.organization.id === focusedOrg?.id);

  const {
    isAdding,
    newTopicName,
    setIsAdding,
    setNewTopicName,
    handleAddTopic
  } = useDocumentListStrip(orgData?.organization.id);

  if (!orgData) return <div className="document-list-strip">No topics found.</div>;

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
            key={topicBlock.topic.id}
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
              placeholder="새 주제 ..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentListStrip;