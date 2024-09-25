FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD ["node","build/index.js"]
