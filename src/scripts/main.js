import electron from 'electron';
import socketIo from 'socket.io';

const {app, BrowserWindow, Menu, MenuItem} = electron;
let socket = null;

const template = [
  {
    label: 'Reffist',
    submenu: [
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
    label: 'View',
    role: 'view',
    submenu: [
      {
        label: '150%',
        role: '100%'
      },
      {
        label: '125%',
        role: '100%'
      },
      {
        label: '100%',
        role: '100%'
      },
      {
        label: '75%',
        role: '75%'
      },
      {
        label: '50%',
        role: '50%'
      },
    ]
  }
];

const menu = Menu.buildFromTemplate(template);

app.on('ready', () => {
  Menu.setApplicationMenu(menu);
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
    // width: 1024,
    // height: 768,
    width: 1024 / 2,
    height: 768 / 2,
    alwaysOnTop: true,
    resizable: false,
    zoomFactor: 0.5,
  });

  win.on('closed', function() {
    win = null;
  });

  win.loadURL(url);
}

app.on('window-all-closed', () => {
  socket.disconnect();
});
