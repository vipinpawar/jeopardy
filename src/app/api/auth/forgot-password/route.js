import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";


export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log(email);
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // 1️ Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2️ Generate secure token & expiry (30 mins)
    
    const resetToken = jwt.sign({ email:user.email },process.env.JWT_SECRET,  { expiresIn: "30m" });


    // 4️ Send reset email with Brevo
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`;

    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "Jeopardy Quiz Team", email: "pawarvipin14@gmail.com" },
        to: [{ email:email }],
        subject: "Reset Your Password",
        htmlContent: `
          <h1>Reset Your Password</h1>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;">Reset Password</a>
          <p>This link will expire in 30 minutes.</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorData = await emailRes.json();
      return NextResponse.json({ message: "Failed to send email", error: errorData }, { status: 500 });
    }

    return NextResponse.json({ message: "Reset email sent!" }, { status: 200 });

  } catch (error) {
    console.error("Error in password reset:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
