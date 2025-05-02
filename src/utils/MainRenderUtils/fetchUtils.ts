import { InitUserResponse } from "../../types/user";
import { fetchTopicsByOrg } from "../../api/topic";
import { fetchDocumentsByTopic } from "../../api/document";
import { setDocumentHierarchy } from "../../store/slices/documentSlice";
import { AppDispatch } from "../../store";

export const fetchAndStoreDocumentHierarchy = async (
  initData: InitUserResponse,
  dispatch: AppDispatch
) => {
  const orgWithTopicsList = await Promise.all(
    initData.orgs.map(async (org) => {
      const topics = await fetchTopicsByOrg(Number(org.id));
      const topicsWithDocs = await Promise.all(
        topics.map(async (topic) => {
          const documents = await fetchDocumentsByTopic(topic.id);
          return { topic, documents };
        })
      );
      return { organization: org, topics: topicsWithDocs };
    })
  );

  dispatch(setDocumentHierarchy(orgWithTopicsList));
};
