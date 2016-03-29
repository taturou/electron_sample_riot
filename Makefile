TARGET := asar

.PHONY: all
all: $(TARGET)

js:
	riot --type coffee --template jade ./src ./app

asar: js
	asar pack . ./release/app.asar

package:
	electron-packager . sample --platform=win32 --arch=ia32 --version=0.37.2
	mv ./sample-win32-ia32 ./release

start:
	electron .

clean:
	rm -f ./release/app.asar
	rm -f ./app/*.js
	rm -rf sample-win32-ia32/

