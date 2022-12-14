import { Router } from 'express';
import {
    createProduct,
    createProductReview,
    getAllProducts,
    getProduct,
    getTopProducts,
    removeProduct,
    updateProduct,
} from '../controllers/productsController';
import { asyncHandler } from '../utils/asyncHandler';
import { admin, protect } from '../middlewares/authMiddleware';

const productsRouter = Router();

productsRouter
    .route('/')
    .get(asyncHandler(getAllProducts))
    .post(asyncHandler(protect), asyncHandler(admin), asyncHandler(createProduct));

productsRouter.route('/top').get(asyncHandler(getTopProducts));

productsRouter.route('/:id/reviews').post(asyncHandler(protect), asyncHandler(createProductReview));

productsRouter
    .route('/:id')
    .get(asyncHandler(getProduct))
    .delete(asyncHandler(protect), asyncHandler(admin), asyncHandler(removeProduct))
    .put(asyncHandler(protect), asyncHandler(admin), asyncHandler(updateProduct));

export { productsRouter };
