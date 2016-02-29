import {Menu} from 'electron'

const template = [
  {
    label: 'Open from Clipboard',
    click() {
      const text = clipboard.readText();
      if (isURL(text)) {
        WindowAction.create({
          url: text,
        });
      }
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Bookmark',
    submenu: [],
  },
  {
    label: 'History',
    submenu: [],
  },
];

export default template;
