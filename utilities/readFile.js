const fs = require("fs");

function readFile(filePath, callback) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        callback(err, data ? JSON.parse(data) : null);
    });
}

module.exports = readFile;