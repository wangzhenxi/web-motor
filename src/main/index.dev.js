/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */
const { app, BrowserWindow } = require('electron');

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })


// Install `vue-devtools`
app.on('ready', () => {
  BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')
});

// Require `main` process to boot app
require('./index')

process.on('exit', () => {
  console.log('bye');
})
