FROM node:20-alpine As base

RUN npm i --global --no-update-notifier --no-fund pnpm

FROM base as dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

FROM base as build

ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_USER
ARG SMTP_PASSWORD

ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASSWORD=$SMTP_PASSWORD

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

RUN adduser --system --uid 1001 nuxt

COPY --from=build --chown=nuxt:node /app/.output ./

USER nuxt

EXPOSE 3000

CMD ["node", "server/index.mjs"]
