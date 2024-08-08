const fs = require('fs');
const crypto = require('crypto');

class Hash {

    static calculateHash(filePath) {
        const fileData = fs.readFileSync(filePath);
        const hash = crypto.createHash('sha256').update(fileData).digest('hex');
        return hash;
    }
}

module.exports = { Hash };