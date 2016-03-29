'use strict';

// module for application
var app = require('app');

// module for window
var BrowserWindow = require('browser-window');

// メインウィンドウはGCされないようにグローバル変数にする
var mainWindow = null;

// 全てのウィンドウが閉じたらアプリケーションを終了する
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// Electronの初期化完了時に実行する
app.on('ready', function() {
    // ウィンドウ幅、高さ
    mainWindow = new BrowserWindow({window: 800, height: 600});

    // カレントディレクトリにある index.html を表示する
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    // ウィンドウを閉じたらアプリも終了
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

