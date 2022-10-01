import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { StatusCodes } from '../constants/statusCodes';
import { BadRequestError, NotFoundError } from '../errors';

const getAllProducts = async (
    req: Request<
        unknown,
        unknown,
        unknown,
        { keyword: string; pageNumber: string; perPage: string }
    >,
    res: Response
) => {
    const pageSize = Number(req.query.perPage) || 4;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword;
    const query = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const getProduct = async (req: Request<{ id: string }>, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.json(product);
};

const removeProduct = async (req: Request<{ id: string }>, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    await product.remove();
    res.json({ message: 'Product removed' });
};

const createProduct = async (req: Request, res: Response) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: res.locals.userId,
        image: '/assets/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(StatusCodes.OK).json(createdProduct);
};

const updateProduct = async (
    req: Request<
        { id: string },
        unknown,
        {
            name: string;
            image: string;
            brand: string;
            category: string;
            description: string;
            price: string;
            countInStock: string;
        }
    >,
    res: Response
) => {
    const { name, image, brand, category, description, price, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new NotFoundError('Product not found');
    }

    product.name = name || product.name;
    product.price = Number(price) || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = Number(countInStock) || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
};

const createProductReview = async (
    req: Request<
        { id: string },
        unknown,
        {
            rating: string;
            comment: string;
        }
    >,
    res: Response
) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new NotFoundError('Product not found');
    }

    const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === res.locals.userId.toString()
    );

    if (alreadyReviewed) {
        throw new BadRequestError('Product already reviewed');
    }

    const review = {
        name: res.locals.userName,
        rating: Number(rating),
        comment,
        user: res.locals.userId,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(StatusCodes.CREATED).json({ message: 'Review added' });
};

const getTopProducts = async (req: Request, res: Response) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
};

export {
    getProduct,
    getAllProducts,
    removeProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
};
