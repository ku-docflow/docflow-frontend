export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
  profile_image?: string;
  online?: boolean;
  search_bot_chatroom_id?: string;
}

export interface InitUserRequest {}

export interface InitUserResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    search_bot_chatroom_id?: string;
  };
  orgs: Organization[];
}

export interface PatchUserNameRequest {
  first_name: string;
  last_name: string;
}

export interface PatchUserNameResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  admins: string[];
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  chatroom_id: string;
  peers: Peer[];
}

export interface Peer {
  id: string;
  first_name: string;
  last_name: string;
  chatroom_id: string | null;
  online: boolean;
}
