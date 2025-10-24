# Stage 1: Build Angular app
FROM node:20 AS builder
WORKDIR /app

# Copy this file separately to leverage
# Docker layer caching
COPY package*.json ./
RUN npm install

COPY . .

# -- --project frontend --configuration production: Uses for Angular CLI
# frontend is the project name. 
RUN npm run build -- --project frontend --configuration production

# Stage 2: serve app using Nginx
FROM nginx:alpine

# The build app will be copied on the nginx directory
COPY --from=builder /app/dist/frontend/browser/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]