express = require('express');
const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/users', (req, res, next) => {
    console.log("I'm in the users middleware.");
    res.send("<h1>Hello in 'users'.</h1>");
});

app.use('/', (req, res, next) => {
    console.log("I'm in the default middleware.");
    res.send("<h1>Hello in assignment number 2!</h1>");
});




app.listen(3000);