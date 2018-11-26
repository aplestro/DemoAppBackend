// -------- low -------
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
// -------- low -------
const db = low(adapter)

db.defaults({ channels: [], users: []})
  .write()

module.exports = db;