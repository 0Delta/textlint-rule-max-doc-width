build:
	npm run build

testinstall:
	npm run build
	npm -g uninstall ./
	npm -g install ./

testuninstall:
	npm -g uninstall ./

