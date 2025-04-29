export interface CreateOrgRequest {
  name: string;
  email: string;
}

export interface CreateOrgResponse {
  success: boolean;
  org_id: number;
}

export interface UpdateOrgRequest {
  name: string;
  email: string;
}

export interface UpdateOrgResponse {
  success: boolean;
}

export interface DeleteOrgRequest {
  team_id: string;
}

export interface DeleteOrgResponse {
  success: boolean;
}
