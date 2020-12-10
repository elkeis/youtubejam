FROM node:14.15.1-alpine

# Installing ffmpeg
RUN apk update
RUN apk add --update ffmpeg

# Installing Bash for tech needs
RUN apk add --update bash
