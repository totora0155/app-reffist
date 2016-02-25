import {Menu, Tray, BrowserWindow} from 'electron';
import EventEmitter from 'events';
import ApplicationMenu from 'menus/application/menu';
import TrayMenu from 'menus/tray/menu';
import dispatcher from 'dispatcher';
import io from 'socket.io';
import storage from 'electron-json-storage';
import actionType from 'constants/action-type';

// Object.assign(Menu.prototype, ApplicationMenu);

// console.log(Menu);

const bwData = new WeakMap();

const bwDefaults = {
  width: 320,
  height: 568,
  alwaysOnTop: true,
  resizable: false,
}

let _handleOpen = null;
let _appMenu = null;
let _trayMenu = null;

class ReffistStore {
  static addSocketListener(cb) {
    console.log(_socket);
    if (_socket) {
      _socket.on('open', cb);
    }
  }

  static get appMenu() {
    return _appMenu;
  }

  static createBW({url}, assigner = {}) {
    const opts = Object.assign(defaults, assigner);
    let win = new BrowserWindow(opts);

    win.on('closed', function() {
      win = null;
    });

    win.loadURL(url);
    browserwindowStore.set(win, {
      url,
      zoomFactor: 1,
    });
  }

  static addSocketListener(handleOpen) {
    _handleOpen = handleOpen;
  }

  static removeSocketListener() {
    _handleOpen = null;
  }

  // static getBookmark() {
  //   getBookmark.get('bookmark');
  // });
  //
  // static getHistory() {
  //   return storage.get('histoly');
  // }
  //
  // static setBookmark(data) {
  //   return storage.set('bookmark', data);
  // }
  //
  // static setHistory(data) {
  //   return storage.set('history', data);
  // }
  //
  // static getBWData(bw) {
  //   bwMap.get(bw);
  // }
  //
  // static setBWData(bw, data) {
  //   bwMap.set(bw, data);
  // }
}

export default ReffistStore;

let a = null;

dispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.INIT_SOCKET:
      const {port} = payload;
      const {sockets} = io.listen(port);
      sockets.on('connection', (socket) => {
        if (_handleOpen) {
          socket.on('open', _handleOpen);
        }
      });
      break;
    case actionType.SET_APP_MENU:
      {
        const {menuTemplate} = payload
        _appMenu = new ApplicationMenu(menuTemplate);
      }
      break;
    case actionType.SET_TRAY_MENU:
      {
        const {menuTemplate} = payload
        const _trayMenu = buildMenu(menuTemplate);
      }
      break;
    case actionType.CREATE_BW:
      {
        const {data, assigner} = payload;
        createBW(data, assigner);
      }
      break;
  }
});

// function connectSocket(port) {
//   const {sockets} = io.listen(port);
//   scokets.on('connection', (socket) => {
//     // _socket = socket;
//   });
// }

function buildMenu(template) {
  Menu.buildFromTemplate(template);
}

function createAppMenu(menu) {
  Menu.setApplicationMenu(menu);
}

function createTrayMenu(menu) {
  const iconPath = __dirname + '/icons/tray.png';
  const tray = new Tray(iconPath);
  tray.setContextMenu(menu);
  tray.setToolTip('Reffist');
}

async function getBookmarks() {
  const bookmarksSubMenu = trayMenu.items[2].submenu;
  const {data} = await storage.get('bookmark');
  if (!Array.isArray(data)) return;

  data.forEach(({title, url}) => {
    const menuItem = new MenuItem({
      label: title,
      click() {
        WindowAction.create({url});
      },
    });
    bookmarksSubMenu.append(menuItem);
  });
}

function createBW({url}, assigner = {}) {
  const opts = Object.assign(bwDefaults, assigner);
  let win = new BrowserWindow(opts);

  win.on('closed', function() {
    win = null;
  });

  win.loadURL(url);
  bwData.set(win, {
    url,
    zoomFactor: 1,
  })
}
