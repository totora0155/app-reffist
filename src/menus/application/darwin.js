import {Menu, BrowserWindow} from 'electron';
import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';
import storage from 'electron-json-storage';

const menuDevice = [
  {
    label: 'iPad Pro',
    type: 'radio',
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      ReffistStore.orientation === 'portrait'
      ? bw.setSize(1024 * zoomFactor, 1366 * zoomFactor)
      : bw.setSize(1366 * zoomFactor, 1024 * zoomFactor);
    },
  },
  {
    label: 'iPad + iPad mini',
    type: 'radio',
    click(item, bw)  {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      ReffistStore.orientation === 'portrait'
      ? bw.setSize(768 * zoomFactor, 1024 * zoomFactor)
      : bw.setSize(1024 * zoomFactor, 768 * zoomFactor);
    },
  },
  {
    label: 'iPhone 6 Plus',
    type: 'radio',
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      ReffistStore.orientation === 'portrait'
      ? bw.setSize(414 * zoomFactor, 736 * zoomFactor)
      : bw.setSize(736 * zoomFactor, 414 * zoomFactor);
    },
  },
  {
    label: 'iPhone 6',
    type: 'radio',
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      ReffistStore.orientation === 'portrait'
      // error!!
      // ? bw.setSize(375 * zoomFactor, 627 * zoomFactor)
      // ? bw.setSize(374 * zoomFactor, 627 * zoomFactor)
      // ? bw.setSize(375 * zoomFactor, 626 * zoomFactor)
      ? bw.setSize(374 * zoomFactor, 626 * zoomFactor)
      : bw.setSize(626 * zoomFactor, 374 * zoomFactor);
    },
  },
  {
    label: 'iPhone 5se',
    checked: true,
    click(item, bw) {
      const {zoomFactor} = ReffistStore.getBWData(bw);
      ReffistStore.orientation === 'portrait'
      ? bw.setSize(320 * zoomFactor, 568 * zoomFactor)
      : bw.setSize(568 * zoomFactor, 320 * zoomFactor);
    }
  },
]

const menuResize = [
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
        click(item, win) {
          const title = win.getTitle();
          const {url} = ReffistStore.bwOptions;

          (async () => {
          })
          storage.get('bookmark')
            .then(({data}) => {
              const target = {title, url};
              const result = Array.isArray(data)
                             ? (data.push(target))
                             : [target];
            //   storage.set('bookmark', {data: result})
            //     .then((err) => {
            //       if (err) throw err;
            //     });
            });
        },
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

function handleZoom(zoomFactor, item, bw) {
  const [width, height] = bw.getSize();
  const [x, y] = bw.getPosition();
  const {url, zoomFactor: currentZoomFactor} = ReffistStore.getBWData(bw);

  ReffistAction.createBW({url}, {
    x, y,
    zoomFactor,
    width: width / currentZoomFactor * zoomFactor,
    height: height / currentZoomFactor * zoomFactor,
  });
  bw.destroy();
}
