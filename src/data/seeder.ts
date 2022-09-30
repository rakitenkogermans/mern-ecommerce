import { config } from 'dotenv';
import { connectDB } from '../db/connect';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { users } from './users';
import { products } from './products';

config({ path: `.env.${process.env.NODE_ENV}` });
(async () => {
    await connectDB(process.env.MONGO_URL || '');
})();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        await User.insertMany(users);

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.log(`${err}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (err) {
        console.log(`${err}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
