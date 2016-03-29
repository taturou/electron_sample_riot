all: todo.js

todo.js: todo.tag
	riot --type coffee --template jade todo.tag

package:
	electron-packager . sample --platform=win32 --arch=ia32 --version=0.37.2

start:
	electron .

clean:
	rm -f todo.js
	rm -rf sample-win32-ia32/

