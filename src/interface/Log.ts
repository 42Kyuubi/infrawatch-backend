type EventType = "login" | "logout" | "error" | "update" | "create" | "delete";

export interface Log {     
  id?:string | undefined;    
  system_id?: string | undefined | null;  
  user_id?: string | undefined | null; 
  event_type: EventType; 
  description?: string | {} | undefined;  
  company_id:string | undefined | null
}
