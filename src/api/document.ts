import { get, post, patch, del } from "./apiClient";
import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  GetDocumentByIdResponse,
  GetDocumentsByOrgResponse,
  GetDocumentsByTopicResponse,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
  DeleteDocumentResponse,
  docGenerationRequest,
  docGenerationResponse,
} from "../types/document";

export const createDocument = async (
  data: CreateDocumentRequest
): Promise<CreateDocumentResponse> => {
  return post<CreateDocumentResponse, CreateDocumentRequest>("/document", data);
};

export const fetchDocumentById = async (
  id: number
): Promise<GetDocumentByIdResponse> => {
  return get<GetDocumentByIdResponse>(`/document/${id}`);
};

export const fetchDocumentsByTopic = async (
  topicId: number
): Promise<GetDocumentsByTopicResponse> => {
  return get<GetDocumentsByTopicResponse>(`/document/topic/${topicId}`);
};

export const fetchDocumentsByOrg = async (
  orgId: number
): Promise<GetDocumentsByOrgResponse> => {
  return get<GetDocumentsByOrgResponse>(`/document/org/${orgId}`);
};

export const updateDocument = async (
  id: number,
  data: UpdateDocumentRequest
): Promise<UpdateDocumentResponse> => {
  return patch<UpdateDocumentResponse, UpdateDocumentRequest>(
    `/document/${id}`,
    data
  );
};

export const deleteDocument = async (
  id: number
): Promise<DeleteDocumentResponse> => {
  return del<DeleteDocumentResponse>(`/document/${id}`);
};

export const generateDocument = async (
  data: docGenerationRequest
): Promise<docGenerationResponse> => {
  return post<docGenerationResponse, docGenerationRequest>(
    "/document/generate",
    data
  );
};
