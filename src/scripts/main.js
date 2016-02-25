import electron from 'electron';
import socketIo from 'socket.io';
import menuDarwinTemplate from '../menus/darwin';
import browserwindowStore from 'stores/browserwindow-store';
import tray from 'trays/tray';
import memory from 'stores/memory';
import storage from 'electron-json-storage';
// import WindowAction from 'actions/window-action';

import appMenu4Darwin from 'menus/application/darwin';
import trayMenu4Darwin from 'menus/tray/darwin';
// import trayMenu from 'menus/tray-menu';

const PORT = 53825;
// import contextMenu from 'menus/context-menu';

import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';
// ReffistAction.create({foo: 1}, {bar: 2});


const {app, remote, BrowserWindow, Menu, webFrame} = electron;
let socket = null;

app.on('ready', () => {
  ReffistAction.setAppMenu(appMenu4Darwin);
  ReffistAction.setTrayMenu(trayMenu4Darwin);

  ReffistStore.addSocketListener((sendData) => {
    ReffistAction.createBW(sendData);
  });
  ReffistAction.addSocketListener({
    port: PORT,
  });

  // console.log(typeof ReffistStore.appMenu);
  // console.log(Object.getOwnPropertyNames(ReffistStore.appMenu));
  // debugger;
  // console.log(ReffistStore.appMenu.test);
  // ReffistStore.appMenu.aaa;
  // ReffistStore.appMenu.device.addClickListener(ReffistAction.changeDevice);
})


  // switch (process.platform) {
  //   case 'darwin':
  //     Menu.setApplicationMenu(Menu.buildFromTemplate(menuDarwinTemplate));
  //     break;
  // }
  // memory.tray = tray.create();
  // connect();
// });

function connect() {
  const io = socketIo.listen(53825);
  io.sockets.on('connection', (_socket) => {
    socket = _socket
    socket.on('open', (sendData) => {
      WindowAction.create(sendData);
    });
  });
}

app.on('window-all-closed', () => {
  ReffistAction.removeSocketListener();
});
