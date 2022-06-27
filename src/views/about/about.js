const { BrowserWindow } = require('electron');
const path = require('path');

let aboutWindow = undefined

const showAboutWindow = () => {
  if (!aboutWindow) {
    aboutWindow = new BrowserWindow({
      width: 200,
      height: 200,
      center: true,
      fullscreen: false,
      fullscreenable: false,
      resizable: false,
    })

    aboutWindow.loadFile(path.join(__dirname, 'about.html'));
    aboutWindow.on('closed', () => {
      aboutWindow = null
    })
  } else {
    aboutWindow.show()
    aboutWindow.focus()
  }
}

module.exports = {
  showAboutWindow,
}