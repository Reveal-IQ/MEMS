##FOR DEV
FROM node:16.15.0-alpine

WORKDIR /src

#Copies Client Repo to WORKDIR
COPY . .

# Install Node Modules
RUN npm ci

#Assign Entry Point
CMD [ "npm", "run","serve" ]

#Expose Ports
EXPOSE 8080

##FOR PRODUCTION
# FROM caddy:2.4.6-alpine

# WORKDIR /src
# COPY /dist/ /srv/
# EXPOSE 80