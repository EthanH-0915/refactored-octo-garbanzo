FROM node:22-alpine

WORKDIR /app

# bcrypt has a native addon that needs to be compiled on alpine;
# openssl is required for Prisma's query engine to detect libssl on musl
RUN apk add --no-cache python3 make g++ openssl

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
