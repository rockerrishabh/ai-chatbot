type Props = {
  name: string;
  email: string;
  method: "Forgot Password" | "Verify Email";
  verificationToken: string;
};

export function verificationTemplate({
  name,
  email,
  method,
  verificationToken,
}: Props) {
  if (method === "Verify Email") {
    const verificationLink = process.env.APP_URL
      ? `${process.env.APP_URL}/auth/verify?token=${verificationToken}`
      : `http://localhost:3000/auth/verify?token=${verificationToken}`;
    const subject = `Verify your email - ${name}`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 5px;
            background-color: #f5f5f5;
        }
        a {
            text-decoration: none;
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Dear ${name}</h1>
        <p>Welcome to AI ChatBot!</p>
        <p>Thank you for signing up. To complete your registration and start enjoying the benefits of your account, please verify your email address.</p>
        <p>Click the button below to confirm your email:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px;">Verify Email Address</a>
        <p>If you can't click the button, please copy and paste the following link into your web browser:</p>
        <p>${verificationLink}</p>
        <p>This link will expire in 24 hours. If you don't verify your email within 24 hours, you'll need to request a new verification link.</p>
        <p>Thanks,</p>
        <p>The AI ChatBot Team</p>
    </div>
</body>
</html>
`;
    return {
      email,
      subject,
      html,
    };
  } else {
    const forgotPasswordLink = process.env.APP_URL
      ? `${process.env.APP_URL}/auth/reset-password?token=${verificationToken}`
      : `http://localhost:3000/auth/reset-password?token=${verificationToken}`;
    const subject = `Reset your password - ${name}`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 5px;
            background-color: #f5f5f5;
        }
        a {
            text-decoration: none;
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Dear ${name}</h1>
        <p>Welcome to AI ChatBot!</p>
        <p>Oops you forgot your password. To complete the password reset and start enjoying the benefits of your account, please reset your password.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${forgotPasswordLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px;">Reset Password</a>
        <p>If you can't click the button, please copy and paste the following link into your web browser:</p>
        <p>${forgotPasswordLink}</p>
        <p>This link will expire in 24 hours. If you don't reset your password within 24 hours, you'll need to request a new password reset link.</p>
        <p>Thanks,</p>
        <p>The AI ChatBot Team</p>
    </div>
</body>
</html>
`;
    return {
      email,
      subject,
      html,
    };
  }
}
