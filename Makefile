all:
	make clean
	yarn install
	yarn build
	yarn release
clean:
	rm -rf node_modules
	rm -rf build
	rm -f release.zip