import PurchaseHistory from '../models/history/historyOrders.model.js';
import Product from '../models/product/product.model.js';
import stripe from '../libs/stripe.js';
import { STRIPE_WEBHOOK_SECRET } from '../server/config.js';

export const getPurchaseHistoryByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const history = await PurchaseHistory.find({ userId }).populate('products.productId');
        if (!history.length) return res.status(404).json({ message: 'No se encontraron compras para este usuario' });

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar el historial de compras', error });
    }
};

export const getAllPurchaseHistories = async (req, res) => {
    try {
        const histories = await PurchaseHistory.find().populate('userId').populate('products.productId');
        if (!histories.length) return res.status(404).json({ message: 'No se encontraron compras' });

        res.json(histories);
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar el historial de compras', error });
    }
};

export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await PurchaseHistory.findOne({ userId, status: 'PENDIENTE' });

        if (!cart) {
            cart = new PurchaseHistory({ userId, products: [], totalAmount: 0 });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
            cart.products[productIndex].totalPriceProduct += cart.products[productIndex].quantity * cart.products[productIndex].totalPriceProduct;
        } else {
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

            cart.products.push({ productId, quantity, totalPriceProduct: product.price * quantity });
        }

        cart.totalAmount = cart.products.reduce((total, item) => total + item.totalPriceProduct, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar al carrito', error });
    }
};

export const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await PurchaseHistory.findOne({ userId, status: 'PENDIENTE' }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar el carrito', error });
    }
};

export const updateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await PurchaseHistory.findOne({ userId, status: 'PENDIENTE' });
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            const product = await Product.findById(productId);
            cart.products[productIndex].totalPriceProduct = product.price * quantity;
        } else {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        cart.totalAmount = cart.products.reduce((total, item) => total + item.totalPriceProduct, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error });
    }
};

export const calculateTotalPrice = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await PurchaseHistory.findOne({ userId, status: 'PENDIENTE' }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const totalPrice = cart.products.reduce((total, item) => total + item.totalPriceProduct, 0);
        res.json({ totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'Error al calcular el precio total', error });
    }
};

export const createCheckoutSession = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await PurchaseHistory.findOne({ userId, status: 'PENDIENTE' }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const lineItems = cart.products.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productId.name,
                    images: [item.productId.image],
                },
                unit_amount: item.productId.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la sesión de pago', error });
    }
};

export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Actualizar el historial de compras con estado 'COMPLETO'
        await PurchaseHistory.findOneAndUpdate(
            { userId: session.client_reference_id, status: 'PENDIENTE' },
            { status: 'COMPLETO' }
        );
    } else if (event.type === 'checkout.session.async_payment_failed') {
        const session = event.data.object;

        // Actualizar el historial de compras con estado 'FALLIDO'
        await PurchaseHistory.findOneAndUpdate(
            { userId: session.client_reference_id, status: 'PENDIENTE' },
            { status: 'FALLIDO' }
        );
    }

    res.json({ received: true });
};