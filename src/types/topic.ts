export interface Topic {
  id: number;
  organization_id: number;
  title: string;
  created_at: string;
}

export interface CreateTopicRequest {
  organization_id: number;
  title: string;
}

export type CreateTopicResponse = Topic;

export type GetTopicByIdRequest = void;
export type GetTopicByIdResponse = Topic;

export type GetTopicsByOrgRequest = void;
export type GetTopicsByOrgResponse = Topic[];
