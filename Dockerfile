FROM --platform=linux/amd64 node:18-alpine as build
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

ENV AWS_REGION=us-east-2
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

RUN echo "AWS_REGION: $AWS_REGION"
RUN echo "AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID"
RUN echo "AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY"

RUN npm run build --verbose

RUN apk add --no-cache nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD sh -c "nginx && node build"
