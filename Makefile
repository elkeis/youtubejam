start: 
	docker-compose up
docker: 
	docker build -t elkeis/youtubejam-node-ffmpeg .

test-be: 
	docker run -it \
	-v `pwd`/be:/usr/src/app \
	-w /usr/src/app \
	-p 4000:4000 -p 9229:9229 \
	elkeis/youtubejam-node-ffmpeg:latest ash -c "yarn test --watchAll"

debug: 
	docker run -it \
	-v `pwd`/be:/usr/src/app \
	-w /usr/src/app \
	-p 4000:4000 -p 9229:9229 \
	--cpu-shares="300" \
	--cpus="2.0" \
	elkeis/youtubejam-node-ffmpeg:latest ash -c "pwd && yarn && yarn debug"
