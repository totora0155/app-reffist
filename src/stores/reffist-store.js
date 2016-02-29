import {app, remote ,Menu, Tray, BrowserWindow, ipcMain} from 'electron';
import io from 'socket.io';
import dispatcher from 'dispatcher';
import ReffistAction from 'actions/reffist-action';
import ApplicationMenu from 'menus/application/menu';
import TrayMenu from 'menus/tray/menu';
import actionType from 'constants/action-type';
import storage from 'electron-json-storage';
import {HISTORY_MAX_COUNT} from 'constants/history';
import webContentsScript from 'web-contents/index'

const bwDefaults = {
  width: 320,
  height: 568,
  zoomFactor: 1,
  alwaysOnTop: true,
  resizable: false,
  'node-integration': false,
};

const bwData = new WeakMap();

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

  static setBWData(bw, data) {
    bwData.set(bw, data);
  }

  static getBWData(bw) {
    const opts = bwData.get(bw);
    return opts;
  }

  static get orientation() {
    return _appMenu.orientation;
  }

  static getBookmark() {
    return (async () => {
      const {data} = await storage.get('bookmark');
      return Array.isArray(data) ? data : [];
    })();
  }

  static getHistory() {
    return (async () => {
      const {data} = await storage.get('history');
      return Array.isArray(data) ? data : [];
    })();
  }
}

export default ReffistStore;

const bwDispatchToken = dispatcher.register((payload) => {
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
    case actionType.CREATE_BW:
      {
        const {data, assigner} = payload;
        createBW(Object.create(data), assigner);
      }
      break;
  }
});

const appMenuDispatchToken = dispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.SET_APP_MENU:
      {
        const {menuTemplate} = payload
        _appMenu = new ApplicationMenu(menuTemplate);
      }
      break;
  }
});

const trayMenuDispatchToken = dispatcher.register((payload) => {
  switch (payload.actionType) {
    case actionType.SET_TRAY_MENU:
      {
        const {menuTemplate} = payload
        _trayMenu = new TrayMenu(menuTemplate);
      }
      break;
    case actionType.ADD_BOOKMARK:
      {
        const {data} = payload;
        _trayMenu.addBookmark(data);
        (async () => {
          const {data: bookmarks} = await storage.get('bookmark');
          const result = Array.isArray(bookmarks)
                         ? (bookmarks.unshift(data))
                         : [data];
          await storage.set('bookmark', {data: result});
        })();
      }
      break;
    case actionType.DELETE_BOOKMARK:
      {
        const {bookmarkId} = payload;
        _trayMenu.deleteBookmark(bookmarkId);
      }
      break;
    case actionType.SWAP_BOOKMARK:
      {
        const {origId, targetId} = payload;
        _trayMenu.swapBookmark(orig, target);
      }
      break;
    case actionType.ADD_HISTORY:
      {
        const {data} = payload;
        dispatcher.waitFor([bwDispatchToken]);
        _trayMenu.addHistory(data);
        storage.get('history')
          .then(({data: histories}) => {
            if (Array.isArray(histories)) {
              histories.unshift(data);
              if (histories.length > HISTORY_MAX_COUNT) {
                histories.pop();
              }
              storage.set('history', {data: histories});
            } else {
              storage.set('history', {data: [data]});
            }
          });
      }
      break;
  }
});

function createBW(meta, assigner = {}) {
  const opts = Object.assign(bwDefaults, assigner);
  const {zoomFactor} = opts;
  const data = Object.assign(meta, {zoomFactor});
  let bw = new BrowserWindow(opts);

  bwData.set(bw, data);
  bw.on('closed', () => {
    bw = null;
  });
  bw.webContents.on('dom-ready', () => {
    const title = bw.getTitle();
    ReffistAction.addHistory({title, url: data.url});
  });

  bw.webContents.on('did-start-loading', () => {
    const template = [
      {
        label: 'test',
      },
    ];
    const menu = Menu.buildFromTemplate(template);
    bw.webContents.executeJavaScript(webContentsScript, true, () => {
      bw.webContents.send('ping', 'whoooooooh!');
      bw.webContents.send('send:contextmenu', menu);
    });
  });
  bw.loadURL(data.url);
}

ipcMain.on('hoge', function (event, value) {
  console.log(value);
});
