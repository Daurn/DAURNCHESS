FROM node:18-bullseye-slim

WORKDIR /app

RUN npm install -g pnpm

COPY server/package.json server/pnpm-lock.yaml ./

RUN pnpm install

COPY server/prisma/ ./prisma/

RUN pnpm prisma generate

COPY server/ .

EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run dev"]
