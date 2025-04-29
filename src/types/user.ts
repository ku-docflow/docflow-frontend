export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  profile_image?: string;
  online?: boolean;
}

export interface InitUserRequest {}

export interface InitUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  orgs: Organization[];
}

export interface Organization {
  id: string;
  name: string;
  email: string;
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
  name: string;
  chatroom_id: string | null;
  online: boolean;
}
