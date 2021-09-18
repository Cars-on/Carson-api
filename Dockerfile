FROM node:14.17.1-alpine3.13

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]
