import { get, post } from "./apiClient";
import {
  CreateTopicRequest,
  CreateTopicResponse,
  GetTopicByIdResponse,
  GetTopicsByOrgResponse,
} from "../types/topic";

export const createTopic = (data: CreateTopicRequest) =>
  post<CreateTopicResponse, CreateTopicRequest>("/topic", data);

export const fetchTopicById = (id: number) =>
  get<GetTopicByIdResponse>(`/topic/${id}`);

export const fetchTopicsByOrg = (orgId: number) =>
  get<GetTopicsByOrgResponse>(`/topic/org/${orgId}`);
