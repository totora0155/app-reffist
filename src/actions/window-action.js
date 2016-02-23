import EventEmitter from 'events';
import {BrowserWindow} from 'electron';
import browserwindowStore from 'stores/browserwindow-store';

class WindowAction extends EventEmitter {
  static create({url}) {
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

  constructor() {
    super();
  }
}

export default WindowAction;
