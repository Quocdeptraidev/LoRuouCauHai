# --- Giai đoạn 1: Build Frontend ---
FROM node:20-alpine AS build

WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm ci

# Sao chép toàn bộ source code
COPY . .

# Build ứng dụng (Vite sẽ build ra thư mục dist)
RUN npm run build

# --- Giai đoạn 2: Serve bằng Nginx ---
FROM nginx:alpine

# Copy file cấu hình nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output từ giai đoạn 1 vào thư mục static của nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
