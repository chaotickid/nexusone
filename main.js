// Added dialog to the electron import and added path module below
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let mainWindow;

ipcMain.handle("get-user-data-path", () => {
    return app.getPath("userData");
});

// This handler triggers the exact Windows native 'Save As' window shown in your image
ipcMain.handle("show-save-dialog", async (event, defaultName) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        title: "Save PDF Report",
        defaultPath: path.join(app.getPath("documents"), defaultName || "Report.pdf"),
        filters: [
            { name: "PDF Files", extensions: ["pdf"] },
            { name: "All Files", extensions: ["*"] }
        ]
    });
    return result.filePath;
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        frame: false, // Kept exactly as you had it
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.maximize();
    mainWindow.loadFile("index.html"); // Kept exactly as you had it
}

app.whenReady().then(createWindow);

// Custom title bar buttons
ipcMain.on("window-minimize", () => {
    mainWindow.minimize();
});

ipcMain.on("window-close", () => {
    app.quit();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});