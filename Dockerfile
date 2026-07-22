FROM node:20-slim

RUN npm install -g pnpm@10

WORKDIR /app

# Copie tout le monorepo
COPY . .

# Supprime le lockfile pour éviter ERR_PNPM_LOCKFILE_CONFIG_MISMATCH
# pnpm en génère un propre compatible avec cet environnement
RUN rm -f pnpm-lock.yaml && pnpm install

# Build de l'API server uniquement
RUN pnpm --filter @workspace/api-server run build

ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
