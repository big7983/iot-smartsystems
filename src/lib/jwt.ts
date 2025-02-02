import { SignJWT, jwtVerify, JWTPayload } from "jose";

const secretKey = new TextEncoder().encode("big7983");

// ✅ สร้าง JWT
export async function generateToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);
}

// ✅ ตรวจสอบ JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
