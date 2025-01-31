# ใช้ Node.js base image สำหรับ build
FROM node:22 AS build-stage

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ lock file เพื่อติดตั้ง dependencies ก่อน
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดเข้า container
COPY . .

# สร้างไฟล์ build ของ Next.js
RUN npm run build

# -- Production Stage --
FROM node:22 AS production-stage

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก build-stage
COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/package-lock.json ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/node_modules ./node_modules

# กำหนดค่า Environment Variables
ENV PORT=4200

# เปิดพอร์ตที่ใช้
EXPOSE 4200

# คำสั่งเริ่มต้น
CMD ["npm", "start"]
