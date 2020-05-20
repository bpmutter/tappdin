const fetch = require('node-fetch');
const fs = require('fs');

let arraux = [];
//for(let i = 1; i <= 23; i++){
  fetch(`https://sandbox-api.brewerydb.com/v2/beers/?key=860e03434a1b8b2bd65c6c8406264cd7&withBreweries=Y&p=$1`,{ mode: 'no-cors'})
    .then((res)=>res.json())
    .then((json)=>(json.data).forEach(element => {
      let breweries = element.breweries;
    //   console.log(breweries)
    //   let {id:key, name, locations:location, description, website, images} = [breweries];

      const value = {
              key = breweries.id,
              name = breweries.name,
              location = breweries.locations,
              description = breweries.description,
              website = breweries.website,
              image = breweries.images,
              createdAt: new Date(),
              updatedAt: new Date()
          }
      fs.appendFile('secondSeedtxt.json',
          JSON.stringify(value)+',',
      function (err){
          if (err) throw err;
          console.log('File is created successfully.');
        })
      }))


    .catch(err=> console.log(err));
