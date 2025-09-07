 import twilio, { Twilio } from "twilio";

export class TwilioProvider {
  private client: Twilio;

  constructor(accountSid: string, authToken: string, private from: string) {
    this.client = twilio(accountSid, authToken);
  }

  async send(to: string, body: string) {
    const msg = await this.client.messages.create({
      from: this.from,
      to,
      body,
    });
    return { id: msg.sid };
  }
}
