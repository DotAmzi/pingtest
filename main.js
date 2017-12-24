const {app, BrowserWindow, ipcMain} = require('electron')
var ping = require('ping');
let win


function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, icon: __dirname + '/icon.png'})

  win.loadURL(`file://${__dirname}/pages/ping.html`)

  // Open the DevTools.
  win.webContents.openDevTools()

  var count = []

  for (var i = 0; i < 50; i++) {
    count.push(i);
  }

  ipcMain.on('testPing', function(event, arg) {

    let middle = 0;
    count.map(countUnique => {
      ping.promise.probe('8.23.24.100')
      .then(res => {
        middle += res.time;
        if(countUnique === 19){
          event.sender.send('pingMiddle', middle/20);
        }
      });
    })

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
