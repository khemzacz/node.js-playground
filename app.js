const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin.js');
const shopRouter = require('./routes/shop.js');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRouter);
app.use('/admin', adminData.routes);

app.use('', (req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
})

app.use('/users', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'users.html'));
})

app.listen(3000);






