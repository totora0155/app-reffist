import electron from 'electron';
import socketIo from 'socket.io';

console.log(electron);
const {app, remote, BrowserWindow, Menu, webFrame} = electron;
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
        label: '100%',
        accelerator: 'Command+1',
        click(item, win) {
          win.setSize(1024, 768);
        }
      },
      {
        label: '75%',
        accelerator: 'Command+2',
        click(item, win) {
          win.setSize(1024 * 0.75, 768 * 0.75);
        }
      },
      {
        label: '50%',
        accelerator: 'Command+3',
        click(item, win) {
          // const code = `
          //   require('electorn').webFrame.setZoomFactor(0.5);
          // `;
          win.setSize(1024 * 0.5, 768 * 0.5);
          // win.webContents.executeJavaScript(code)
        }
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
    width: 1024,
    height: 768,
    // width: 1024 / 2,
    // height: 768 / 2,
    alwaysOnTop: true,
    resizable: false,
    // zoomFactor: 0.5,
  });

  win.on('closed', function() {
    win = null;
  });

  win.loadURL(url);
}

app.on('window-all-closed', () => {
  socket.disconnect();
});
