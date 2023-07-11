import path from 'path';

import { Router } from 'express';

import { getAddProduct, postAddProduct, getEditProduct, getProducts, postEditProduct, postDeleteProduct } from '../controllers/admin.js';

const router = Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId',
  getEditProduct);

router.get('/products', getProducts);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);

export default router;
