import HistoryProduct from '../models/history/historyProduct.model.js';
import HistoryPurchases from '../models/history/historyPurchases.model.js';
import HistoryProvider from '../models/history/historyProvider.model.js';
import Purchase from '../models/purchases/purchases.model.js';
import Provider from '../models/provider/provider.model.js';
import User from '../models/user/user.model.js';
import Product from '../models/product/product.model.js';

export const getAllHistoryProducts = async (req, res) => {
    try{
        const historyProducts = await HistoryProduct.find().populate('idProduct', 'nameProduct').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        return res.status(200).json(historyProducts);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const getAllHistoryPurchases = async (req, res) => {
    try{
        const historyPurchases = await HistoryPurchases.find().populate('idPurchase').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        return res.status(200).json(historyPurchases);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const getAllHistoryProviders = async (req, res) => {
    try{
        const historyProviders = await HistoryProvider.find().populate('idProvider', 'nameProvider').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        return res.status(200).json(historyProviders);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const searchInHistoryProductsForNameProductUserDate = async (req, res) => {
    try{
        const {nameProduct, nameUser, date} = req.body;

        let query = {};
        if (nameProduct) {
            const product = await Product.findOne({nameProduct: {$regex: nameProduct, $options: 'i'}});
            if (!product) return res.status(404).json({message: 'Producto no encontrado'});
            query.idProduct = product._id;
        }
        if (nameUser) {
            const user = await User.findOne({username: {$regex: nameUser, $options: 'i'}});
            if (!user) return res.status(404).json({message: 'Usuario no encontra'});
            query.idUser = user._id;
        }
        if (date) {
            const [year, month, day] = date.split('-');
            const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
            query.dateMovement = { $gte: startOfDay, $lte: endOfDay };
        }

        const historyProducts = await HistoryProduct.find(query).populate('idProduct', 'nameProduct').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        if (historyProducts.length === 0) return res.status(404).json({message: 'No se encontraron productos en el historial con esos datos'});
        return res.status(200).json(historyProducts);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const searchInHistoryPurchasesForNameProductUserDate = async (req, res) => {
    try{
        const {nameProduct, nameUser, date} = req.body;

        let query = {};
        if (nameProduct) {
            const product = await Product.findOne({nameProduct: {$regex: nameProduct, $options: 'i'}});
            if (!product) return res.status(404).json({message: 'Producto no encontrado'});
            const purchases = await Purchase.find({idProduct: product._id});
            query.idPurchase = { $in: purchases.map(purchase => purchase._id) };
        }
        if (nameUser) {
            const user = await User.findOne({username: {$regex: nameUser, $options: 'i'}});
            if (!user) return res.status(404).json({message: 'Usuario no encontrado'});
            query.idUser = user._id;
        }
        if (date) {
            const [year, month, day] = date.split('-');
            const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const historyPurchases = await HistoryPurchases.find(query).populate('idPurchase').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        if (historyPurchases.length === 0) return res.status(404).json({message: 'No se encontraron compras en el historial con esos datos'});
        return res.status(200).json(historyPurchases);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const searchInHistoryProvidersForNameProviderUserDate = async (req, res) => {
    try{
        const {nameProvider, nameUser, date} = req.body;

        let query = {};
        if (nameProvider) {
            const provider = await Provider.findOne({nameProvider: {$regex: nameProvider, $options: 'i'}});
            if (!provider) return res.status(404).json({message: 'Proveedor no encontrado'});
            query.idProvider = provider._id;
        }
        if (nameUser) {
            const user = await User.findOne({username: {$regex: nameUser, $options: 'i'}});
            if (!user) return res.status(404).json({message: 'Usuario no encontrado'});
            query.idUser = user._id;
        }
        if (date) {
            const [year, month, day] = date.split('-');
            const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const historyProviders = await HistoryProvider.find(query).populate('idProvider', 'nameProvider').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        if (historyProviders.length === 0) return res.status(404).json({message: 'No se encontraron proveedores en el historial con esos datos'});
        return res.status(200).json(historyProviders);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const moreDetailsHistoryProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const historyProduct = await HistoryProduct.findById(id).populate('idProduct', 'nameProduct').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        const product = await Product.findById(historyProduct.idProduct).populate('idTypeProduct', 'nameTypeProduct');
        return res.status(200).json({historyProduct, product});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const moreDetailsHistoryPurchase = async (req, res) => {
    try{
        const {id} = req.params;
        const historyPurchase = await HistoryPurchases.findById(id).populate('idPurchase').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        const purchase = await Purchase.findById(historyPurchase.idPurchase).populate('idProduct', 'nameProduct').populate('idProvider', 'nameProvider');
        return res.status(200).json({historyPurchase, purchase});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const moreDetailsHistoryProvider = async (req, res) => {
    try{
        const {id} = req.params;
        const historyProvider = await HistoryProvider.findById(id).populate('idProvider', 'nameProvider').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        const provider = await Provider.findById(historyProvider.idProvider);
        return res.status(200).json({historyProvider, provider});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};