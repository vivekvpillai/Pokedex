////////////initialization
const express = require('express')
const methodOverride = require('method-override');
const app = express()
const pokemon = require('./models/pokemon.js')

const PORT = 3000;
///////////////////////////////////////
///////////middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
})
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(methodOverride('_method'));
/////////////////////////////////////////

////////listener
app.listen(PORT, () => {
    console.log('pokedex app is listening');
})
///////////////////////////////////

//Put route
app.put('/pokedex/:indexOfPokemonArray', (req,res) => {
 pokemon[req.params.indexOfPokemonArray].name = req.body.name;
 pokemon[req.params.indexOfPokemonArray].img = req.body.img;
 pokemon[req.params.indexOfPokemonArray].stats.hp = req.body.hp;
 pokemon[req.params.indexOfPokemonArray].stats.attack = req.body.attack;
 pokemon[req.params.indexOfPokemonArray].stats.defense = req.body.defense;
// console.log(req.body)
  res.redirect('/pokedex');
  console.log(pokemon[req.params.indexOfPokemonArray])
})

//Post route
app.post('/pokedex/', (req, res) => {

  let newPokemon = {
    name: req.body.name,
    img: req.body.img,
    type: req.body.type.split(' '),
    stats:{
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense
    }
  }
    console.log(newPokemon)
    console.log(req.body.type)
    pokemon.push(newPokemon)
    res.redirect('/pokedex');
})




// Index route
app.get('/pokedex/', (req, res) => {
    res.render(
        'index.ejs',
        {
            allPokemon: pokemon
        }
    )
})


// Edit route
app.get('/pokedex/:indexOfPokemonArray/edit', (req,res) => {
    res.render('edit.ejs',
    {
      pokeChoice: pokemon[req.params.indexOfPokemonArray],
      index: req.params.indexOfPokemonArray
    }

    )
});

// New route
app.get('/pokedex/new', (req,res) => {
  res.render('new.ejs')
});


// Show route
app.get('/pokedex/:indexOfPokemonArray/', (req, res) => {
    res.render(
        'show.ejs',
        {
            pokeChoice: pokemon[req.params.indexOfPokemonArray]
        }
    )
})

app.delete('/pokedex/:indexOfPokemonArray', (req,res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1)
  res.redirect('/pokedex');  //redirect back to index route
});
