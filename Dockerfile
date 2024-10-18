# Build stage
FROM --platform=linux/amd64 node:18-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY --link . .
RUN apk add --no-cache pandoc

RUN npm run build

# Runtime stage
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/package*.json .
COPY --from=build /app/static static/
RUN npm ci --production
EXPOSE 3000
CMD ["node", "build/index.js"]
