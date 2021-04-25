## CONTAINER VARS ##
USERNAME_LOCAL   ?= "$(shell whoami)"
UID_LOCAL        ?= "$(shell id -u)"
GID_LOCAL        ?= "$(shell id -g)"
CONTAINER_NAME   = $(PROJECT_NAME)_backend
IMAGE_BUILD      = node:12.16.1-alpine3.9

up: ##@Local Start the project
	export IMAGE_DEV="$(IMAGE_BUILD)" && CONTAINER_NAME="$(CONTAINER_NAME)" && \
		docker-compose -p $(PROJECT_NAME) up -d
	@make log

down: ##@Local Destroy the project
	@docker-compose -p $(PROJECT_NAME) down

log: ##@Local Show project logs
	@docker logs -f $(CONTAINER_NAME)

ssh: ##@Local Access the docker container
	@docker container run -it --rm \
	-u ${UID_LOCAL}:${GID_LOCAL} \
	-v "${PWD}/${APP_DIR}":/${APP_DIR} \
	$(IMAGE_BUILD) bash

remove: ##@Local remove container
	@docker-compose rm -v

development: up log ##@Local Prepare the project for development
	@echo "The development environment is ready and running"