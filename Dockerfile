FROM --platform=linux/amd64 node:18-alpine as build
WORKDIR /app
COPY package*.json .

RUN npm ci
COPY . .

ENV AWS_REGION=us-east-2

RUN npm run build

# Runtime stage
FROM --platform=linux/amd64 node:18-alpine

RUN apk add --no-cache nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app /app

WORKDIR /app

EXPOSE 80

CMD sh -c "nginx && node build"
