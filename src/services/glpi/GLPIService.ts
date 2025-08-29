/**
 *
 */
type Ticket = {
    name: string;
    content: string;
    status: 1;
    urgency: 4; // High urgency
    impacted: 4; // High impact
}

/**
 *
 */
export class GLPIService {
    /** returns session token, null otherwise
     * @param appToken
     * @param userToken
     * @param apiUrl
     */
    static async getSessionToken(appToken: string, userToken: string, apiUrl: string): Promise<string | null> {
        try{
            const response = await fetch(`$apiUrl/initSession`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'App-Token': appToken,
                    'Authorization': `user_token $userToken`,
                }
            });
            if (response.ok)
                return ((await response.json()) as {sessionToken: string}).sessionToken
            throw new Error(response.statusText);
        }
        catch(err){
            console.error(err);
            return null;
        }
    }

    /**
     *
     * @param appToken
     * @param sessionToken
     * @param apiUrl
     * @param name {string} Title of the ticket
     * @param content {string} Description of the ticket
     */
    static async openTicket(appToken:string, sessionToken:string, apiUrl:string, name: string, content: string): Promise<boolean> {
        let status = 1; // status new
        let urgency = 4; // High urgency
        let impact = 4; // High impact
        let data = {
            "input" : {
                "name": name,
                "content": content,
                "status": status,
                "urgency": urgency,
                "impact": impact,
            }
        };
        try{
            const response = await fetch(`$apiUrl/Ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'App-Token': appToken,
                    'Session-Token': sessionToken,
                },
                body: JSON.stringify(data),
            });
            if (response.ok)
                return true
            throw new Error(response.statusText);
        }
        catch(err){
            console.error(err);
            return false;
        }
    }

    static async getTickets(appToken:string, sessionToken:string, apiUrl: string): Promise<string|null>{
        try{
            const response = await fetch(`$apiUrl/Ticket`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'App-Token': appToken,
                    'Session-Token': sessionToken,
                },
            });
            if (response.ok)
                return response.json();
            throw new Error(response.statusText);
        }
        catch(err){
            console.error(err);
            return null;
        }
    }

    static async closeSession(appToken:string, sessionToken: string, apiUrl: string): Promise<void> {
        try{
            const response = await fetch(`$apiUrl/killSession`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'App-Token': appToken,
                    'Session-Token': sessionToken,
                }
            });
            if (!response.ok)
                throw new Error(response.statusText);
        }
        catch(err){
            console.error(err);
        }
    }
}