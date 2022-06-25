FROM node:16.3.0-alpine3.16.0


WORKDIR /app
COPY package*.json ./
RUN  yarn 
COPY . .

EXPOSE 30002

CMD ["yarn", "start"]