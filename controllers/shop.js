const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/products',
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true
      });
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product
    .findById(prodId)
    .then(([rows, fieldData]) => {
      res.render('shop/product-detail', {
        product: rows[0],
        pageTitle: rows[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/index'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (prod of products) {
        const cartProductData =
          cart.products.find(p => p.id === prod.id);
        if (cartProductData) {
          cartProducts.push(
            { productData: prod, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });

};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

