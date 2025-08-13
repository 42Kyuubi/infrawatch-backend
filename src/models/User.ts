export interface User{
  id?:string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDTO {
  id: string;
  name: string;
  role: string;
  created_at: string;
  user: {
    id: string;
    email: string;
    display_name: string;
  };
}