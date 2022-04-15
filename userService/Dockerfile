FROM node as build

WORKDIR /src/

COPY tsconfig.json ./tsconfig.json
COPY package.json ./package-lock.json /src/

RUN  npm ci --silent

EXPOSE 3000

COPY . .

USER node
CMD npm run dev