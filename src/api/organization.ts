import { post, del, patch } from "./apiClient";
import {
  CreateOrgRequest,
  CreateOrgResponse,
  DeleteOrgRequest,
  DeleteOrgResponse,
  UpdateOrgRequest,
  UpdateOrgResponse,
} from "../types/org";

export const createOrganization = async (
  data: CreateOrgRequest
): Promise<CreateOrgResponse> => {
  return post<CreateOrgResponse, CreateOrgRequest>("/org", data);
};

export const deleteOrganization = async (
  orgId: string,
  data: DeleteOrgRequest
): Promise<DeleteOrgResponse> => {
  return del<DeleteOrgResponse>(`/org/${orgId}`, {
    data,
  });
};

export const updateOrganization = async (
  orgId: string,
  data: UpdateOrgRequest
): Promise<UpdateOrgResponse> => {
  return patch<UpdateOrgResponse, UpdateOrgRequest>(`/org/${orgId}`, data);
};
