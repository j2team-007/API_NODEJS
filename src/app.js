const express = require('express');
const app = express();
const handlebars  = require('express-handlebars');
const bodyParser = require('body-parser')
const path = require('path');
const setRouter = require('./routes/setRouter.js');
const port = 3000;
const connect  = require('./connect_DB/config.js');

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Set bodyParser JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set template engine is handlebars
app.engine('.hbs', handlebars({ 
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
	extname: '.hbs',
}));

// Set Path to diẻctory to views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Connect to Database
connect.database();

// Setup Router
setRouter(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
