all: todo.js

todo.js: todo.tag
	riot --type coffee --template jade todo.tag

start:
	electron .

clean:
	rm -f todo.js

