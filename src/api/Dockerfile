FROM node:16-alpine

WORKDIR /src

#Copies Reveal-Core-Unit Repo to WORKDIR
COPY . .

# Install OpenSSL
RUN apk add openssl

RUN npm ci

EXPOSE 4000

CMD [ "npm", "run","dev"]
