FROM maven:3.8.5-openjdk-17-slim AS mvnBuild
ADD . /crestem-ong
RUN mvn -ntp -f /crestem-ong/pom.xml clean package -DskipTests

FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=mvnBuild /crestem-ong/frontend/package.json ./
COPY --from=mvnBuild /crestem-ong/frontend/package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=mvnBuild /crestem-ong/frontend/target/generated-sources ./target/generated-sources
COPY frontend .
RUN yarn build


FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=mvnBuild /crestem-ong/frontend/.env.local ./.env.local
COPY --from=mvnBuild /crestem-ong/frontend/next.config.js ./next.config.js
COPY --from=mvnBuild /crestem-ong/frontend/next-i18next.config.js ./next-i18next.config.js
COPY --from=mvnBuild /crestem-ong/frontend/tailwind.config.js ./tailwind.config.js
COPY --from=mvnBuild /crestem-ong/frontend/tsconfig.json ./tsconfig.json
COPY --from=mvnBuild /crestem-ong/frontend/target/generated-sources ./target/generated-sources

EXPOSE 3000

ENV PORT 3000
CMD npm run start