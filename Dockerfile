FROM --platform=linux/amd64 node:18-alpine as build

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY --link . .

ENV AWS_REGION=us-east-2
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

RUN apk add --no-cache pandoc
RUN npm run build

EXPOSE 3000

CMD ["node","build/index.js"]
