import twilio, { Twilio } from 'twilio';
import 'dotenv/config';

 
const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const fromNumber = process.env.TWILIO_PHONE_NUMBER || '';
  
const client: Twilio = twilio(accountSid, authToken);

 
export async function enviarSMS(mensagem: string): Promise<void> {
  try {
    const response = await client.messages.create({
      body: mensagem,
      from: fromNumber,
      to: '+244948576070',
    });

    console.log('✅ Mensagem enviada com sucesso! SID:', response.sid);
  } catch (error: any) {
    console.error('❌ Erro ao enviar SMS:', error.message || error);
  }
}
