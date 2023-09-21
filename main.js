// ДЗ
// Створіть папку
const fs = require('node:fs');
const path = require('node:path');
const dirPath = path.join(__dirname, 'folder')
fs.mkdir(dirPath, {recursive:true},(err) => {
    if (err) throw new Error(err.message);
})

// В тій папці створіть 5 папок і 5 файлів

for (let i = 1; i <= 5; i++) {
    const filePath = path.join(__dirname, 'folder', `file${i}.txt`)
    fs.writeFile(filePath, `Hello from File # ${i} !!!`, (err) => {
        if (err) throw new Error(err.message);
    })

    const dirInFolderPath = path.join(__dirname, 'folder', `folder${i}`);
    fs.mkdir(dirInFolderPath, {recursive:true}, (err) => {
        if (err) throw new Error(err.message);
    })
}

// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
// FILE: {fileName}
// FOLDER: {folderName}

fs.readdir(dirPath, {withFileTypes:true}, (err, files)=> {
    if (err) throw new Error(err.message);
    for (const file of files) {
        console.log(file.isFile() ? 'FILE:' : 'FOLDER:', file.name);
    }
})


