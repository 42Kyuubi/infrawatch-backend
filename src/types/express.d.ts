import { User } from "../interface/User"; 
declare global {
  namespace Express {
    export interface Request {
      user?: User; 
        }
  }
}