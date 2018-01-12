import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    abbreviation: String,
    isSupply: Boolean
});

const Product = mongoose.model('Product', productSchema);

export default Product;
