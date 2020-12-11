start: 
	docker run \
	-v `pwd`/be:/usr/src/app \
	-w /usr/src/app \
	--expose 4000 \
	node-ffmpeg ash -c "pwd && yarn && yarn start"

dev: 
	docker run -it \
	-v `pwd`/be:/usr/src/app \
	-w /usr/src/app \
	-p 4000:4000 \
	node-ffmpeg ash -c "pwd && yarn && yarn dev"

debug: 
	docker run -it \
	-v `pwd`/be:/usr/src/app \
	-w /usr/src/app \
	-p 4000:4000 -p 9229:9229 \
	--cpu-shares="300" \
	--cpus="2.0" \
	node-ffmpeg ash -c "pwd && yarn && yarn debug"

docker: 
	docker build -t elkeis/youtubejam-node-ffmpeg .