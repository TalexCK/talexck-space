FROM node:22-alpine AS build

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
# git is needed by @vuepress/plugin-git for page timestamps.
RUN apk add --no-cache git && corepack enable
WORKDIR /src
COPY . .
RUN pnpm install --frozen-lockfile && pnpm docs:build

FROM caddy:alpine

COPY --from=build /src/docs/.vuepress/dist /usr/share/caddy
