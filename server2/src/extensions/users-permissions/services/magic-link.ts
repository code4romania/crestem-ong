import jwt from "jsonwebtoken";

const MAGICLINK_SECRET = process.env.MAGICLINK_SECRET;

interface MagicTokenPayload {
  email: string;
  lang: string;
}

export const generateMagicToken = async (email: string, lang: string) => {
  const existingUser = await strapi.db
    .query("plugin::users-permissions.user")
    .findOne({
      where: { email },
    });

  if (existingUser?.provider === "google") {
    strapi.log.warn(
      `User ${email} is linked to Google account. Can't login with magic link.`
    );
    throw new Error("GoogleAccount");
  }
  if (!MAGICLINK_SECRET) throw new Error("No MAGICLINK_SECRET provided");

  return jwt.sign({ email, lang }, MAGICLINK_SECRET, { expiresIn: "20m" });
};

export const verifyMagicToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, MAGICLINK_SECRET) as MagicTokenPayload;

    return decoded;
  } catch (error) {
    const decoded = jwt.decode(token) as MagicTokenPayload;

    throw new Error("Invalid token");
  }
};
