export interface SimilarDocumentRequest {
  queryMessage: string;
}

export interface SimilarDocumentResponse {
  documents: {
    id: string;
    title: string;
    similarityScore: number;
  }[];
}
