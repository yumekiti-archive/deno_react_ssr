dc := docker compose -f ./docker/docker-compose.yml

.PHONY: init
init:
	@make bundle
	@make up

.PHONY: up
up:
	$(dc) up -d --build

.PHONY: down
down:
	$(dc) down

.PHONY: restart
restart:
	@make down
	@make up

.PHONY: rm
rm:
	$(dc) down --rmi all

.PHONY: logs
logs:
	$(dc) logs -f

.PHONY: app
app:
	$(dc) exec app /bin/sh

.PHONY: bundle
bundle:
	$(dc) run --no-deps app deno bundle ./react/client.jsx ./react/bundle.js

.PHONY: watch
watch:
	$(dc) exec app deno bundle --watch ./react/client.jsx ./react/bundle.js