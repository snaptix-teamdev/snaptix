# Устанавливаем зависимости
FROM node:20.11-alpine AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest-10 --activate
RUN pnpm install --frozen-lockfile

# Билдим приложение
FROM node:20.11-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN corepack enable && corepack prepare pnpm@latest-10 --activate
RUN pnpm run build:production

# Стейдж запуска
FROM node:20.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ENV UNDICI_SOCKET_TIMEOUT=40000
ENV UNDICI_BODY_TIMEOUT=40000
ENV NEXT_JS_FETCH_TIMEOUT=40000

# Копируем всё из билдера
COPY --from=builder /app/ ./

# ВАЖНО: Включаем pnpm ДО смены пользователя
RUN corepack enable && corepack prepare pnpm@latest-10 --activate

# 🔥 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Создаем кэш директорию и даем права
RUN mkdir -p .next/cache/images && \
    chown -R node:node .next

# Переключаемся на non-root пользователя
USER node

EXPOSE 3000

# Запускаем
CMD ["pnpm", "start"]