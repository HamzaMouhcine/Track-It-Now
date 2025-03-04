const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');
// connecting to database
mongoose.connect(config.database, { useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
	console.log('Connected to the database '+config.database);
})

mongoose.connection.on('error', (err) => {
	console.log('Database error:  '+err);
})

// starting the express app.
const app = express();
const port = 3000;

// requiring users and friends router
const users = require('./routes/users');
const friends = require('./routes/friends');

// to enable requests from frontend to backend
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Users router
app.use('/users', users);

// Friends router
app.use('/friends', friends);

app.get('/', (req, res, next)=> {
	res.end("Welcome");
})

app.listen(port, () => {
	console.log('Server started at port '+port);
});

// <>