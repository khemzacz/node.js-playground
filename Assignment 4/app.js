const express = require('express');
const bodyParser = require('body-parser');
const usersData = require('./routes/users.js');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(usersData.routes);

app.use('', (req, res, next) => {
    res.redirect('/users/list-users')})

app.listen(3000);