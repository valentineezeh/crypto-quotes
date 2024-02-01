FROM --platform=linux/amd64 node:16.20.2-alpine AS base
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 4000
COPY . /app
ENTRYPOINT ["npm", "start"]