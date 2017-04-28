let path = require('path');

let app = require(path.resolve(__dirname, '../server/server'));
let ds = app.datasources.mariadb;
ds.automigrate('stuff', function(err) {
  if (err) throw err;
});
