# YoutubeJam App

minimalistic youtube-like app. 

## Start using Docker

This app requires ffmpeg installed so it is wrapped in docker images. 
If you have docker installed, just run `docker-compose up`.

## How it works

Frontend - is simple create-react-app app. Hosted in development mode on `localhost:3000`
using proxy which bypass all data to `be:4000` - which is running docker container – API endpoint and video-hosting at the same time. 

Both machines living in internal bridge network. where is `be:4000` - is legal. Anyway you can touch API via curl to `localhost:4000` or debug node.js code using Chrome. 

