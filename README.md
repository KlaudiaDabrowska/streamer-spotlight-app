# Streamer Spotlight Application

The Streamer Spotlight Application is a simple application that allows users to add their favorite streamers and interact with them. This README provides information on how to run the application using docker-compose, as well as details on its functionality and configuration.

---

## Requirements

To run the Streamer Spotlight Application using docker-compose, you need to have the following tools installed on your system:

1. Docker
2. Docker Compose

**Running the Application**
To run the Streamer Spotlight Application, follow these steps:

```sh

# Clone this repository
$ git clone https://github.com/KlaudiaDabrowska/streamer-spotlight-app

# Go into the repository
$ cd streamer-spotlight-app

# Run the application using docker-compose:
$ docker-compose up -d

```

## Testing

The Streamer Spotlight Application includes tests for both the client and server components. To run the tests, use the following command:

```sh

$ npm run test

```

Both client and server tests can be executed independently within their respective directories.

### Continuous Integration with GitHub Actions

The Streamer Spotlight Application is integrated with GitHub Actions for automated testing. Each time a commit is pushed to the main branch or pull requests are created, the tests are automatically triggered. The GitHub Actions workflow configuration can be found in the repository's .github/workflows directory.

## Project Structure

The Streamer Spotlight Project has the following directory structure:

.
├── .github
│ ├── workflows
│ ├── client.yml
│ └── server.yml
├── client
│ ├── Dockerfile
│ └── ...
├── server
│ ├── Dockerfile
│ └── ...
├── docker-compose.yml
└── README.md
