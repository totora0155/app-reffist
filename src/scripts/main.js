import {app} from 'electron';
import ReffistAction from 'actions/reffist-action';
import ReffistStore from 'stores/reffist-store';
import appMenu4Darwin from 'menus/application/darwin';
import trayMenu4Darwin from 'menus/tray/darwin';
import memory from 'memory';

import storage from 'electron-json-storage';
// storage.remove('bookmark');
// storage.set('bookmark', [
//   {
//     "title": "Google",
//     "url": "https://www.google.co.jp/"
//   },
//   {
//     "title": "Yahoo",
//     "url": "https://www.yahoo.co.jp/"
//   }
// ]);

const PORT = 53825;

app.on('ready', () => {
  ReffistAction.setAppMenu(appMenu4Darwin);
  ReffistAction.setTrayMenu(trayMenu4Darwin);

  ReffistStore.addSocketListener((sendData) => {
    ReffistAction.createBW(sendData);
  });
  ReffistAction.connectSocket({
    port: PORT,
  });
});

app.on('window-all-closed', () => {});
