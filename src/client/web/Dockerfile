FROM caddy:2-alpine

#Copy Caddy File
COPY /Caddyfile /etc/caddy/Caddyfile

#Copy Build Files
COPY /dist /srv

EXPOSE 80
EXPOSE 443/tcp
EXPOSE 443/udp
