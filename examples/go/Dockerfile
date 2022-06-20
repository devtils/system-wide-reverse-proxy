FROM golang:alpine

RUN mkdir -p /usr/src/{client,server}
COPY client /usr/src/client
COPY server /usr/src/server

WORKDIR /usr/src/server
EXPOSE 80
CMD ["go", "run", "."]
