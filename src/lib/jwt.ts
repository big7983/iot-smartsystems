import { SignJWT, jwtVerify, JWTPayload } from "jose";
import * as crypto from "crypto";

// สร้าง Secret Key เป็น Buffer
const secretKey = crypto.createHmac("sha256", "246cf1eea930796569d31ea89beaad1ae889e5604a7552b24e90ef78bc9e3446").digest();

// ✅ ฟังก์ชันสร้าง JWT
export async function generateToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);
}

// ✅ ฟังก์ชันตรวจสอบ JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
