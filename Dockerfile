# --- ESTÁGIO 1: Instalação de dependências ---
FROM node:20-alpine AS deps
# Adicionando libc6-compat caso precise de binários nativos no Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia apenas os arquivos de pacotes para aproveitar o cache de camadas do Docker
COPY package.json package-lock.json ./
RUN npm ci

# --- ESTÁGIO 2: Build da aplicação ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Captura a variável enviada pelo GitHub Actions e expõe no ambiente de Build
ARG RESEND_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY

# Variável de ambiente para desativar a telemetria do Next.js no build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- ESTÁGIO 3: Imagem final de execução (Runner) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criando um usuário do sistema para não rodar o container como root (Boa prática de segurança/SRE)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# O Next.js gera um output otimizado na pasta .next/standalone quando configurado
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Executa o servidor otimizado do Next.js
CMD ["node", "server.js"]