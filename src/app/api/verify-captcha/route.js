export async function POST(request) {
  try {
    const body = await request.json();
    const { captchaToken } = body;

    console.log("Request Body:", body);  
    console.log("Captcha Token:", captchaToken); 

    if (!captchaToken) {
      console.error("No CAPTCHA token provided");
      return Response.json({ message: "No CAPTCHA token provided" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    console.log("Secret Key:", secretKey); 

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY not found");
      return Response.json({ message: "Server configuration error" }, { status: 500 });
    }

    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', captchaToken);

    console.log("Sending request to Google reCAPTCHA API..."); 

    const captchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const captchaData = await captchaResponse.json();

    console.log("Google reCAPTCHA response:", captchaData); 

    if (!captchaData.success) {
      console.error("CAPTCHA verification failed:", captchaData);
      return Response.json({ message: "CAPTCHA verification failed" }, { status: 400 });
    }

    return Response.json({
      message: "CAPTCHA verified successfully",
    });
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    return Response.json(
      { message: "Server error during CAPTCHA verification" },
      { status: 500 }
    );
  }
}
