import electron from 'electron';
const {Menu} = electron;

class ReffistMenu extends Menu {
  static get portrait() {
    const portrait = this.getApplicationMenu()
      .items[2].submenu
        .items[0].submenu
          .items[0];
    return portrait.checked;
  }

  constructor() {
    super();
  }
}

export default ReffistMenu;
