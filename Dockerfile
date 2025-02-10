# ใช้ node เวอร์ชัน Alpine (เล็กและเร็ว)
FROM node:22.11.0-alpine

# ตั้งค่า Work Directory
WORKDIR /app

# คัดลอก package.json และ lock file ก่อนติดตั้ง dependencies
COPY package.json package-lock.json ./

# ติดตั้ง dependencies ก่อน เพื่อใช้ Docker caching
RUN npm install

# คัดลอกโค้ดทั้งหมดลง container
COPY . .

# สร้างโปรเจค (build Next.js)
RUN npm run build

# เริ่มรันแอป (Next.js ใช้ `next start` แทน `npm start`)
CMD ["npm", "run", "start"]