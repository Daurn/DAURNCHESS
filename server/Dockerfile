FROM node:18-bullseye-slim

WORKDIR /app

RUN npm install -g pnpm

COPY server/package.json server/pnpm-lock.yaml ./

RUN pnpm install

COPY server/prisma/ ./prisma/

RUN pnpm prisma generate

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential git ca-certificates wget \
  && git clone --depth 1 https://github.com/official-stockfish/Stockfish.git /tmp/stockfish \
  && cd /tmp/stockfish/src \
  && make build ARCH=x86-64-sse41-popcnt \
  && cp /tmp/stockfish/src/stockfish /usr/local/bin/stockfish \
  && rm -rf /tmp/stockfish \
  && apt-get remove --purge -y git build-essential wget \
  && apt-get autoremove -y \
  && apt-get clean

COPY server/ .

EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run dev"]
