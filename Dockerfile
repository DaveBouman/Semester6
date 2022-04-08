FROM node:16 as build

WORKDIR /src/

COPY package.json package-lock.json /src/

RUN  npm ci --silent

COPY . .

FROM node:16 as dev

WORKDIR /src/

COPY --from=build /src/node_modules node_modules

USER node

CMD npm run dev