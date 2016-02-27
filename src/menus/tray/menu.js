import {Menu, MenuItem, Tray} from 'electron';
import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';
import storage from 'electron-json-storage';
import memory from 'memory';
const iconPath = __dirname + '/icons/tray.png';

class TrayMenu {
  constructor(template) {
    this.menu = Menu.buildFromTemplate(template);
    this.bookmark = this.menu.items[2];
    this.history = this.menu.items[3];
    this.tray = memory.tray = new Tray(iconPath);
    this.tray.setToolTip('Reffist');
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
        this.menu.items[2].submenu.append(item);
      });
      this.tray.setContextMenu(this.menu);
    })();
  }

  updateBookmark() {
    (async () => {
      const bookmarks = await ReffistStore.getBookmark();
      bookmarks.forEach((data) => {
        this.bookmark.append(createBookmarkItem(data));
      });
      this.tray.setContextMenu(this.menu);
    })();
  }

  addBookmark(data) {
    this.bookmark.submenu.append(createWindowItem(data));
    this.tray.setContextMenu(this.menu);
  }

  deleteBookmark(id) {}

  swapBookmark(orig, target) {}

  addHistory(data) {
    this.history.submenu.append(createWindowItem(data));
    this.tray.setContextMenu(this.menu);
  }
}

export default TrayMenu;

function createWindowItem({title, url}) {
  return new MenuItem({
    label: title,
    click() {
      ReffistAction.createBW({url});
    },
  });
}
