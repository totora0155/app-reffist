import electron from 'electron';
import socketIo from 'socket.io';
import menuDarwinTemplate from '../menus/darwin';
import browserwindowStore from 'stores/browserwindow-store';
import tray from 'trays/tray';
import storage from 'electron-json-storage';

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
      createWindow(data.url);
    });
  });
}

function createWindow (url) {
  let win = new BrowserWindow({
    width: 320,
    height: 568,
    alwaysOnTop: true,
    resizable: false,
  });

  win.on('closed', function() {
    win = null;
  });

  win.loadURL(url);
  browserwindowStore.set(win, {
    url,
    zoomFactor: 1,
  });
}

app.on('window-all-closed', () => {
  socket.disconnect();
});
