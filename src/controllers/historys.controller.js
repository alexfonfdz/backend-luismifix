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
            const product = await Product.findOne({nameProduct: nameProduct});
            query.idProduct = product._id;
        }
        if (nameUser) {
            const user = await User.findOne({username: nameUser});
            query.idUser = user._id;
        }
        if (date) {
            query.date = date;
        }

        const historyProducts = await HistoryProduct.find(query).populate('idProduct', 'nameProduct').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
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
            const product = await Product.findOne({nameProduct: nameProduct});
            if (product) {
                const purchases = await Purchase.find({idProduct: product._id});
                query.idPurchase = { $in: purchases.map(purchase => purchase._id) };
            }
        }
        if (nameUser) {
            const user = await User.findOne({username: nameUser});
            if (user) {
                query.idUser = user._id;
            }
        }
        if (date) {
            query.date = date;
        }

        const historyPurchases = await HistoryPurchases.find(query).populate('idPurchase').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
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
            const provider = await Provider.findOne({nameProvider: nameProvider});
            if (provider) {
                query.idProvider = provider._id;
            }
        }
        if (nameUser) {
            const user = await User.findOne({username: nameUser});
            if (user) {
                query.idUser = user._id;
            }
        }
        if (date) {
            query.date = date;
        }

        const historyProviders = await HistoryProvider.find(query).populate('idProvider', 'nameProvider').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        return res.status(200).json(historyProviders);

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const moreDetailsHistoryProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const historyProduct = await HistoryProduct.findById(id).populate('idProduct', 'nameProduct').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        return res.status(200).json(historyProduct);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const moreDetailsHistoryPurchase = async (req, res) => {
    try{
        const {id} = req.params;
        const historyPurchase = await HistoryPurchases.findById(id).populate('idPurchase').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        const purchase = await Purchase.findById(historyPurchase.idPurchase).populate('idProduct', 'nameProduct').populate('idProvider', 'nameProvider');
        return res.status(200).json(historyPurchase, purchase);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const moreDetailsHistoryProvider = async (req, res) => {
    try{
        const {id} = req.params;
        const historyProvider = await HistoryProvider.findById(id).populate('idProvider', 'nameProvider').populate('idMovementType', 'nameMovementType').populate('idUser', 'username');
        return res.status(200).json(historyProvider);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};