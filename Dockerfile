FROM node:12.18.2 as build

WORKDIR /workdir

COPY package.json package-lock.json ./

RUN npm install
COPY babel.config.js tsconfig.json vue.config.js ./
COPY public public 
COPY src src
COPY tests tests

RUN npm run lint
RUN npm run build
RUN npm run test:unit

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workdir/dist /usr/share/nginx/html

