import Product from '../models/product.js';

export function getAddProduct(req, res, next) {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
}

export function postAddProduct(req, res, next) {
  const title = req.body.title;
  const image = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: image,
    description: description
  })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

export function getProducts(req, res, next) {
  fetchAll()
    .then(([rows, fieldData]) => {
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
}

export function getEditProduct(req, res, next) {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
}

export function postEditProduct(req, res, next) {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updateTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice);
  updatedProduct.save();
  res.redirect('/products');
}

export function postDeleteProduct(req, res, next) {
  const prodId = req.body.productId;
  deleteById(prodId);
  return res.redirect('/admin/products');
}



