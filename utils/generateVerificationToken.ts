import { db } from "@/db";
import { sendMail } from "@/lib/mailer";
import { verificationTemplate } from "@/mail/verificationTemplate";
import { verificationTokens } from "@/schemas/dbSchema";
import { eq } from "drizzle-orm";

export const generateVerificationToken = async (
  name: string,
  email: string
) => {
  const verificationToken = crypto.randomUUID();
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.email, email));
  }

  const {
    html,
    subject,
    email: to,
  } = verificationTemplate({
    name: name,
    email,
    verificationToken,
  });

  await db.insert(verificationTokens).values({
    id: crypto.randomUUID(),
    email,
    token: verificationToken,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  const res = await sendMail({ html, subject, to });
  return res;
};
