const fs = require('fs');

const seed = require('./raw-data')

const breweriesSet = new Set();
seed.forEach(beer => {
    if (beer.breweries && beer.breweries[0].id) {
        breweriesSet.add(
            beer.breweries[0].id
        )
    }
});

const brewerySeed = [];
seed.forEach(beer => {
    if (beer.breweries && beer.breweries[0].id) {
        if (breweriesSet.has(beer.breweries[0].id)) {
            brewerySeed.push({
                name: beer.breweries[0].name,
                key: beer.breweries[0].id,
                location: `${beer.breweries[0].locations[0].locality}, ${beer.breweries[0].locations[0].region}`,
                description: beer.breweries[0].description,
                website: beer.breweries[0].website,
                // facebook: beer.breweries[0].id,
                // instagram: beer.breweries[0].id,
                // twitter: beer.breweries[0].id,
                image: beer.breweries[0].images ? beer.breweries[0].images.squareLarge : null,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            breweriesSet.delete(beer.breweries[0].id);
        }
    }
});
const brewerySeedKeys = brewerySeed.map(brewery=> brewery.key);
const beerSeed = [];
seed.forEach(beer=>{
    const beerData = {
        key: beer.id,
        name: beer.name,
        abv: parseFloat(beer.abv) || null,
        image: (beer.labels  && beer.labels.large ) ? beer.labels.large : null,
        beerTypeId: (beer.style && beer.style.category) ? parseInt(beer.style.category.id) : 5,
        ibu: (beer.style && beer.style.ibuMax) ? parseInt(beer.style.ibuMax) : null,
        description: (beer.style && beer.style.description) ? beer.style.description : null,
        breweryId: (beer.breweries && beer.breweries[0].id) ? beer.breweries[0].id : null,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    beerSeed.push(beerData);
});
fs.appendFile('brewery-seed2.js',
          JSON.stringify(brewerySeed),
      function (err){
          if (err) throw err;
          console.log('Brewery seed is created successfully.');
})


fs.appendFile("beer-seed2.js", JSON.stringify(beerSeed), function (err) {
    if (err) throw err;
    console.log("Beer seed is created successfully.");
})
