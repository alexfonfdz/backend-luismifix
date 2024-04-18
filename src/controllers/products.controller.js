import Product from '../models/product/product.model';
import TypeProduct from '../models/type/typeProduct.model';
import HistoryProduct from '../models/history/historyProduct.model';
import MovementType from '../models/type/movementType.model';

export const createProduct = async (req, res) => {
    const { idTypeProduct, nameProduct, amountProduct, priceProduct, descriptionProduct } = req.body;

    try{
        if(idTypeProduct === "" || nameProduct === "" || amountProduct === "" || priceProduct === "" || descriptionProduct === "") return res.status(400).json({message: "Por favor, rellene todos los campos"});

        if(amountProduct < 0) return res.status(400).json({message: "La cantidad no puede ser menor a 0"});
        if(priceProduct < 0) return res.status(400).json({message: "El precio no puede ser menor a 0"});
        if(descriptionProduct.length < 10) return res.status(400).json({message: "La descripción debe tener al menos 10 caracteres"});
        if(descriptionProduct.length > 500) return res.status(400).json({message: "La descripción no puede tener más de 500 caracteres"});
        if(nameProduct.length < 3) return res.status(400).json({message: "El nombre del producto debe tener al menos 3 caracteres"});
        if(nameProduct.length > 50) return res.status(400).json({message: "El nombre del producto no puede tener más de 50 caracteres"});
        if(amountProduct > 1000000) return res.status(400).json({message: "La cantidad no puede ser mayor a 1000000"});
        if(priceProduct > 1000000) return res.status(400).json({message: "El precio no puede ser mayor a 1000000"});

        const idTypeProductFound = await TypeProduct.findById(idTypeProduct);

        if(!idTypeProductFound) return res.status(400).json({message: "Tipo de producto no encontrado"});

        const productFound = await Product.findOne({nameProduct});

        if(productFound) return res.status(400).json({message: "El producto ya existe"});

        const newProduct = new Product({
            idTypeProduct,
            nameProduct,
            amountProduct,
            priceProduct,
            descriptionProduct
        });

        const productSaved = await newProduct.save();

        const movementTypeFound = await MovementType.findOne({nameMovementType: "INSERT"});

        const newHistoryProduct = new HistoryProduct({
            idProduct: productSaved._id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id,
        });

        const historyProductSaved = await newHistoryProduct.save();

        return res.status(201).json({message: "Producto creado con éxito"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }

};


export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().populate('idTypeProduct', 'nameTypeProduct');
        return res.status(200).json(products);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const product = await Product.findById(id).populate('idTypeProduct', 'nameTypeProduct');
        if(!product) return res.status(404).json({message: "Producto no encontrado"});
        return res.status(200).json(product);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const searchProductForName = async (req, res) => {
    const { name } = req.params;

    try{
        const products = await Product.find({nameProduct: {$regex: name, $options: 'i'}}).populate('idTypeProduct', 'nameTypeProduct');
        return res.status(200).json(products);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { idTypeProduct, nameProduct, amountProduct, priceProduct, descriptionProduct } = req.body;

    try{
        if(idTypeProduct === "" || nameProduct === "" || amountProduct === "" || priceProduct === "" || descriptionProduct === "") return res.status(400).json({message: "Por favor, rellene todos los campos"});

        const idTypeProductFound = await TypeProduct.findById(idTypeProduct);

        if(!idTypeProductFound) return res.status(400).json({message: "Tipo de producto no encontrado"});

        if(amountProduct < 0) return res.status(400).json({message: "La cantidad no puede ser menor a 0"});
        if(priceProduct < 0) return res.status(400).json({message: "El precio no puede ser menor a 0"});
        if(descriptionProduct.length < 10) return res.status(400).json({message: "La descripción debe tener al menos 10 caracteres"});
        if(descriptionProduct.length > 500) return res.status(400).json({message: "La descripción no puede tener más de 500 caracteres"});
        if(nameProduct.length < 3) return res.status(400).json({message: "El nombre del producto debe tener al menos 3 caracteres"});
        if(nameProduct.length > 50) return res.status(400).json({message: "El nombre del producto no puede tener más de 50 caracteres"});
        if(amountProduct > 1000000) return res.status(400).json({message: "La cantidad no puede ser mayor a 1000000"});
        if(priceProduct > 1000000) return res.status(400).json({message: "El precio no puede ser mayor a 1000000"});

        const productFound = await Product.findById(id);

        if(!productFound) return res.status(404).json({message: "Producto no encontrado"});

        const productExists = await Product.findOne({nameProduct});

        if(productExists && productExists._id != id) return res.status(400).json({message: "El producto ya existe"});

        const productUpdated = await Product.findByIdAndUpdate(id, {
            idTypeProduct,
            nameProduct,
            amountProduct,
            priceProduct,
            descriptionProduct
        });

        const movementTypeFound = await MovementType({nameMovementType: "UPDATE"});

        const newHistoryProduct = new HistoryProduct({
            idProduct: id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id
        });

        const historyProductSaved = await newHistoryProduct.save();

        return res.status(200).json({message: "Producto actualizado con éxito"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }

};

export const disableProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const productFound = await Product.findById(id);

        if(!productFound) return res.status(404).json({message: "Producto no encontrado"});

        const productDisabled = await Product.findByIdAndUpdate(id, {statusProduct: false});

        const movementTypeFound = await MovementType.findOne({nameMovementType: "DISABLE"});

        const newHistoryProduct = new HistoryProduct({
            idProduct: id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id
        });

        const historyProductSaved = await newHistoryProduct.save();

        return res.status(200).json({message: "Producto deshabilitado con éxito"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

export const enableProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const productFound = await Product.findById(id);

        if(!productFound) return res.status(404).json({message: "Producto no encontrado"});

        const productEnabled = await Product.findByIdAndUpdate(id, {statusProduct: true});

        const movementTypeFound = await MovementType.findOne({nameMovementType: "ENABLE"});

        const newHistoryProduct = new HistoryProduct({
            idProduct: id,
            idMovementType: movementTypeFound._id,
            idUser: req.user.id
        });

        const historyProductSaved = await newHistoryProduct.save();

        return res.status(200).json({message: "Producto habilitado con éxito"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }
};