import {Menu} from 'electron';
import _ from 'lodash';

class ApplicationMenu {
  constructor(template) {
    this.menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(this.menu);
  }

  get edit() {
    return this.menu.items[2];
  }

  get view() {
    return this.menu.items[3];
  }

  get control() {
    return this.menu.items[4];
  }

  get orientation() {
    const menu = this.view.submenu.items[0].submenu;
    const {label} = _.find(menu.items, {checked: true});
    return label;
  }

  get device() {
    const menu = this.view.submenu.items[1].submenu;
    const {label} = _.find(menu.items, {checked: true});
    return label;
  }

  get zoom() {
    const menu = this.view.submenu.items[2].submenu;
    const {label} = _.find(menu.items, {checked: true});
    return label;
  }
}

export default ApplicationMenu;
