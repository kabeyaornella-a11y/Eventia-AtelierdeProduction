FROM node:20-slim

RUN npm install -g pnpm@10

WORKDIR /app

# Copie tout le monorepo
COPY . .

# Installation sans vérification du lockfile
RUN pnpm install --no-frozen-lockfile

# Build de l'API server uniquement
RUN pnpm --filter @workspace/api-server run build

ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
