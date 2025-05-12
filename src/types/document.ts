export interface Document {
  id: number;
  topic_id: number;
  text: string;
  created_at: string;
}

export interface CreateDocumentRequest {
  topic_id: number;
  text: string;
}

export type CreateDocumentResponse = Document;

export type GetDocumentByIdRequest = void;
export type GetDocumentByIdResponse = Document;

export type GetDocumentsByTopicRequest = void;
export type GetDocumentsByTopicResponse = Document[];

export type GetDocumentsByOrgRequest = void;
export type GetDocumentsByOrgResponse = Document[];

export interface UpdateDocumentRequest {
  text: string;
}

export type UpdateDocumentResponse = Document;

export type DeleteDocumentRequest = void;
export interface DeleteDocumentResponse {
  success: true;
}

export type docGenerationRequest = {
  chatroom_id: Number;
  first_msg_id: Number;
  last_msg_id: Number;
  user_query: string;
};

export type docGenerationResponse = {
  document: Document;
};
