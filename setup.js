const https = require('https');
const fs = require('fs');
const readline = require('readline');

const [ , , filepath ] = process.argv;

var data = "";
var i = 0;

// METADATA URL
// https://github.com/google/material-design-icons/blob/master/update/update_repo.py#L42
const options = {
  hostname: 'fonts.google.com',
  path: '/metadata/icons?incomplete=1',
};
const req = https.get(options, function(res) {
  const rl = readline.createInterface({
    input: res,
  })
  rl.on('line', function(row) {
    if (i > 0) {
      data += row
    }
    i++;
  })
  res.on('end', function() {
    const jsonText = JSON.stringify(JSON.parse(data), null, 2)
    fs.writeFileSync(filepath, jsonText)
    console.log('✅ Done!');
  });
});

req.on('error', function (err) {
  console.log('Error: ', err);
});
