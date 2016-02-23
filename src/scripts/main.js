import electron from 'electron';
import socketIo from 'socket.io';
import menuDarwinTemplate from '../menus/darwin';
import browserwindowStore from 'stores/browserwindow-store';
import tray from 'trays/tray';
import storage from 'electron-json-storage';
import WindowAction from 'actions/window-action';

const {app, remote, BrowserWindow, Menu, webFrame} = electron;
let socket = null;

app.on('ready', () => {
  switch (process.platform) {
    case 'darwin':
      Menu.setApplicationMenu(Menu.buildFromTemplate(menuDarwinTemplate));
      break;
  }
  tray.create();
  connect();
});

function connect() {
  const io = socketIo.listen(53825);
  io.sockets.on('connection', (_socket) => {
    socket = _socket
    socket.on('open', (data) => {
      WindowAction.create({
        url: data.url,
      });
    });
  });
}

app.on('window-all-closed', () => {
  if (socket != null) {
    socket.disconnect();
  }
});
