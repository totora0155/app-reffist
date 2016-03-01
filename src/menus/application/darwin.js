import {Menu, BrowserWindow} from 'electron';
import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';
import device from 'constants/device';
import storage from 'electron-json-storage';

const menuDevice = [
  {
    label: 'iPad Pro',
    type: 'radio',
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      const [WIDTH, HEIGHT] = device.IPAD_PRO.size
      let width = null;
      let height = null;

      if (ReffistStore.orientation === 'portrait') {
        width = Math.round(WIDTH * zoomFactor);
        height = Math.round(HEIGHT * zoomFactor);
      } else {
        width = Math.round(HEIGHT * zoomFactor);
        height = Math.round(WIDTH * zoomFactor);
      }
      bw.setSize(width, height);
    },
  },
  {
    label: 'iPad + iPad mini',
    type: 'radio',
    click(item, bw)  {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      const [WIDTH, HEIGHT] = device.IPAD.size
      let width = null;
      let height = null;

      if (ReffistStore.orientation === 'portrait') {
        width = Math.round(WIDTH * zoomFactor);
        height = Math.round(HEIGHT * zoomFactor);
      } else {
        width = Math.round(HEIGHT * zoomFactor);
        height = Math.round(WIDTH * zoomFactor);
      }
      bw.setSize(width, height);
    },
  },
  {
    label: 'iPhone 6 Plus',
    type: 'radio',
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      const [WIDTH, HEIGHT] = device.IPHONE_6_PLUS.size;
      let width = null;
      let height = null;

      if (ReffistStore.orientation === 'portrait') {
        width = Math.round(WIDTH * zoomFactor);
        height = Math.round(HEIGHT * zoomFactor);
      } else {
        width = Math.round(HEIGHT * zoomFactor);
        height = Math.round(WIDTH * zoomFactor);
      }
      bw.setSize(width, height);
    },
  },
  {
    label: 'iPhone 6',
    type: 'radio',
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      const [WIDTH, HEIGHT] = device.IPHONE_6.size;
      let width = null;
      let height = null;

      if (ReffistStore.orientation === 'portrait') {
        width = Math.round(WIDTH * zoomFactor);
        height = Math.round(HEIGHT * zoomFactor);
      } else {
        width = Math.round(HEIGHT * zoomFactor);
        height = Math.round(WIDTH * zoomFactor);
      }
      bw.setSize(width, height);
    },
  },
  {
    label: 'iPhone 5se',
    type: 'radio',
    checked: true,
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      const [WIDTH, HEIGHT] = device.IPHONE_5SE.size
      let width = null;
      let height = null;

      if (ReffistStore.orientation === 'portrait') {
        width = Math.round(WIDTH * zoomFactor);
        height = Math.round(HEIGHT * zoomFactor);
      } else {
        width = Math.round(HEIGHT * zoomFactor);
        height = Math.round(WIDTH * zoomFactor);
      }
      bw.setSize(width, height);
    },
  },
]

const menuScale = [
  {
    label: '100%',
    type: 'radio',
    checked: true,
    accelerator: 'Command+0',
    click: handleZoom.bind(null, 1),
  },
  {
    label: '75%',
    type: 'radio',
    accelerator: 'Command+9',
    click: handleZoom.bind(null, 0.75),
  },
  {
    label: '50%',
    type: 'radio',
    accelerator: 'Command+8',
    click: handleZoom.bind(null, 0.5),
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
    label: 'Bookmark',
    submenu: [
      {
        label: 'Add Bookmark',
        click(item, bw) {
          const title = bw.getTitle();
          const {url} = ReffistStore.getBWData(bw);

          ReffistAction.addBookmark({title, url});
        },
      },
    ],
  },

  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ],
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
            accelerator: 'Command+p',
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
            accelerator: 'Command+l',
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
        label: 'Scale',
        submenu: menuScale,
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
    label: 'Control',
    submenu: [
      {
        label: 'Start Auto Scroll',
        click(item, bw) {
          ipcMain.send('auto-scroll:start');
        },
      },
      {
        label: 'End Auto Scroll',
        click(item, bw) {
          ipcMain.send('auto-scroll:stop');
        },
      },
    ],
  },

  {
    label: 'Help',
    role: 'help',
  },
];

export default template;

function handleZoom(zoomFactor, item, bw) {
  const [width, height] = bw.getSize();
  const [x, y] = bw.getPosition();
  const {url, zoomFactor: currentZoomFactor} = ReffistStore.getBWData(bw);

  ReffistAction.createBW({url}, {
    x, y,
    zoomFactor,
    width: Math.round(width / currentZoomFactor * zoomFactor),
    height: Math.round(height / currentZoomFactor * zoomFactor),
  });
  bw.destroy();
}
