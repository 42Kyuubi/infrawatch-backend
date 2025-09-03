import axios from "axios";
import supabase from "../supabase/connect";

const CONTENT_TYPE = "application/json";
const APP_TOKEN_HEADER = "App-Token";
const AUTH_HEADER = "Authorization";
const AUTH_SESSION_ENDPOINT = "initSession/";
const SESSION_TOKEN_HEADER = "Session-Token";
const TICKET_ENDPOINT = "Ticket";
const KILL_SESSION_ENDPOINT = "killSession";
 
export async function createTicket(ticketData:any) {

     const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("type", "GLPI")
    .single();  

  if (error) {
    console.error("Erro ao buscar integração:", error);
    return null;
  }

 let sessionToken;
 let apiUrl = data.API_URL;
 let appToken = data.APP_TOKEN; 
 let authToken = data.AUTH_TOKEN;

  try {
    console.log("### Getting Session Token ###");
    const headersAuth = {
      "Content-Type": CONTENT_TYPE,
      [APP_TOKEN_HEADER]: appToken,
      [AUTH_HEADER]: `user_token ${authToken}`,
    };

    const sessionRes = await axios.get(apiUrl + AUTH_SESSION_ENDPOINT, {
      headers: headersAuth,
    });
    sessionToken = sessionRes.data.session_token;
    console.log("Retrieved Session Token:", sessionToken);

 
    const headers = {
      "Content-Type": CONTENT_TYPE,
      [SESSION_TOKEN_HEADER]: sessionToken,
      [APP_TOKEN_HEADER]: appToken,
    };

    const payload = {
      input: {
        name: ticketData.name,
        content: ticketData.content,
        status: ticketData.status || 1,
        urgency: ticketData.urgency || 4,
        impact: ticketData.impact || 4,
      },
    };

    const createRes = await axios.post(apiUrl + TICKET_ENDPOINT, payload, {
      headers,
    });
    console.log("Ticket Created:", createRes.data);

 
    const ticketsRes = await axios.get(apiUrl + TICKET_ENDPOINT, { headers });
    console.log("Tickets:", JSON.stringify(ticketsRes.data, null, 2));

 
    console.log(`### Killing actual session (${sessionToken}) ###`);
    const killRes = await axios.get(apiUrl + KILL_SESSION_ENDPOINT, {
      headers,
    });
    console.log("Session Killed:", killRes.data);

    return createRes.data;
  } catch (error:any) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
}
