import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useExtractTopicsOfOrgs = () => {
  const selectedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const docHierarchy = useSelector(
    (state: RootState) => state.documents.organizations
  );

  const topics = docHierarchy
    .find((org) => org.organization.id === selectedOrg?.id)
    ?.topics.map((topic) => ({
      topic_title: topic.topic.title,
      topic_id: topic.topic.id,
    }));

  return topics;
};
export default useExtractTopicsOfOrgs;
