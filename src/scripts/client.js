import {remote, ipcRenderer} from 'electron';
import ContextMenu from 'menus/context/menu';
import contextTemplate from 'menus/context/darwin';
const {Menu, clipboard, dialog} = remote;
const bw = remote.getCurrentWindow();

document.addEventListener('contextmenu', () => {
  const menu = Menu.buildFromTemplate(contextTemplate(bw));
  menu.popup(bw);
});

ipcRenderer.on('auto-scroll:start', () => {
  ContextMenu.autoScroll();
});

ipcRenderer.on('auto-scroll:end', () => {
  ContextMenu.cancelAutoScroll();
});
