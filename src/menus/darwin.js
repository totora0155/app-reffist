import electron from 'electron';
const {Menu, BrowserWindow} = electron;
import browserwindowStore from 'stores/browserwindow-store';
import ReffistMenu from 'menus/reffist-menu';

const menuDevice = [
  {
    label: 'iPad Pro',
    click(item, win) {
      ReffistMenu.portrait
      ? win.setSize(1024, 1366)
      : win.setSize(1366, 1024);
    },
  },
  {
    label: 'iPad + iPad mini',
    click(item, win)  {
      ReffistMenu.portrait
      ? win.setSize(768, 1024)
      : win.setSize(1024, 768);
    },
  },
  {
    label: 'iPhone 6 Plus',
    click(item, win) {
      ReffistMenu.portrait
      ? win.setSize(414, 736)
      : win.setSize(736, 414);
    },
  },
  {
    label: 'iPhone 6',
    click(item, win) {
      ReffistMenu.portrait
      ? win.setSize(375, 627)
      : win.setSize(627, 375);
    },
  },
  {
    label: 'iPhone 5se',
    click(item, win) {
      ReffistMenu.portrait
      ? win.setSize(320, 568)
      : win.setSize(568, 320);
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
        label: 'Resize',
        submenu: menuResize,
      },
    ]
  }
];

export default template;
