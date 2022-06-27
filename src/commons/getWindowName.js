const path = require('path')
const osascript = require('osascript').file;

const scriptGetWindowName = path.join(__dirname, '../appleScripts/getWindowName.js');

const runScript = (script, callback) => {
  osascript(script, function(err, result) {
    if (err) {
      console.error("🚧 ", err);
    } else {
      callback(result);
    }
  });
};

const getWindowName = (callback) => {
  runScript(scriptGetWindowName, callback);
};

module.exports = {
  getWindowName,
}