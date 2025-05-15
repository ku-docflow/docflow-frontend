import { useState } from "react";
import { useCreateTopic } from "../../../hooks/WikiInterfaceHooks/useCreateTopic";

export const useDocumentListStrip = (organizationId?: string) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  const { handleCreateTopic } = useCreateTopic(() => {
    setIsAdding(false);
    setNewTopicName("");
  });

  const handleAddTopic = () => {
    const trimmed = newTopicName.trim();
    if (!trimmed || !organizationId) {
      setIsAdding(false);
      setNewTopicName("");
      return;
    }
    handleCreateTopic(organizationId, trimmed);
  };

  return {
    isAdding,
    newTopicName,
    setIsAdding,
    setNewTopicName,
    handleAddTopic,
  };
};
