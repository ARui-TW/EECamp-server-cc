FROM node:17.4

WORKDIR /app

COPY . .

RUN npm i --only=prod

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "start" ]

