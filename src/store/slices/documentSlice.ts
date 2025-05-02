import { Organization } from "../../types/user";
import { Document } from "../../types/document";
import { Topic } from "../../types/topic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicWithDocuments {
  topic: Topic;
  documents: Document[];
}

interface OrganizationWithTopics {
  organization: Organization;
  topics: TopicWithDocuments[];
}

interface DocumentHierarchyState {
  organizations: OrganizationWithTopics[];
}

const initialState: DocumentHierarchyState = {
  organizations: [],
};

const documentHierarchySlice = createSlice({
  name: "documentHierarchy",
  initialState,
  reducers: {
    setDocumentHierarchy: (
      state,
      action: PayloadAction<OrganizationWithTopics[]>
    ) => {
      state.organizations = action.payload;
    },
    clearDocumentHierarchy: (state) => {
      state.organizations = [];
    },
  },
});

export const { setDocumentHierarchy, clearDocumentHierarchy } =
  documentHierarchySlice.actions;

export default documentHierarchySlice.reducer;
