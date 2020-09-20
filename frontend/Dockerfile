FROM node AS builder

WORKDIR /web

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# ---

FROM alpine

WORKDIR /web

COPY --from=builder /web/out .

RUN mkdir /web_export

CMD cp -r /web/* /web_export