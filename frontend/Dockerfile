FROM --platform=linux/amd64 node:21.6.1-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 4000
COPY . /app
ENTRYPOINT ["npm", "dev"]