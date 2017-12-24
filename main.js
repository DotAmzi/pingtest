const {app, BrowserWindow, ipcMain} = require('electron')
var ping = require('ping');

let win


function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/icon.png'})

  win.loadURL(`file://${__dirname}/pages/ping.html`)

  // Open the DevTools.
  win.webContents.openDevTools()


  ipcMain.on('testPing', function(event, arg) {
    console.log('entrou aqui');
    return new Promise(resolve => {
      var host = '8.23.24.100';

      for(i=0;i<20;i++){
        ping.promise.probe(host)
            .then(function (res) {
              console.log(res.time);
                resolve(res.time);
            });
      }
    });
  });

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
