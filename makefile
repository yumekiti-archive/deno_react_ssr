dc := docker compose -f ./docker/docker-compose.yml

.PHONY: init
init:
	@make up
	$(dc) exec app deno bundle ./react/client.jsx ./react/bundle.js
	@make restart

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