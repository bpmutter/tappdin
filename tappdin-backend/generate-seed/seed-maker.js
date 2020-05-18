const fs = require('fs');

const seed = require('./seed-obj')

const breweriesSet = new Set();
seed.data.forEach(beer => {
    if (beer.breweries && beer.breweries[0].id) {
        breweriesSet.add(
            beer.breweries[0].id
        )
    }
});

const brewerySeed = [];
seed.data.forEach(beer => {
    if (beer.breweries && beer.breweries[0].id) {
        if (breweriesSet.has(beer.breweries[0].id)) {
            brewerySeed.push({
                key: beer.breweries[0].id,
                name: beer.breweries[0].name,
                location: `${beer.breweries[0].locations[0].locality}, ${beer.breweries[0].locations[0].region}`,
                description: beer.breweries[0].description,
                website: beer.breweries[0].website,
                // facebook: beer.breweries[0].id,
                // instagram: beer.breweries[0].id,
                // twitter: beer.breweries[0].id,
                image: beer.breweries[0].images.squareLarge,

            });
            breweriesSet.delete(beer.breweries[0].id);
        }
    }
});

beerSeed = [];
seed.data.forEach(beer=>{
    const beerData = {
        id: beer.id,
        name: beer.name,
        abv: beer.abv || null,
        image: (beer.labels  && beer.labels.large ) ? beer.labels.large : null,
        categoryId: (beer.style && beer.style.category) ? beer.style.category.id : null,
        ibu: (beer.style && beer.style.ibuMax) ? beer.style.ibuMax : null,
        description: (beer.style && beer.style.description) ? beer.style.description : null,
        breweryId: (beer.breweries && beer.breweries[0].id) ? brewerySeed.indexOf(beer.breweries[0].id)+1 : null,
    }
    beerSeed.push(beerData);
});



console.log(beerSeed);

module.exports = {beerSeed}