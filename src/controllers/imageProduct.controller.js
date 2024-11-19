import ImageProduct from '../models/product/imageProduct.model.js';

export const uploadImage = async (req, res) => {
    const { idProduct, idUser } = req.body;
    const productImage = req.file.buffer;

    try {
        const newImageProduct = new ImageProduct({ idProduct, idUser, productImage });
        await newImageProduct.save();
        res.status(201).json({ message: 'Imagen subida exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir la imagen', error });
    }
};

export const getImagesByProduct = async (req, res) => {
    const { idProduct } = req.params;

    try {
        const images = await ImageProduct.find({ idProduct });
        if (!images.length) return res.status(404).json({ message: 'No se encontraron imágenes para este producto' });

        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error al recuperar las imágenes', error });
    }
};