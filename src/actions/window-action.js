import EventEmitter from 'events';
import {BrowserWindow} from 'electron';
import browserwindowStore from 'stores/browserwindow-store';
import storage from 'electron-json-storage';

const defaults = {
  width: 320,
  height: 568,
  alwaysOnTop: true,
  resizable: false,
}

class WindowAction extends EventEmitter {

  static create({url}, assigner = {}) {
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

  constructor() {
    super();
  }
}

export default WindowAction;
