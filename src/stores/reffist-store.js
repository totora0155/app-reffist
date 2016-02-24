import {Menu, Tray} from 'electron';
import dispatcher from 'dispatcher';
import io from 'socket.io';
import storage from 'electron-json-storage';
import actionType from 'constants/action-type-constant';

const bwMap = new WeakMap();

const bwDefaults = {
  width: 320,
  height: 568,
  alwaysOnTop: true,
  resizable: false,
}

let _socket = null;

class ReffistStore {
  static addSocketListener(cb) {
    if (_socket) {
      _socket.on('open', cb);
    }
  }

  static removeSocketListener(cb) {
    console.log(_socket);
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

dispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.CONNECT_SOCKET:
      const {port} = payload;
      connectSocket(port);
      break;
    case actionType.SET_APP_MENU:
      const {appMenu} = payload
      const menu = buildMenu(appMenu);
      break;
    case actionType.SET_TRAY_MENU:
      const {trayMenu} = payload
      const menu = buildMenu(trayMenu);
      break;
    case actionType.CREATE_BW:
      console.log(123);
      break;
  }
});

function connectSocket(port) {
  const {sockets} = io.listen(port);
  scokets.on('connection', (socket) => {
    _socket = socket;
  });
}

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
