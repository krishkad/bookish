import mongoose from 'mongoose'


const cartSchema = mongoose.Schema({

    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    total: {
        type: Number,
    },

    items: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'books',
                required: true
            }
        }
    ]
} , {timestamps: true});

const cartModel = mongoose.model('cart' , cartSchema);

export default  cartModel;