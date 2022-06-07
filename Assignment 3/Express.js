const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

app = express();


app.get('/favicon.ico', (req, res) => res.status(204));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'users.html'));
})

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'));
})





app.listen(3000);