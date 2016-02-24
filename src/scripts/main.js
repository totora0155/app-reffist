import electron from 'electron';
import socketIo from 'socket.io';
import menuDarwinTemplate from '../menus/darwin';
import browserwindowStore from 'stores/browserwindow-store';
import tray from 'trays/tray';
import memory from 'stores/memory';
import storage from 'electron-json-storage';
import WindowAction from 'actions/window-action';

import appMenu from 'menus/app-menu';
import trayMenu from 'menus/tray-menu';

const PORT = 53825;
// import contextMenu from 'menus/context-menu';

// import ReffistAction from 'actions/reffist-action';
// import ReffistStore from 'stores/reffist-store';
// ReffistAction.create({foo: 1}, {bar: 2});


const {app, remote, BrowserWindow, Menu, webFrame} = electron;
let socket = null;

app.on('ready', () => {
  ReffistAction.setAppMenu(appMenu);
  ReffistAction.setTrayMenu(trayMenu);
  ReffistAction.addSocketListener({
    post: PORT,
  });
})

ReffistStore.addSocketListener((sendData) => {
  ReffistAction.createBW(sendData);
});

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
