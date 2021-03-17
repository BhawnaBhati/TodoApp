export interface UserRecord {
  id?: number;
  username: string;
  password: string;
  created_at?: string;
  is_logged_in?: boolean;
}

export interface TaskRecord {
  id?: number;
  user_id?: number;
  name: string;
  completed: boolean;
  created_at?: string;
}
