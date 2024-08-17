FROM cypress/browsers:node-20.16.0-chrome-127.0.6533.88-1-ff-128.0.3-edge-127.0.2651.74-1

WORKDIR /e2e

COPY . ./

RUN npm install

ENTRYPOINT [ "npm", "run", "run:docker" ]
