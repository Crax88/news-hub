FROM node:16 as development

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY frontend/package*.json ./

USER node

RUN npm ci

COPY --chown=node:node frontend/. .

EXPOSE 3000

CMD ["npm", "run", "dev"]