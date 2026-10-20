# Same four commands for every project, whatever the language.
# CI and Render call these, so the pipeline never changes between stacks.

.PHONY: install lint test build start

install:
	npm ci

lint:
	npm run lint

test:
	npm test

build:
	npm run build

start:
	npm start
