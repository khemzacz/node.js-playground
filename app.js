const express = require('express');
const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log('In the middleware!');
    res.send('<h1>Add product page.</h1>');
});

app.use('/', (req, res, next) => {
    console.log('In the next middleware!');
    res.send('witamy');
});



app.listen(3000);






