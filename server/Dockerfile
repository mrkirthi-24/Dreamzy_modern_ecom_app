
ARG NODE_VERSION=18.17.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm ci
RUN npx tsc

FROM node:${NODE_VERSION}-slim
WORKDIR /app
COPY package*.json ./
COPY --from=base ./app/dist ./dist
RUN npm ci --production
COPY . .
EXPOSE 8080
CMD [ "node", "dist/index.js" ]