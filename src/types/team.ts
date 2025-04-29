export interface CreateTeamRequest {
  name: string;
  email: string;
  organization_id: number;
}

export interface CreateTeamResponse {
  success: boolean;
  team_id: number;
}

export interface JoinTeamRequest {
  team_id: string;
}

export interface JoinTeamResponse {
  success: boolean;
}

export interface DeleteTeamRequest {}

export interface DeleteTeamResponse {
  success: boolean;
}
