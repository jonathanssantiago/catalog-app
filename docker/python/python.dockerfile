# FROM python:3.7-alpine

# COPY ./api_catalog /src

# WORKDIR /src

# RUN pip install -r requirements.txt
# RUN pip install pymongo

# ENTRYPOINT ["python3", "/src/app.py"]

FROM alpine:3.7

RUN apk update
RUN apk upgrade
RUN apk add ca-certificates && update-ca-certificates

RUN apk add --no-cache --update tzdata

RUN apk add --no-cache python3 \
            postgresql-libs \
            postgresql-dev \
            python3-dev \
            musl-dev \
            gcc \
            libc-dev \
            libffi-dev \
            libressl-dev \
            py-cryptography

COPY ./api_catalog /src

WORKDIR /src

RUN pip3 install -r requirements.txt

ENTRYPOINT ["python3", "/src/app.py"]