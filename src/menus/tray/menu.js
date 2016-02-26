import {Menu, MenuItem, Tray} from 'electron';
import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';
import storage from 'electron-json-storage';
import memory from 'memory';
const iconPath = __dirname + '/icons/tray.png';

class TrayMenu {
  constructor(template) {
    this.menu = Menu.buildFromTemplate(template);
    const tray = memory.tray = new Tray(iconPath);
    tray.setToolTip('Reffist');
    (async () => {
      const bookmarks = await ReffistStore.getBookmark();
      bookmarks.forEach(({title, url}) => {
        const opts = {
          label: title,
          click() {
            ReffistAction.createBW({url});
          },
        };

        const item = new MenuItem(opts);
        this.menu.append(item);
      });
      tray.setContextMenu(this.menu);
    })();
  }

  get bookmark() {
    this.menu.items[0];
  }

  updateBookmark() {
    (async () => {
      const bookmarks = await ReffistStore.getBookmark();
      bookmarks.forEach(({title, url}) => {
        const menuItem = new MenuItem({
          label: title,
          click() {
            ReffistAction.createBW({url}, ReffistStore.bwOpts);
          },
        });
        this.bookmark.append(menuItem);
      });
    })();
  }

  addBookmark(bookmark) {}

  deleteBookmark(id) {}

  swapBookmark(orig, target) {}
}

export default TrayMenu;
