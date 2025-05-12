FROM golang:1.24-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main main.go

FROM alpine:3.21
WORKDIR /app
COPY --from=builder /app/main .
ENV PORT=8080
EXPOSE 8080
CMD [ "./main" ]