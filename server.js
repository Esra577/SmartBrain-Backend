const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    // port : 3001,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

app.get('/', (req, res) => {
	res.send(database.users);
})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, knex, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})
app.put('/image', (req, res) => { image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(3000, () => {
	console.log('it is running');
})