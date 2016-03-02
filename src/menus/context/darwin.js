import {remote, ipcRenderer} from 'electron';
const {dialog} = remote;

export default (bw, data) => {
  const {position} = data;
  return [
    {
      label: 'Inspect Element',
      click() {
        bw.webContents.inspectElement(position.x, position.y);
      }
    },
    {
      label: 'Toggle the Devtool',
      click() {
        bw.webContents.toggleDevTools()
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Back',
      enabled: bw.webContents.canGoBack(),
      click() {
        bw.webContents.goBack();
      },
    },
    {
      label: 'Forward',
      enabled: bw.webContents.canGoForward(),
      click() {
        bw.webContents.goForward();
      },
    },
    {
      label: 'Reload',
      click() {
        bw.webContents.reload();
      },
    },
    {
      label: 'Hard Reload',
      click() {
        bw.webContents.reloadIgnoringCache();
      },
    },
    {
      type: 'separator'
    },
    {
      label: 'Cut',
      click() {
        bw.webContents.cut();
      },
    },
    {
      label: 'Copy',
      click() {
        bw.webContents.copy();
      },
    },
    {
      label: 'Paste',
      click() {
        bw.webContents.paste();
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Print',
      click() {
        // TODO: print size
        bw.webContents.print({
          silent: false,
          printBackground: true,
        });
      },
    },
    {
      label: 'Print to PDF',
      click() {
        // TODO: print size
        const opts = {
          marginsType: 0,
          printBackground: true,
          printSelectionOnly: false,
          landscape: false
        };
        bw.webContents.printToPDF(opts, (err, data) => {
          dialog.showSaveDialog(bw, {
            title: 'Print to PDF',
          }, (filePath) => {
            ipcRenderer.send('client:pdf', filePath, data);
          })
        });
      },
    },
  ];
};
