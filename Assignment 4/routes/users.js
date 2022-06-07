const express = require('express');
const router = express.Router();
const users = [];

router.all('/users/list-users', (req, res, next) => {
    res.render('list-users', {users: users,  pageTitle: 'User list', path: '/users/list-users'});
});
router.get('/users/add-user', (req, res, next) => {
    res.render('add-user', {pageTitle: 'Add user', path: '/users/add-user'});
});

router.post('/users/add-user', (req, res, next) => {
    users.push({name: req.body.name});
    res.redirect('/');
});

exports.routes = router;
exports.users = users;