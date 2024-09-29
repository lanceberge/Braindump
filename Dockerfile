FROM --platform=linux/amd64 node:18-alpine as build
WORKDIR /app
COPY package*.json .

RUN npm ci
COPY . .

RUN npm run build

# Runtime stage
FROM nginx:1.21-alpine
RUN apk add --no-cache nodejs

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

WORKDIR /app
# EXPOSE 80

CMD nginx && node index.js
