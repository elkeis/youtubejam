# YoutubeJam App

minimalistic youtube-like app. 

## Start using Docker

This app requires ffmpeg installed so it is wrapped in docker images. 
If you have docker installed, just run `docker-compose up`.

*ATTENTION: It takes about 15 minutes for the first start*  

## How it works

Frontend - is simple create-react-app app. Hosted in development mode on `localhost:3000`
using proxy which bypass all data to `be:4000` - which is running docker container – API endpoint and video-hosting at the same time. 

Both machines living in internal bridge network. where is `be:4000` - is legal. Anyway you can touch API via curl to or debug node.js code using Chrome. 

- [App](http://localhost:3000)
- [Backend API](http://localhost:4000)
- [Database UI](http://localhost:8081)

