/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import keytar from 'keytar-prebuild';
import constants from './constants';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
});

const ec2 = new AWS.EC2();

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});


ipcMain.on('account.create', (event, args) => {
  const { name, accessKeyID, accessKeySecret } = args;

  keytar.setPassword(constants.APP_NAME, name, JSON.stringify({
    accessKeyID,
    accessKeySecret,
    createdOn: Date.now(),
  })).then(() => {
    event.sender.send('account.create.response', {
      success: true,
      error: []
    });
    return undefined;
  }).catch(err => {
    event.sender.send('account.create.response', {
      success: false,
      error: err,
    });
  });
});

ipcMain.on('account.list', (event, args) => {
  keytar.findCredentials(constants.APP_NAME).then(data => {
    event.sender.send('account.list.response', {
      data,
    });
  })
});

ipcMain.on('account.delete', (event, accountName) => {

  keytar.deletePassword(constants.APP_NAME, accountName).then(() => {
    event.sender.send('account.delete.response', {
      success: true,
      error: []
    });
  })
});

ipcMain.on('regions.list', (event, args) => {
  const params = {};
  ec2.describeRegions(params, (err, data) => {
    event.sender.send('regions.list.response', {
      data,
      error: err,
    });
  });
});

ipcMain.on('network.detail', (event, args) => {
  const { accountName, region } = args;
  // ec2.describeInstances({}, (instanceErr, instanceData) => {
  //   ec2.describeVpcs({}, (vpcErr, vpcData) => {
  //     ec2.describeSubnets({}, (subnetErr, subnetData) => {

  //
  //       const response = {
  //         data: {
  //           VPC: vpcData,
  //           SUBNETS: subnetData,
  //           INSTANCES: instanceData,
  //         },
  //         error: {
  //           VPC: vpcErr,
  //           SUBNETS: subnetErr,
  //           INSTANCES: instanceErr,
  //         },
  //       };

  //       event.sender.send('network.detail.response', response);
  //     });
  //   });
  // });
  const fs = require('fs');
  const response = fs.readFileSync('/tmp/network.detail.json');
  event.sender.send('network.detail.response', JSON.parse(response));
});
