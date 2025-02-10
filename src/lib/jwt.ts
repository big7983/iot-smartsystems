import { SignJWT, jwtVerify, JWTPayload } from "jose";

// ✅ สร้าง JWT
export async function generateToken(payload: JWTPayload) {
  const secretKey = new TextEncoder().encode("246cf1eea930796569d31ea89beaad1ae889e5604a7552b24e90ef78bc9e3446");

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);
}

// ✅ ตรวจสอบ JWT
export async function verifyToken(token: string) {
  const secretKeyen = new TextEncoder().encode("246cf1eea930796569d31ea89beaad1ae889e5604a7552b24e90ef78bc9e3446");

  try {
    const { payload } = await jwtVerify(token, secretKeyen);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
