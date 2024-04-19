import Purchases from '../models/purchases/purchases.model.js';
import Provider from '../models/provider/provider.model.js';
import Product from '../models/product/product.model.js';
import MovementType from '../models/type/movementType.model.js';
import HistoryPurchases from '../models/history/historyPurchases.model.js';

export const createPurchase = async (req, res) => {
    const { idProduct, idProvider, linkProvider, priceProduct } = req.body;

    const productFound = await Product.findOne({_id: idProduct});
    if(!productFound) return res.status(400).json({message: "Producto no encontrado"});

    const providerFound = await Provider.findOne({_id: idProvider});
    if(!providerFound) return res.status(400).json({message: "Proveedor no encontrado"});

    if(!linkProvider) return res.status(400).json({message: "El link de compra es requerido"});

    if(!priceProduct) return res.status(400).json({message: "El precio del producto es requerido"});

    if(priceProduct <= 0) return res.status(400).json({message: "El precio no puede ser menor o igual a 0"});
    if(priceProduct > 1000000) return res.status(400).json({message: "El precio no puede ser mayor a 1000000"});

    try{
        const newPurchase = new Purchases({
            idProduct,
            idProvider,
            linkProvider,
            priceProduct
        });

        const purchaseSaved = await newPurchase.save();

        const movementTypeFound = await MovementType.findOne({nameMovementType: "INSERT"});

        const newHistoryPurchases = new HistoryPurchases({
            idPurchase: purchaseSaved._id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id,
        });

        await newHistoryPurchases.save();

        return res.status(201).json({message: "Link de compra creado con éxito"});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const getAllPurchasesForProvider = async (req, res) => {
    const { idProvider } = req.params;

    try{

        const providerFound = await Provider.findOne({_id: idProvider});
        if(!providerFound) return res.status(400).json({message: "Proveedor no encontrado"});

        const purchases = await Purchases.find({idProvider}).populate('idProduct', 'nameProduct');
        if(purchases.length === 0) return res.status(404).json({message: "No hay compras para este proveedor"});

        return res.status(200).json(purchases);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const getAllPurchasesForProduct = async (req, res) => {
    const { idProduct } = req.params;

    try{

        const productFound = await Product.findOne({_id: idProduct});
        if(!productFound) return res.status(400).json({message: "Producto no encontrado"});

        const purchases = await Purchases.find({idProduct}).populate('idProvider', 'nameProvider');
        if(purchases.length === 0) return res.status(404).json({message: "No hay compras para este producto"});

        return res.status(200).json(purchases);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const enablePurchase = async (req, res) => {
    const { id } = req.params;

    try{
        const purchaseFound = await Purchases.findOne({_id: id});
        if(!purchaseFound) return res.status(404).json({message: "Compra no encontrada"});

        if(purchaseFound.statusPurchase) return res.status(400).json({message: "La compra ya está habilitada"});

        purchaseFound.statusPurchase = true;
        await purchaseFound.save();

        const movementTypeFound = await MovementType.findOne({nameMovementType: "ENABLE"});
        
        const newHistoryPurchases = new HistoryPurchases({
            idPurchase: id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id
        });

        await newHistoryPurchases.save();

        return res.status(200).json({message: "Compra habilitada con éxito"});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const disablePurchase = async (req, res) => {
    const { id } = req.params;

    try{
        const purchaseFound = await Purchases.findOne({_id: id});
        if(!purchaseFound) return res.status(404).json({message: "Compra no encontrada"});

        if(!purchaseFound.statusPurchase) return res.status(400).json({message: "La compra ya está deshabilitada"});

        purchaseFound.statusPurchase = false;
        await purchaseFound.save();

        const movementTypeFound = await MovementType.findOne({nameMovementType: "DISABLE"});

        const newHistoryPurchases = new HistoryPurchases({
            idPurchase: id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id
        });

        await newHistoryPurchases.save();

        return res.status(200).json({message: "Compra deshabilitada con éxito"});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const updatePurchase = async (req, res) => {
    const { id } = req.params;
    const {  linkProvider, priceProduct } = req.body;

    try{
        const purchaseFound = await Purchases.findOne({_id: id});
        if(!purchaseFound) return res.status(404).json({message: "Link de compra no encontrado"});

        if(!linkProvider) return res.status(400).json({message: "El link de compra es requerido"});
        if(!priceProduct) return res.status(400).json({message: "El precio del producto es requerido"});
        if(priceProduct <= 0) return res.status(400).json({message: "El precio no puede ser menor o igual a 0"});
        if(priceProduct > 1000000) return res.status(400).json({message: "El precio no puede ser mayor a 1000000"});

        const purchaseUpdated = await Purchases.findByIdAndUpdate(id, {
            linkProvider,
            priceProduct
        });

        await purchaseUpdated.save();

        const movementTypeFound = await MovementType.findOne({nameMovementType: "UPDATE"});
        const newHistoryPurchases = new HistoryPurchases({
            idPurchase: id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id
        });

        await newHistoryPurchases.save();

        return res.status(200).json({message: "Link de compra actualizado con éxito"});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};