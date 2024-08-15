FROM cypress/browsers:node-20.16.0-chrome-127.0.6533.88-1-ff-128.0.3-edge-127.0.2651.74-1

WORKDIR /e2e

COPY ./package.json ./
COPY ./cypress.config.js ./
COPY ./cypress ./cypress
COPY ./pages-instance.js ./

RUN npm install && \
    npx cypress info

ENTRYPOINT [ "npm", "run", "test:stg" ]
