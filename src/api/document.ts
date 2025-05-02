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
} from "../types/document";

export const createDocument = (data: CreateDocumentRequest) =>
  post<CreateDocumentResponse, CreateDocumentRequest>("/document", data);

export const fetchDocumentById = (id: number) =>
  get<GetDocumentByIdResponse>(`/document/${id}`);

export const fetchDocumentsByTopic = (topicId: number) =>
  get<GetDocumentsByTopicResponse>(`/document/topic/${topicId}`);

export const fetchDocumentsByOrg = (orgId: number) =>
  get<GetDocumentsByOrgResponse>(`/document/org/${orgId}`);

export const updateDocument = (id: number, data: UpdateDocumentRequest) =>
  patch<UpdateDocumentResponse, UpdateDocumentRequest>(`/document/${id}`, data);

export const deleteDocument = (id: number) =>
  del<DeleteDocumentResponse>(`/document/${id}`);
