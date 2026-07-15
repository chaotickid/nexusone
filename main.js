// Added dialog to the electron import and added path module below
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs"); // FIX 1: Required the 'fs' module

let mainWindow;

// Expose synchronous fallback environment mapping
ipcMain.on("get-user-data-path-sync", (event) => {
    event.returnValue = app.getPath("userData");
});

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
    const userIconPath = path.join(app.getPath('userData'), 'assets', 'icon.ico');
    const finalIcon = fs.existsSync(userIconPath) ? userIconPath : null;

    // --- PACKAGING DISK CORRECTION LAYER ---
    const userDataPath = app.getPath("userData");
    const targetUsersFile = path.join(userDataPath, "users.json");
    const targetPartiesFile = path.join(userDataPath, "parties.json");

    // Initialize databases safely on user system root if missing
    if (!fs.existsSync(targetUsersFile)) {
        fs.writeFileSync(targetUsersFile, JSON.stringify({}), "utf-8");
    }
    if (!fs.existsSync(targetPartiesFile)) {
        fs.writeFileSync(targetPartiesFile, JSON.stringify([]), "utf-8");
    }
    // ---------------------------------------

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        icon: finalIcon, 
        frame: false, 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.maximize();
    mainWindow.loadFile("index.html");
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