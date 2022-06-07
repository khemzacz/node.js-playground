const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log('shop.js', adminData.products);
    res.render('shop', {prods: adminData.products, pageTitle: 'Shop', path: '/shop'});
});

module.exports = router;