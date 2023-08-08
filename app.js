import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './util/database.js';
import Product from './models/product.js';
import User from './models/user.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

import invalidRoute from './controllers/faults.js';

app.use(bodyParser.urlencoded({ extended: false }), (req, res, next) =>
  next());
app.use(express.static(path.join(__dirname, 'public')), (req, res, next) =>
  next());

app.use('/admin', adminRoutes, (req, res, next) =>
  next());
app.use(shopRoutes, (req, res, next) =>
  next());

app.use(invalidRoute, (req, res, next) =>
  next());

Product.belongsTo(User, { constants: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


