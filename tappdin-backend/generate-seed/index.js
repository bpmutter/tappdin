const fetch = require('node-fetch');
const fs = require('fs');

fs.appendFile("raw-data.js", "module.exports = [", function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
(async()=>{
  for (let i = 1; i <= 23; i++) {
    setTimeout(() => {
      fetch(
        `https://sandbox-api.brewerydb.com/v2/beers/?key=860e03434a1b8b2bd65c6c8406264cd7&withBreweries=Y&p=${i}`,
        { mode: "no-cors" }
      )
        .then((res) => res.json())
        .then((json) =>
          json.data.forEach((element) => {
            fs.appendFile(
              "raw-data.js",
              JSON.stringify(element) + ",",
              function (err) {
                if (err) throw err;
                console.log("File is created successfully.");
              }
            );
          })
        )
        .catch((err) => console.log(err));
    }, 500);
  }
})()

fs.appendFile('raw-data.js', "];",
function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
})
