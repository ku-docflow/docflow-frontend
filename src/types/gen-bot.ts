export type docGenerationRequest = {
  chatroom_id: Number;
  first_msg_id: Number;
  last_msg_id: Number;
  user_query: string;
  topic_id: string | null;
};

export type docGenerationResponse = {
  documentId: number;
};
