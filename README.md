# SpaceX Launches

This app lists recent SpaceX launch data, and provides the ability to save chosen launches
to a database.

# Setup

## Docker

### Pre-requisites

Ensure that you have installed the [Docker engine] (https://docs.docker.com/get-docker/) with [Docker Compose](https://docs.docker.com/compose/install/)
See <a>https://docs.docker.com/compose/gettingstarted/</a> to get started.

### Steps

```
$ docker-compose up -d
```

Navigate to http://localhost:3000 and you should see the UI.

## Locally

### Pre-requisites

Ensure that you have installed the following:

1. [MongoDB server](https://www.mongodb.com/try/download/community)
2. [Node Version Manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

### Steps

```
# Set the mongodb url environment variable
$ echo "MONGODB_URI='mongodb://<password>:<username>@localhost:27017'" >> .env

# Install the correct node version
$ nvm install

# Run the development server
$ npm run dev
```

Navigate to http://localhost:3000 and you should see the UI.
