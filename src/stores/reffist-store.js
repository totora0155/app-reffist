import {remote ,Menu, Tray, BrowserWindow} from 'electron';
import EventEmitter from 'events';
import ApplicationMenu from 'menus/application/menu';
import TrayMenu from 'menus/tray/menu';
import dispatcher from 'dispatcher';
import io from 'socket.io';
import storage from 'electron-json-storage';
import actionType from 'constants/action-type';

// Object.assign(Menu.prototype, ApplicationMenu);

// console.log(Menu);

const bwDefaults = {
  width: 320,
  height: 568,
  alwaysOnTop: true,
  resizable: false,
}

const bwOptions = new WeakMap();

let _handleOpen = null;
let _appMenu = null;
let _trayMenu = null;

class ReffistStore {
  static addSocketListener(handleOpen) {
    _handleOpen = handleOpen;
  }

  static get appMenu() {
    return _appMenu;
  }

  static get bwDefaults() {
    return bwDefaults;
  }

  static get currentBWOptions() {
    const opts = bwOptions.get(bw);
    return opts;
  }

  // static get bwOptions(bw) {
  //   const opts = bwOptions(bw);
  //   return opts;
  // }

  static getBookmark() {
    return (async () => {
      storage.get('bookmark', (data) => {
        console.log(data);
      });
      const data = await storage.get('bookmark');
      return data;
    })();
  }
}

export default ReffistStore;

dispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.CONNECT_SOCKET:
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
        const _trayMenu = new TrayMenu(menuTemplate);
      }
      break;
    case actionType.CREATE_BW:
      {
        const {data, assigner} = payload;
        createBW(data, assigner);
      }
      break;
    case actionType.ADD_BOOKMARK:
      {
        const {bookmark} = payload;
        TrayMenu.addBookmark(bookmark);
      }
      break;
    case actionType.DELETE_BOOKMARK:
      {
        const {bookmarkId} = payload;
        TrayMenu.deleteBookmark(bookmarkId);
      }
      break;
    case actionType.SWAP_BOOKMARK:
      {
        const {origId, targetId} = payload;
        TrayMenu.swapBookmark(orig, target);
      }
      break;
  }
});

function createBW({url}, assigner = {}) {
  const opts = Object.assign(bwDefaults, assigner);
  let bw = new BrowserWindow(opts);
  {
    const zoomFactor = 1;
    bwOptions.set(bw, {url, zoomFactor});
  }

  bw.on('closed', () => {
    bw = null;
  });

  bw.loadURL(url);
}
