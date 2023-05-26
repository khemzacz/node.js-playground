const fs = require('fs');
const path = require('path');
const pathUtil = require('../util/path');

const p = path.join(pathUtil,
  'data',
  'products.json');

const getProductsFromFile = cb => {
  const p = path.join(pathUtil,
    'data',
    'products.json');
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      if (this.id) {
        const existingProductIndex =
          products.findIndex(prod => prod.id === this.id);
        products[existingProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        products.push(this);
      }

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  remove() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      console.log('this id:' + this.id);
      if (this.id) {
        const existingProductIndex =
          products.findIndex(prod => prod.id === this.id);
        products.splice(existingProductIndex, 1);
        console.log(products);
      } else {

      }

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static parseFromJson(json) {
    return new Product(
      json.id,
      json.title,
      json.imageUrl,
      json.description,
      json.price);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id);
      console.log(product);
      cb(product);
    });
  }
};
