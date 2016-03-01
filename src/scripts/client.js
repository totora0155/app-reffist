import {remote, ipcRenderer} from 'electron';
const {Menu, clipboard, dialog} = remote;
const bw = remote.getCurrentWindow();
let _type = null;

document.addEventListener('contextmenu', () => {
  console.log(123456789);
  const template = [
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
    {
      type: 'separator',
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
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup(bw);
});

{
  let intervalId = null;
  let height = 0;

  ipcRenderer.on('auto-scroll:start', () => {
    intervalIid = autoScroll();
  });

  ipcRenderer.on('auto-scroll:end', () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });

  function autoScroll() {
    return setInterval(() => {
      window.scrollTo(++height);
    }, 1);
  }
}
