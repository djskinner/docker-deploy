# docker-deploy

> npm script to build, tag and push a Docker image.

Use this script to build and tag an image based on the version in your project's `package.json` then push it to the registry. 

## Install

```shell
npm i docker-deploy --save-dev
```

## Setup

Add a config.docker entry in your `package.json` and simply specify the name of your docker image. For example:

```
  "config": {
    "docker": {
      "imageName": "YOUR_DOCKERHUB_NAME/image-name"
    }
  },
```
Add docker-deploy as an npm scriot in your `package.json`

```
  "scripts": {
    "deploy": "docker-deploy",
  }
```
## Usage

Assumes you have a `Dockerfile` in the project root.

When you are ready to build and push a new image, for example after using [commit-release](https://github.com/JamieMason/commit-release), simply run:

```shell
npm run deploy
```
