const express = require('express');
const Joi = require('joi');
const app = express();
const cors = require('cors');
app.use(express.json());
//app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



const GOATS = [
    { id: 1, name: 'LeBron James', position: 'SF', team: 'LA Lakers', height: '6-9', weight: '250 lbs', GOATscore: '🐐🐐🐐🐐🐐' },
    { id: 2, name: 'Michael Jordan', position: 'SG', team: 'Chicago Bulls', height: '6-6', weight: '198 lbs', GOATscore: '🐐🐐🐐🐐🐐' },  
    { id: 3, name: 'Kareem Abdul-Jabbar', position: 'C', team: 'LA Lakers', height: '7-2', weight: '225 lbs', GOATscore: '🐐🐐🐐🐐🐐' },
    { id: 4, name: 'Tim Duncan', position: 'SG', team: 'Chicago Bulls', height: '6-11', weight: '250 lbs', GOATscore: '🐐🐐🐐🐐' },
    { id: 5, name: 'Magic Johnson', position: 'SG', team: 'Chicago Bulls', height: '6-9', weight: '215 lbs', GOATscore: '🐐🐐🐐🐐' },
    { id: 6, name: 'Wilt Chamberlain', position: 'C', team: 'LA Lakers', height: '7-1', weight: '275 lbs', GOATscore: '🐐🐐🐐🐐' },
    { id: 7, name: 'Larry Bird', position: 'SG', team: 'Chicago Bulls', height: '6-9', weight: '220 lbs', GOATscore: '🐐🐐🐐🐐' },
    { id: 8, name: 'Bill Russell', position: 'C', team: 'Boston Celtics', height: '6-10', weight: '215 lbs', GOATscore: '🐐🐐🐐🐐' },
    { id: 9, name: 'Hakeem Olajuwon', position: 'C', team: 'Toronto Raptors', height: '7-0', weight: '255 lbs', GOATscore: '🐐🐐🐐🐐' },
    { id: 10, name: 'Stephen Curry', position: 'PG', team: 'Golden State Warriors', height: '6-2', weight: '185 lbs', GOATscore: '🐐🐐🐐' }
];

//READ Request Handlers
app.get('/', cors(), (req, res) => {
    res.send('Hello World!');
});

app.get('/api/goats', (req, res) => {
    res.send(GOATS);
});

app.get('/api/goats/:id', (req, res) => {
    const goat = GOATS.find(g => g.id === parseInt(req.params.id));
    if (!goat) return res.status(404).send('The goat with the given ID was not found.');
    res.send(goat);
});


//CREATE Request Handlers
app.post('/api/goats', (req, res) => {
    const { error } = validateGoat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const goat = {
        id: GOATS.length + 1,
        name: req.body.name
    };
    GOATS.push(goat);
    res.send(goat);
});

//UPDATE Request Handlers
app.put('/api/goats/:id', (req, res) => {
    const goat = GOATS.find(g => g.id === parseInt(req.params.id));
    if (!goat) return res.status(404).send('The goat with the given ID was not found.');

    const { error } = validateGoat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    goat.name = req.body.name;
    res.send(goat);
});   

// DELETE Request Handler

app.delete('/api/goats/:id', (req, res) => {
    const goat = GOATS.find(g => g.id === parseInt(req.params.id));
    if (!goat) return res.status(404).send('The goat with the given ID was not found.');

    const index = GOATS.indexOf(goat);
    GOATS.splice(index, 1);

    res.send(goat);
});


function validateGoat(goat) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(goat, schema);
}


// PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API server is running on port ${port}...`));
