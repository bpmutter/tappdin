const express = require("express");
const path = require("path");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Define a route.
app.get("/", async (req, res) => {
  // const user = await fetch("http://localhost:8080/profile")
  const user = {
      email: 'ben@perlmutter.io',
      username: 'ben',
      hashedPassword: '$2a$10$fgwqZaa5nxKewvKag70FM.PrQzHqhtbWIHM5XXKGcffThOwfevZa.', //unhashed = 'abc123'
      firstName: 'Ben',
      lastName: 'Perlmutter',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  // user.Checkin = [
  //   {
  //     userId: 1,
  //     beerId: 1,
  //     rating: 5,
  //     comment: 'yum so beer!!',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },]
  // user.Checkin[0].Beer = {
  //   key: 'c4f2KE',
  //   name: "'Murican Pilsner",
  //   abv: '5.5',
  //   image: 'https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-large.png',
  //   beerTypeId: 8,
  //   ibu: '40',
  //   description: 'This classic and unique pre-Prohibition American-style Pilsener is straw to deep gold in color. Hop bitterness, flavor and aroma are medium to high, and use of noble-type hops for flavor and aroma is preferred. Up to 25 percent corn and/or rice in the grist should be used. Malt flavor and aroma are medium. This is a light-medium to medium-bodied beer. Sweet corn-like dimethylsulfide (DMS), fruity esters and American hop-derived citrus flavors or aromas should not be perceived. Diacetyl is not acceptable. There should be no chill haze. Competition organizers may wish to subcategorize this style into rice and corn subcategories.',
  //   breweryId: 1,
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // };
  // user.Checkin[0].Beer.Brewery = {
  //   key: 'nHLlnK',
  //   name: 'Sierra Nevada Brewing Company',
  //   location: 'Chico, California',
  //   description: 'The Sierra Nevada Brewing Company was established in 1980 by homebrewers Ken Grossman and Paul Camusi. Camusi retired in 1998 and sold his share in the company to Grossman.\r\n' +
  //     '\r\n' +
  //     "Located in Chico, California, Sierra Nevada Brewing is one of the most popular craft breweries currently operating in the United States. Its Pale Ale is world renowned, and the brewery produces almost 700,000 barrels of beer per year. Sierra Nevada's Pale Ale is the second best-selling craft beer in the United States, behind the Boston Beer Company's Samuel Adams Boston Lager.\r\n" +
  //     '\r\n' +
  //     "Sierra Nevada's specialty brews include the winter seasonal Celebration, which is similar to the pale ale, but hoppier; and Summerfest, a lager which is citrusy and sunny.",
  //   website: 'http://www.sierranevada.com/',
  //   image: 'https://brewerydb-images.s3.amazonaws.com/brewery/nHLlnK/upload_IClwuZ-squareLarge.png',
  //   createdAt: new Date(),
  //   updatedAt: new Date()
  // }
  res.render("index", {user});
});

app.get("/create", (req, res) => { res.render("create") });

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.get("/log-in", (req, res) => {
  res.render("log-in")
})

app.get("/profile", (req, res) => {
  res.render("profile");
})

app.get("/review", (req, res) => {
  res.render("review");
})

app.get("/beers", (req, res) => {
  res.render("beers")
})

app.get('/breweries', (req, res) => {
  res.render("breweries")
})


// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
