import { db } from "@/db";
import { sendMail } from "@/lib/mailer";
import { verificationTemplate } from "@/mail/mailTemplate";
import { passwordResetTokens } from "@/schemas/dbSchema";
import { eq } from "drizzle-orm";

export const generatePasswordResetToken = async (
  name: string,
  email: string
) => {
  const verificationToken = crypto.randomUUID();
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });

  if (existingToken) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.email, email));
  }

  const {
    html,
    subject,
    email: to,
  } = verificationTemplate({
    name,
    email,
    verificationToken,
    method: "Forgot Password",
  });

  await db.insert(passwordResetTokens).values({
    id: crypto.randomUUID(),
    email,
    token: verificationToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  const res = await sendMail({ html, subject, to });
  return res;
};
