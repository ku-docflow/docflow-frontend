export interface SearchBotRequest {
  references?: {
    title: string;
    content: string;
  }[];
  userQuery: string;
}

export interface SearchBotResponse {
  statusCode: number;
  messages: string;
  data: {
    ragResponse: string;
  };
}

export interface genBotRequest {
  query: string;
  chatRoomId: number;
  startMessageId: string;
}

export interface genBotResponse {
  statusCode: number;
  message: string;
  data: {
    documentId: string;
    organizationId: string;
    createdAt: string;
    document: string;
    summary: string;
    userId: string;
    createdBy: string;
    category: string;
  };
}
