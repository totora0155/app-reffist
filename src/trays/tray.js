import {Tray, Menu, MenuItem} from 'electron';
import storage from 'electron-json-storage';

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
    getBookmarks()
      .then(() => trayIcon.setContextMenu(contextMenu));
    trayIcon.setToolTip('Reffist');
  }
};

async function getBookmarks() {
  const bookmarksSubMenu = contextMenu.items[2].submenu;
  const {data} = await storage.get('bookmark');
  if (!Array.isArray(data)) return;

  data.forEach(({title, url}) => {
    const menuItem = new MenuItem({
      label: title,
      click() {
        console.log(url);
      },
    });
    bookmarksSubMenu.append(menuItem);
  });
}
