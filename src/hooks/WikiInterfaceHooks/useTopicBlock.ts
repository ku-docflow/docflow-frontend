import { useExpandable } from "../common/useExpandable";
import { useDispatch } from "react-redux";
import { setSelectedDocument } from "../../store/slices/uiSlice";
import { createDocument } from "../../api/document";

export const useTopicBlock = (topicId: number) => {
  const { expanded, isCollapsing, toggle } = useExpandable();
  const dispatch = useDispatch();

  const handleCreateDocument = async () => {
    try {
      const doc = await createDocument({
        topic_id: topicId,
        text: "새 문서",
      });
      dispatch(setSelectedDocument(doc));
    } catch (err) {
      console.error("Failed to create new document to server:", err);
    }
  };

  return {
    expanded,
    isCollapsing,
    toggleTopic: toggle,
    handleCreateDocument,
  };
};
