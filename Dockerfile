# ใช้ Node.js base image เวอร์ชันล่าสุด
FROM node:22 AS builder

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ lock file มาติดตั้ง dependencies
COPY package.json package-lock.json ./

# ติดตั้ง dependencies (เฉพาะที่จำเป็นสำหรับ production)
RUN npm install --only=production

# คัดลอกโค้ดทั้งหมดเข้า container
COPY . .

# สร้าง production build
RUN npm run build

# ---- Production Image ----
FROM node:22 AS runner

WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# กำหนด Environment Variables
ENV NODE_ENV=production
ENV PORT=4200

# เปิดพอร์ต
EXPOSE 4200

# คำสั่งเริ่มต้นเมื่อ container เริ่มทำงาน
CMD ["npm", "start"]
