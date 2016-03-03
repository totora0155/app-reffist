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
  {
    type: 'separator',
  },
  {
    label: 'Config',
    click() {
      const configURL = 'file://' + __dirname + '/window/config/index.html'
      ReffistAction.createBW({url: configURL}, {
        width: 560,
        height: 346,
        nodeIntegration: true,
      });
    },
  },
];

export default template;
