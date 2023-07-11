import productModel from '../models/product.js';
import cartModel from '../models/cart.js';

export function getProducts(req, res, next) {
  productModel.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  }).catch(err => {
    console.log(err);
  });
}

export function getProduct(req, res, next) {
  const prodId = req.params.productId;
  productModel.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

}

export function getIndex(req, res, next) {
  productModel.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err => {
    console.log(err);
  });
}

export function getCart(req, res, next) {
  cartModel.getCart(cart => {
    productModel.fetchAll(products => {
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
}

export function postCart(req, res, next) {
  const prodId = req.body.productId;
  productModel.findById(prodId, (product) => {
    cartModel.addProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

export function postCartDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  productModel.findById(prodId, product => {
    cartModel.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });

}

export function getOrders(req, res, next) {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  });
}

export function getCheckout(req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
}
