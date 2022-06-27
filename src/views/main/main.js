const { BrowserWindow } = require('electron');
const { getWindowName } = require('../../commons/getWindowName');
const path = require('path');

let window = undefined

const createWindow = () => {
  window = new BrowserWindow({
    width: 300,
    height: 450,
    center: true,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false,
    }
  })

  window.loadFile(path.join(__dirname, 'main.html'));

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

const showWindow = () => {
  // const position = getWindowPosition()
  // window.setPosition(position.x, position.y, false)
  getWindowName((windowData) => {
    console.log(windowData)
    window.show()
    window.focus()
  })
}

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

module.exports = {
  createWindow,
  showWindow,
  toggleWindow,
}