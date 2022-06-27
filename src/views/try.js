const { app, Tray, globalShortcut, Menu } = require('electron');
const { TOGGLE_SHORTCUT } = require("../commons/constants");
const { showAboutWindow } = require("./about/about");
const { toggleWindow } = require("./main/main");
const path = require('path');

const assetsDirectory = path.join(__dirname, '../assets')

const trayMenu = Menu.buildFromTemplate([
  {
    label: "Toggle Shortky",
    click() {
      toggleWindow();
    },
    accelerator: TOGGLE_SHORTCUT,
  },
  { type: "separator" },
  {
    label: "About",
    click() {
      showAboutWindow();
    }
  },
  {
    label: "Quit",
    click() {
      app.quit();
    }
  }
]);

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'sunTemplate.png'))
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayMenu)
  })
  tray.on('double-click', toggleWindow)
  tray.on('click', function (event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })
}

const setGlobalShortcuts = () => {
  globalShortcut.register(TOGGLE_SHORTCUT, toggleWindow);
};

const unsetGlobalShortcuts = () => {
  globalShortcut.unregisterAll()
}

module.exports = {
  createTray,
  setGlobalShortcuts,
  unsetGlobalShortcuts,
}