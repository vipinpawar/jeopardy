import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request) {
  try {
    const body = await request.json();

    const validated = contactSchema.safeParse(body);
    if (!validated.success) {
      return Response.json(
        { message: "Validation failed", errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Prepare Brevo API Request
    const brevoResUser = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Jeopardy Quiz Game", email: "pawarvipin14@gmail.com" },
        to: [{ email: email }],
        templateId: parseInt(process.env.BREVO_USER_TEMPLATE_ID),
        params: {
          NAME: name,
          MESSAGE: message,
        },
      }),
    });

    const brevoResAdmin = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Jeopardy Quiz Game", email: "pawarvipin14@gmail.com" },
        to: [{ email: process.env.ADMIN_EMAIL }],
        templateId: parseInt(process.env.BREVO_ADMIN_TEMPLATE_ID),
        params: {
          NAME: name,
          EMAIL: email,
          MESSAGE: message,
        },
      }),
    });

    if (!brevoResUser.ok || !brevoResAdmin.ok) {
      return Response.json({ message: "Failed to send emails" }, { status: 500 });
    }

    return Response.json({ message: "Emails sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}
