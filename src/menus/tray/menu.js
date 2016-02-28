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
    this.update();
  }

  update() {
    Promise.all([
      setBookmark.call(this),
      setHistory.call(this),
    ]).then(() => {
      this.tray.setContextMenu(this.menu);
    });
  }

  addBookmark(data) {
    this.bookmark.submenu.append(createWindowItem(data));
    this.update();
  }

  deleteBookmark(id) {}

  swapBookmark(orig, target) {}

  addHistory(data) {
    this.history.submenu.append(createWindowItem(data));
    this.update();
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

function setBookmark() {
  return (async () => {
    const bookmarks = await ReffistStore.getBookmark();
    bookmarks.forEach((data) => {
      const item = createWindowItem(data)
      this.menu.items[2].submenu.append(item);
    });
  })();
}

function setHistory() {
  return (async () => {
    const histories = await ReffistStore.getHistory();
    histories.forEach((data) => {
      const item = createWindowItem(data)
      this.menu.items[3].submenu.append(item);
    });
  })();
}
