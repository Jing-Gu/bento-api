const fs = require('fs');

const saveToDb = (db) => {
  fs.writeFileSync('./src/v1/database/db.json', JSON.stringify(db, null, 2), {
    encoding: 'utf8',
  });
}

module.exports = { saveToDb };