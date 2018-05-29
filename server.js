const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/*const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

*/
const db = knex({
	client: 'pg',
	connection: {
		host: 'postgresql-sinuous-88759',
		user: 'postgres',
		password: '',
		database: 'smart-brain-db'
	}

});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('it is working')
})

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on port ${process.env.PORT}');
})




/*app.post('/signin', (req, res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			//console.log(isValid);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						//console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
})


app.post('/register', (req, res) => {
	const {
		email,
		name,
		password
	} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
			trx.insert({
					hash: hash,
					email: email
				})
				.into('login')
				.returning('email')
				.then(loginEmail => {
					return trx('users')
						.returning('*')
						.insert({
							email: loginEmail[0],
							name: name,
							joined: new Date()
						})
						.then(user => {
							res.json(user[0]);
						})
				})
				.then(trx.commit)
				.catch(trx.rollback)

		})
		.catch(err => res.status(400).json('unable to register'))

})

app.get('/profile/:id', (req, res) => {
	const {
		id
	} = req.params;
	db.select('*').from('users').where({
			id
		})
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('NOT found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
})
*/




/*
app.put('/image', (req, res) => {
	const {
		id
	} = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
})


app.post('/signin', signin.handleSignin(db, bcrypt)(req, res))

app.post('/register', (reg, res) => {
	register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db)
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on port ${process.env.PORT}');
})
*/
