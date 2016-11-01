ESLINT_CMD = node_modules/.bin/eslint

default:
	@echo No target specified

eslint:
	$(ESLINT_CMD) ./**/*.js
