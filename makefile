dc := docker compose

.PHONY: init
init:
	@make up
	$(dc) exec app deno bundle client.jsx bundle.js
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