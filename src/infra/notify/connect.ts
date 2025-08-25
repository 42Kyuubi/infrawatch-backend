import { Resend } from 'resend'; 

const resend = new Resend(process.env.RESEND_API_KEY);

export async function test() {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['alfredochivela3@gmail.com'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};