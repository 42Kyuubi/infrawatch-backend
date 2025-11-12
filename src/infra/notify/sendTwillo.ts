import twilio, { Twilio } from 'twilio';
import 'dotenv/config';

 
const accountSid = 'AC9205702a72eb2b6342ecdd6472d39746';
const authToken = "79ae3b11281e704d17415b8e6ee63d9d";
const fromNumber = '+15417968794';
 
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
