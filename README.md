# Tappdin: A Beer Tracking App
*By [Johnny Bui](https://github.com/JBui923) (front-end lead) [Giancarlo Sanchez](https://github.com/giancarlo-sanchez) (backend lead), and [Ben Perlmutter](https://github.com/bpmutter) (project manager)*
* [Live version](http://tappdin.herokuapp.com/)
* [Backend Github repo](https://github.com/bpmutter/tappdin-backend)
* [Project Overview Presentation](https://docs.google.com/presentation/d/10oj08Ui1VeKpdLh826dOvSCKTy7ddCq2_fsc34zgWfU/edit?usp=sharing)

**Table of Contents**:
* [Tappdin at a Glance](https://github.com/bpmutter/tappdin/blob/master/README.md#tappdin-at-a-glance)
* [Application Architecture and Technologies Used](https://github.com/bpmutter/tappdin/blob/master/README.md#application-architecture-and-technologies-used)
* [Frontend Overview](https://github.com/bpmutter/tappdin/blob/master/README.md#frontend-overview)
* [Backend Overview](https://github.com/bpmutter/tappdin/blob/master/README.md#backend-overview)
* [Conclusion & Next Steps](https://github.com/bpmutter/tappdin/blob/master/README.md#conclusion)
## Tappdin At a Glance 
Tappdin is a beer tracking app modeled on [Untappd](https://untappd.com/). It allows users to create accounts, post and delete checkins of beers, view the checkins of other users, and discover new beers. 

Tappdin currently possesses a database of 500 beers from almost 20 breweries that users can explore and review, which we call **checkins** to maintain consistency with the original Untappd app. 

## Application Architecture and Technologies Used 
Tappdin was built using separate front and back end servers that communicate via RESTful APIs. 

Both front and backend servers are built using the Express NodeJS framework. We used a PostgreSQL (postgres) database to store all application data. 

The front end uses the [Pug](https://pugjs.org/api/getting-started.html) templating engine to render views from the frontend server. We used vanilla Javascript for interactivity and standard CSS  for styling. 

The backend uses a suite of libraries for application security and building its API routes (discussed further in the backend section below). To connect our backend to the  postgres database we implemented the [Sequelize ORM](https://sequelize.org/).  We also seeded the database using beer and brewery information from [BreweryDB API](https://brewerydb.com/developers/).

![Application architecture](/readme-assets/application-architecture.png)

## Frontend Overview
As Tappdin, is a quite straightforward CRUD app with simple interactivity, we were able to build out the front end without any AJAX and minimal client-side Javascript. There are actually only 6 lines of frontend Javascript, which were used for the 'Demo User' login button!

We made extensive use of the **Pug templating engine** to render dynamic content and create reusable HTML components that we were able to deploy across multiple views on the site. 

### Dynamic Templating with Pug
For instance, we created a Pug mixin (the Pug equivalent of a JS function) to create relevant checkins across different views. We paired this with a component that took an array of checkin objects to dynamically render the associated  checkins in its context (checkins by user on homepage, checkins about brewery on brewery page, etc.)

Pug code snippet of checkins mixin: 
```pug
mixin checkin(checkin)
    .checkin
        head    
            link(rel="stylesheet" type="text/css" href="/styles/checkin.css")
        img.checkin__profile-picture(src=checkin.User.photo)
        .checkin__main
            p #[a(href=`/users/${checkin.User.id}`) #{checkin.User.firstName} #{checkin.User.lastName}] drank #[a(href=`/beers/${checkin.Beer.id}`) #{checkin.Beer.name}] from #[a(href=`/breweries/${checkin.Beer.Brewery.id}`) #{checkin.Beer.Brewery.name}]
            .checkin__rating
                p Rating: 
                    span.checkin__rating-val=checkin.displayRating
                        //-created from the script
            if checkin.comment
                p=checkin.comment
            else 
                p No comment
            div.checkin__other-info
                span.checkin__date=checkin.createdAt
                if checkin.isSessionUser 
                    span.checkin__delete #[a(href=`/checkins/${checkin.id}/delete`) Delete checkin]
        img.checkin__profile-picture(src=checkin.Beer.Brewery.image)
```
Pug code snippet of dynamically rendering all the checkins for a particular view: 
```pug
section.recent-activity
    include checkin
    head
        link(rel="stylesheet" type="text/css" href="/styles/recent-activity.css")
    h2 Recent Activity
    div#checkin__container
        if checkins.length
            each checkin in checkins
                +checkin(checkin)
        else
            p It looks like there aren't any reviews yet
```

![Example beer checkin](/readme-assets/checkin-example.png)

### Refactoring the Way to Reusable Code 
The most challenging aspect of the front end of Tappdin was probably the sheer number of different views that we had to create, and how to serve content dynamically into them. 

This required us to get creative in how we created that content, using Pug mixins, various layouts, and a whole lot of CSS code. We also had to figure out how to send the relevant data to the views form the server to make code reusable across different views. 

There was no secret sauce that we used to make the code module and reusable. Our general process was:
1. hard coding how we wanted something to look with Pug, CSS, and dummy data provided inline.
2. Then we would refactor to add dynamic data from the server
3. Finally, we’d modularize the component to reuse accross other parts of the site. 


## Backend Overview 
Our backend was primarily a collection of RESTful APIs that we used to query our database for relevant data on beer, breweries, and app users. 

We made extensive use of the Sequelize ORM to make fairly complex queries of data associated across multiple tables. Once we had the database built and setup in the ORM, these queries were fairly straightforward, if somewhat challenging to execute due to the sometimes obtuse Sequelize syntax. 

### Authentication and Application Security
We used a JSON Web Token (JWT) to authorize our users across sessions. We stored the JWT in a cookie in the browser, which we would send along for verification with backend server requests. We used the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) node library for this. 

We also used the [csurf](https://www.npmjs.com/package/csurf) package on our frontend server to protect against CSURF attacks and the [bcryot](https://www.npmjs.com/package/bcrypt) hashing library to protect user passwords. 
### Relational Database Model
One of the larger challenges of the project was to design a relational database schema to associate our data. Before we wrote a single line of code, we designed the database with all the tables we’d need and their relationships to each other. 

We then had to translate that to 0ur Sequelize models where we we created associations between the tables so that we easily query across them (basically the Sequelize version of standard postgres INNER JOIN).

This was the final database schema: 
![Tappdin database schema](readme-assets/database-schema.png)

**Notes on the database schema**:
* Foreign keys are denoted by FK 
* Yellow boxes represent many-to-many join tables
* Blue boxes have one-to-many relationships with associated foreign keys
* As of writing (5/24/20), Tappdin doesn’t yet have implemented the Liked Brewery and beer List functionality. However, these tables are in the database, and the relations are set up in the Sequelize models. We would like to implement this functionality at a later point. 

### Seeding the Database
Seeding the database was probably the most technically intensive part of the entire project. As noted above, we used the BreweryDB API to seed our database with information about beers and breweries. 

While BreweryDB was a great (and free!) resource for generating seed data, the way that the data was structured in BreweryDB was not compatible with our database design. 

BreweryDB used 6-character strings as the primary keys for their breweries, whereas we had to use integers at primary keys (PKs) due to restrictions in the Sequelize ORM only permitting integer PKs. 

Matters were further complicated by the fact that we needed to seed the breweries for the database before we seeded the beer to allow for the foreign keys (FKs) in the Beers table to be dependent on the Breweries table. However, the relationships within BreweryDB API structure required that we query beers before we could access the dependent breweries. 

We therefore had to: 
1. Create a list of all breweries we were to use in our seed data.
2. Add integer primary keys to each brewery instance
3. Reassociate these brewery primary keys with their associated beers

To solve this problem, we first did a pass through all 500 beers we were going to use where we created a [Javascript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) to capture only the unique breweries. 

**Seed Set Code:**
```js
const seed = require('./raw-data')

const breweriesSet = new Set();
seed.forEach(beer => {
    if (beer.breweries && beer.breweries[0].id) {
        breweriesSet.add(
            beer.breweries[0].id
        )
    }
});

```

We then converted that set into an array, so we could easily create PKs from the position in the array. Our PKs, were just the position+1. 

**Converting the set into useable array:**
```js
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
                image: beer.breweries[0].images ? beer.breweries[0].images.squareLarge : null,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            breweriesSet.delete(beer.breweries[0].id);
        }
    }
});
```
Once we had the brewery data in a Sequelize-compatible format, we reassociated it with the beer table, adding the relevant beer as a FK referenced by it’s ID.

We then removed and/or renamed keys in the beer and brewery JSON objects to be compatible with the database schema. 

Finally, we wrote the data out into JS files, in which we exported the arrays of beer/brewery POJOs to the Sequelize seed file, from where we added it to the database. 
## Conclusion
This project represented our first full-stack application. It was, to put it modestly, a challenge.  But with that being said, we would also consider it to be a very successful effort—we met our MVP goals and created a full-stack CRUD application that now lives on the internet, and a pretty decent looking one too. 

While the project has been deployed that doesn’t mean we are done with it yet. A couple of features that we haven’t been able to add, but would like to are: 
* Make the whole project responsive
* Add functionality for Liked Breweries and Lists of beers (already built into database, as noted above, but not yet implemented in app)
* Refine search functionality
* Comprehensively review error handling to make sure that we properly handle all 
* Add view and backend API to render all beers associated with a particular brewery 

Thanks for reading, cheers! 🍻
