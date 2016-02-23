import electron from 'electron';
const {Menu, BrowserWindow} = electron;
import browserwindowStore from 'stores/browserwindow-store';
import ReffistMenu from 'menus/reffist-menu';

const menuDevice = [
  {
    label: 'iPad Pro',
    click(item, win) {
      const {zoomFactor} = browserwindowStore.get(win);
      ReffistMenu.portrait
      ? win.setSize(1024 * zoomFactor, 1366 * zoomFactor)
      : win.setSize(1366 * zoomFactor, 1024 * zoomFactor);
    },
  },
  {
    label: 'iPad + iPad mini',
    click(item, win)  {
      const {zoomFactor} = browserwindowStore.get(win);
      ReffistMenu.portrait
      ? win.setSize(768 * zoomFactor, 1024 * zoomFactor)
      : win.setSize(1024 * zoomFactor, 768 * zoomFactor);
    },
  },
  {
    label: 'iPhone 6 Plus',
    click(item, win) {
      const {zoomFactor} = browserwindowStore.get(win);
      ReffistMenu.portrait
      ? win.setSize(414 * zoomFactor, 736 * zoomFactor)
      : win.setSize(736 * zoomFactor, 414 * zoomFactor);
    },
  },
  {
    label: 'iPhone 6',
    click(item, win) {
      const {zoomFactor} = browserwindowStore.get(win);
      ReffistMenu.portrait
      // error!!
      // ? win.setSize(375 * zoomFactor, 627 * zoomFactor)
      // ? win.setSize(374 * zoomFactor, 627 * zoomFactor)
      // ? win.setSize(375 * zoomFactor, 626 * zoomFactor)
      ? win.setSize(374 * zoomFactor, 626 * zoomFactor)
      : win.setSize(626 * zoomFactor, 374 * zoomFactor);
    },
  },
  {
    label: 'iPhone 5se',
    click(item, win) {
      const {zoomFactor} = browserwindowStore.get(win);
      ReffistMenu.portrait
      ? win.setSize(320 * zoomFactor, 568 * zoomFactor)
      : win.setSize(568 * zoomFactor, 320 * zoomFactor);
    }
  },
]

const menuResize = [
  {
    label: '100%',
    accelerator: 'Command+1',
    click(item, currentWin) {
      const ZOOM_FACTOR = 1;
      const [width, height] = currentWin.getSize();
      const [x, y] = currentWin.getPosition();
      const {url, zoomFactor} = browserwindowStore.get(currentWin);
      const win = new BrowserWindow({
        x,
        y,
        zoomFactor: ZOOM_FACTOR,
        width: width / zoomFactor * ZOOM_FACTOR,
        height: height / zoomFactor * ZOOM_FACTOR,
        alwaysOnTop: true,
        resizable: false,
      });
      win.loadURL(url);
      browserwindowStore.set(win, {
        url,
        zoomFactor: ZOOM_FACTOR,
      });
      currentWin.destroy();
    }
  },
  {
    label: '75%',
    accelerator: 'Command+2',
    click(item, currentWin) {
      const ZOOM_FACTOR = 0.75;
      const [width, height] = currentWin.getSize();
      const [x, y] = currentWin.getPosition();
      const {url, zoomFactor} = browserwindowStore.get(currentWin);
      const win = new BrowserWindow({
        x,
        y,
        zoomFactor: ZOOM_FACTOR,
        width: width / zoomFactor * ZOOM_FACTOR,
        height: height / zoomFactor * ZOOM_FACTOR,
        alwaysOnTop: true,
        resizable: false,
      });
      win.loadURL(url);
      browserwindowStore.set(win, {
        url,
        zoomFactor: ZOOM_FACTOR,
      });
      currentWin.destroy();
    }
  },
  {
    label: '50%',
    accelerator: 'Command+3',
    click(item, currentWin) {
      const ZOOM_FACTOR = 0.5;
      const [width, height] = currentWin.getSize();
      const [x, y] = currentWin.getPosition();
      const {url, zoomFactor} = browserwindowStore.get(currentWin);
      const win = new BrowserWindow({
        x,
        y,
        zoomFactor: ZOOM_FACTOR,
        width: width / zoomFactor * ZOOM_FACTOR,
        height: height / zoomFactor * ZOOM_FACTOR,
        alwaysOnTop: true,
        resizable: false,
      });
      win.loadURL(url);
      browserwindowStore.set(win, {
        url,
        zoomFactor: ZOOM_FACTOR,
      });
      currentWin.destroy();
    }
  },
]

const template = [
  {
    label: 'Reffist',
    submenu: [
      {
        label: 'About',
        role: 'aboutf'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      },
      {
        label: 'Preferences',
        accelerator: 'Command+,',
      }
    ]
  },
  {
    label: 'View',
    role: 'view',
    submenu: [
      {
        label: 'Orientation',
        submenu: [
          {
            label: 'portrait',
            type: 'radio',
            checked: true,
            click(item, win) {
              const [width, height] = win.getSize();
              width > height
              ? win.setSize(height, width)
              : win.setSize(width, height);
            },
          },
          {
            label: 'landscape',
            type: 'radio',
            click(item, win) {
              const [width, height] = win.getSize();
              width > height
              ? win.setSize(width, height)
              : win.setSize(height, width);
            },
          },
        ],
      },
      {
        label: 'Device',
        submenu: menuDevice,
      },
      {
        label: 'Zoom',
        submenu: menuResize,
      },
      {
        type: 'separator',
      },
      {
        label: 'Develop Tool',
        accelerator: 'Shift+CmdOrCtrl+I',
        click(item, win) {
          win.webContents.toggleDevTools()
        },
      },
    ]
  },
  {
    label: 'Help',
    role: 'help',
  },
];

export default template;
