import dispatcher from 'dispatcher';
import storage from 'electron-json-storage';
import actionTypeConstant from 'constants/action-type-constant';

const bwMap = new WeakMap();

const bwDefaults = {
  width: 320,
  height: 568,
  alwaysOnTop: true,
  resizable: false,
}

class ReffistStore {
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
    case actionTypeConstant.CREATE_BW:
      console.log(123);
      break;
  }
});
