const fs = require('fs');

function readJSONFile(fileName) {
    try {
        const data = fs.readFileSync(fileName);
        var result = JSON.parse(data);
        return result;
    } catch (err) {
        console.error(err)
    }
};

module.exports.readJSONFile = readJSONFile;