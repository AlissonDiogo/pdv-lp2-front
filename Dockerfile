FROM node:16 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
# RUN npm run dev
EXPOSE 5000

FROM nginx:1.19-alpine
COPY --from=build /app/public /usr/share/nginx/html