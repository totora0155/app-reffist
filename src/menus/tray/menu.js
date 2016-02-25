import {Menu} from 'electron';

class TrayMenu extends Menu {
  static get bookmarks() {
    const bookmarks = this.items[0]
    console.log(bookmarks)
    Object.assign(bookmarks, {
      click(item, targetWindow) {
        console.log(item);
        console.log(targetWindow);
      }
    });
    return bookmarks;
  }
}

export default TrayMenu;
