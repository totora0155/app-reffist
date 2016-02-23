import {Tray, Menu} from 'electron';

const iconPath = __dirname + '/icons/tray.png';
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Open from Clipboard'
  },
  {
    type: 'separator'
  },
  {
    label: 'Bookmarks',
    submenu: [],
  }
]);

export default {
  create() {
    const trayIcon = new Tray(iconPath);
    trayIcon.setContextMenu(contextMenu);
    trayIcon.setToolTip('Reffist');
  }
};
