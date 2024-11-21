import TypeUser from '../models/type/typeUser.model.js';
import TypeContact from '../models/type/typeContact.model.js';
import TypeProduct from '../models/type/typeProduct.model.js';
import TypeProvider from '../models/type/typeProvider.model.js';
import TypeStatusRepair from '../models/type/typeStatusRepair.model.js';
import TypeUrgency from '../models/type/typeUrgency.model.js';

// Controlador para obtener los tipos de usuario
export const typesUser = async (req, res) => {
    try {
        const types = await TypeUser.find().select("nameTypeUser");
        return res.status(200).json(types.map(type => type.nameTypeUser));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener los tipos de contacto
export const typesContact = async (req, res) => {
    try {
        const types = await TypeContact.find().select("nameTypeContact");
        return res.status(200).json(types);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener los tipos de producto
export const typesProduct = async (req, res) => {
    try {
        const types = await TypeProduct.find().select("nameTypeProduct");
        return res.status(200).json(types);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener los tipos de proveedor
export const typesProvider = async (req, res) => {
    try {
        const types = await TypeProvider.find().select("nameTypeProvider");
        return res.status(200).json(types);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener los tipos de estado de reparación
export const tyoesStatusRepair = async (req, res) => {
    try {
        const types = await TypeStatusRepair.find().select("nameTypeStatusRepair");
        return res.status(200).json(types);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener los tipos de urgencia
export const typesUrgency = async (req, res) => {
    try {
        const types = await TypeUrgency.find().select("nameTypeUrgency");
        return res.status(200).json(types);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};