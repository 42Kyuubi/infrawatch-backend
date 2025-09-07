import { Resend } from "resend";

export class ResendProvider {
  private resend: Resend;

  constructor(apiKey: string, private from: string) {
    this.resend = new Resend(apiKey);
  }

  async send(to: string, subject: string, html: string) {
    const res = await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    });
    return { id: res.data?.id || "no-id" };
  }
}
