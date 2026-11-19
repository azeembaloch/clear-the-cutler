// File Organizer
// Organizes files in a folder into sub-folders based on their file extensions.
// Usage: node index.js <folder-path>

const fs = require('fs');
const path = require('path');

// The folder to organize is passed as a command line argument
const folderPath = process.argv[2];

if (!folderPath) {
    console.log('Please provide a folder path.');
    console.log('Usage: node index.js <folder-path>');
    process.exit(1);
}

// Read all the files/folders inside the given folder
const files = fs.readdirSync(folderPath);
console.log(files);

for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const filePath = path.join(folderPath, fileName);

    // Skip folders, we only organize files
    if (fs.statSync(filePath).isDirectory()) {
        continue;
    }

    // Get the file extension (without the dot), e.g. "jpg"
    const ext = path.extname(fileName).slice(1);

    // Path of the folder for this extension, e.g. folder/jpg
    const extFolder = path.join(folderPath, ext);

    // Create the folder if it does not already exist
    if (!fs.existsSync(extFolder)) {
        fs.mkdirSync(extFolder);
    }

    const newFilePath = path.join(extFolder, fileName);

    // Move the file only if it does not already exist (never overwrite)
    if (!fs.existsSync(newFilePath)) {
        fs.renameSync(filePath, newFilePath);
        console.log(`Moved ${fileName} to ${ext}/`);
    } else {
        console.log(`${fileName} already exists in ${ext}/, skipping`);
    }
}

console.log('Done!');
