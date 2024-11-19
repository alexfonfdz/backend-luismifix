import mongoose from 'mongoose';

const historyPurchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            totalPriceProduct: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDIENTE', 'COMPLETO', 'FALLIDO'],
        default: 'PENDIENTE'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('PurchaseHistory', historyPurchaseSchema);