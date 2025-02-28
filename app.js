const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = {
        beers: beersFromApi
      };

      // console.log('Beers from the database: ', data);
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:beerId', (req, res) => {
  console.log('params', req.params);
  punkAPI
    .getBeer(req.params.beerId)
    .then(beerFromApi => {
      // console.log('Beers from the database: ', data);
      res.render('random-beer', beerFromApi[0]);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const data = responseFromAPI[0];
      res.render('random-beer', data);
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on http://localhost:3000/ '));
