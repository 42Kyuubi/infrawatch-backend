type EventType = "login" | "logout" | "error" | "update" | "create" | "delete";

export interface Log {     
  id?:string;    
  system_id?: string | undefined;  
  user_id?: string | undefined; 
  event_type: EventType; 
  description?: string | {};  
  company_id:string | undefined
}
