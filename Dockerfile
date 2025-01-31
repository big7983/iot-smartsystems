# ใช้ Node.js base image เวอร์ชันล่าสุด
FROM node:22 AS builder

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ lock file มาติดตั้ง dependencies
COPY package.json yarn.lock ./

# ติดตั้ง dependencies
RUN yarn install --frozen-lockfile

# คัดลอกโค้ดทั้งหมดเข้า container
COPY . .

# สร้าง production build
RUN yarn build

# ---- Production Image ----
FROM node:22 AS runner

WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก builder stage
COPY --from=builder /app/package.json ./ 
COPY --from=builder /app/yarn.lock ./ 
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/public ./public 
COPY --from=builder /app/node_modules ./node_modules 

# กำหนด Environment Variables
ENV NODE_ENV=production
ENV PORT=4200

# เปิดพอร์ต
EXPOSE 4200

# คำสั่งเริ่มต้นเมื่อ container เริ่มทำงาน
CMD ["yarn", "start"]
