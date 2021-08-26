const path = require('path');
const LAUNCH_URL = process.env.LAUNCH_URL || 'http://localhost:3000';

module.exports = {
  page_objects_path: path.join(__dirname, 'acceptance', 'pageObjects'),
  globals_path: path.join(__dirname, 'acceptance', 'helpers', 'globals.js'),
  test_settings: {
    default: {
      launch_url: LAUNCH_URL,
      selenium: {
        start_process: false,
        host: process.env.DRONE === 'true' ? 'selenium' : 'localhost',
        port: 4444,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            'disable-gpu',

            'disable-dev-shm-usage',
            'ignore-certificate-errors',
          ],
          w3c: false,
        },
      },
    },
  },
};
