FROM node:14.16.0-alpine3.13

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json ./
RUN  yarn 
COPY . .

EXPOSE 30002

CMD ["yarn", "start"]