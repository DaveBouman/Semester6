FROM node:alpine

WORKDIR /usr/src/app

COPY tsconfig.json ./tsconfig.json
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]