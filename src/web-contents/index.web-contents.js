import {ipcRenderer} from 'electron';

ipcRenderer.once('send:contextmenu', function(e, a) {
});

document.addEventListener('contextmenu', () => {
});
