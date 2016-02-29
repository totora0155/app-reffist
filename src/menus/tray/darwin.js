import {Menu, clipboard} from 'electron';
import isURL from 'is-url';
import ReffistAction from 'actions/reffist-action';

const template = [
  {
    label: 'Open from Clipboard',
    click() {
      const text = clipboard.readText();
      if (isURL(text)) {
        ReffistAction.createBW({url: text});
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
