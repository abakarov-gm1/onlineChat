up:
	docker-compose up -d
down:
	docker-compose down



build: build-client build-api

build-api:
	docker build --file=api/docker/dev/Dockerfile --tag=${REGISTRY}/online-chat:api-fast-${IMAGE_TAG} api
	docker build --file=api/docker/nginx/Dockerfile --tag=${REGISTRY}/online-chat:api-${IMAGE_TAG} api

build-client:
	docker build --file=client/docker/prod/Dockerfile --tag=${REGISTRY}/online-chat:client-${IMAGE_TAG} client


#docker push gadji1/online-chat:tagname


push: push-client push-api


push-client:
	docker push ${REGISTRY}/online-chat:client-${IMAGE_TAG}

push-api:
	docker push ${REGISTRY}/online-chat:api-${IMAGE_TAG}
	docker push ${REGISTRY}/online-chat:api-fast-${IMAGE_TAG}