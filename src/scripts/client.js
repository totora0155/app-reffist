import {remote, ipcRenderer} from 'electron';
import ContextMenu from 'menus/context/menu';
import contextTemplate from 'menus/context/darwin';
const {Menu, clipboard, dialog} = remote;
const bw = remote.getCurrentWindow();

document.addEventListener('contextmenu', (e) => {
  const data = {
    position: {
      x: e.x,
      y: e.y,
    },
  };
  const menu = Menu.buildFromTemplate(contextTemplate(bw, data));
  menu.popup(bw);
});

ipcRenderer.on('auto-scroll:start', () => {
  ContextMenu.autoScroll();
});

ipcRenderer.on('auto-scroll:end', () => {
  ContextMenu.cancelAutoScroll();
});
