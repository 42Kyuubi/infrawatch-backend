export interface User{
  id?:string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDTO {
  id: string;
  username: string;
  role: string;
  created_at: string;
  user: {
    id: string;
    email: string;
    display_name: string;
  };
}