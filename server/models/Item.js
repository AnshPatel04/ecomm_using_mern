import mongoose from 'mongoose';
// Define the available categories
const validCategories = ['topRated', 'newArrivals', 'bestSellers'];

// Define the schema
const itemSchema = new mongoose.Schema({
    attributes: {
        name: {
            type: String,
            required: true
        },
        sortDescription: {
            type: String,
            required: true
        },
        longDescription: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: validCategories,
            default: 'newArrivals' // Setting default value to 'newArrivals'
        },
        image: {
            type: String,
            required: true
        }
    }
});

// Create a model with auto-generated _id
const Item = mongoose.model('Item', itemSchema);

export default Item;