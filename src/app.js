const express = require('express');
const handlebars  = require('express-handlebars');
const path = require('path');
const app = express();
const setRouter = require('./routes/setRouter.js');
const port = 3000;

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Setup Router
setRouter(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
