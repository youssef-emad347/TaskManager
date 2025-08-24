import crypto from "crypto";

export default () => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");
    return { resetToken, hashed, expiresIn: Date.now() + 10 * 60 * 1000 };
};
