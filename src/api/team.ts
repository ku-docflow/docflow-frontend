import { post, del } from "./apiClient";
import {
  CreateTeamRequest,
  CreateTeamResponse,
  DeleteTeamRequest,
  DeleteTeamResponse,
  JoinTeamRequest,
  JoinTeamResponse,
} from "../types/team";

export const createTeam = async (
  data: CreateTeamRequest
): Promise<CreateTeamResponse> => {
  return post<CreateTeamResponse, CreateTeamRequest>("/team", data);
};

export const deleteTeam = async (
  teamId: string,
  data: DeleteTeamRequest
): Promise<DeleteTeamResponse> => {
  return del<DeleteTeamResponse>(`/team/${teamId}`, {
    data,
  });
};

export const joinTeam = async (
  data: JoinTeamRequest
): Promise<JoinTeamResponse> => {
  return post<JoinTeamResponse, JoinTeamRequest>(`/team/join`, data);
};
