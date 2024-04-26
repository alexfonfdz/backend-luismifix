import Provider from '../models/provider/provider.model.js';
import ProviderContact from '../models/provider/providerContact.model.js';
import TypeProvider from '../models/type/typeProvider.model.js';
import TypeContact from '../models/type/typeContact.model.js';
import HistoryProvider from '../models/history/historyProvider.model.js';
import MovementType from '../models/type/movementType.model.js';

export const createProvider = async (req, res) => {

    try{
        const { idTypeProvider, nameProvider, noteProvider } = req.body;

        if(!idTypeProvider || !nameProvider || !noteProvider) return res.status(400).json({ message: 'No puede haber datos vacíos' });
        if(nameProvider.length > 50) return res.status(400).json({ message: 'El nombre del proveedor no puede tener más de 50 caracteres' });
        if(noteProvider.length > 350) return res.status(400).json({ message: 'La nota del proveedor no puede tener más de 350 caracteres' });

        const typeProvider = await TypeProvider.findById(idTypeProvider);

        if(!typeProvider) return res.status(400).json({ message: 'Tipo de proveedor no encontrado' });

        const newProvider = new Provider({ idTypeProvider, nameProvider, noteProvider });

        const providerSaved = await newProvider.save();

        const movementType = await MovementType.findOne({ nameMovementType: 'INSERT' });

        const newHistoryProvider = new HistoryProvider({ idProvider: providerSaved._id, idMovementType: movementType._id, idUser: req.user.id });

        await newHistoryProvider.save();

        return res.status(201).json({ message: 'Proveedor creado con éxito'});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const getProviders = async (req, res) => {
    try{
        const providers = await Provider.find().populate('idTypeProvider', 'nameTypeProvider');

        return res.status(200).json(providers);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const getProvider = async (req, res) => {
    try{
        const { id } = req.params;

        const provider = await Provider.findById(id).populate('idTypeProvider', 'nameTypeProvider');

        if(!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });

        return res.status(200).json(provider);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const getProviderContacts = async (req, res) => {
    try{
        const { idProvider } = req.params;

        const provider = await Provider.findById(idProvider);

        if(!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });

        const providerContacts = await ProviderContact.find({ idProvider: provider.id }).populate('idTypeContact', 'nameTypeContact').populate('idProvider', 'nameProvider');

        return res.status(200).json(providerContacts);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const createProviderContact = async (req, res) => {
    try{
        const { idTypeContact, idProvider, data } = req.body;

        if(!idTypeContact || !idProvider || !data) return res.status(400).json({ message: 'No puede haber datos vacíos' });

        const typeContact = await TypeContact.findById(idTypeContact);

        if(!typeContact) return res.status(400).json({ message: 'Tipo de contacto no encontrado' });

        const provider = await Provider.findById(idProvider);

        if(!provider) return res.status(400).json({ message: 'Proveedor no encontrado' });

        const newProviderContact = new ProviderContact({ idTypeContact, idProvider, data });

        await newProviderContact.save();

        return res.status(201).json({ message: 'Contacto de proveedor creado con éxito' });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const searchProviderForName = async (req, res) => {
    try{
        const { name } = req.params;

        const providers = await Provider.find({ nameProvider: { $regex: name, $options: 'i' } }).populate('idTypeProvider', 'nameTypeProvider');

        return res.status(200).json(providers);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const updateProvider = async (req, res) => {
    try{
        const { id } = req.params;
        const { idTypeProvider, nameProvider, noteProvider } = req.body;
        console.log(req)
        console.log(req.body)

        if(!idTypeProvider || !nameProvider || !noteProvider) return res.status(400).json({ message: 'No puede haber datos vacíos' });
        if(nameProvider.length > 50) return res.status(400).json({ message: 'El nombre del proveedor no puede tener más de 50 caracteres' });
        if(noteProvider.length > 350) return res.status(400).json({ message: 'La nota del proveedor no puede tener más de 350 caracteres' });

        const typeProvider = await TypeProvider.findById(idTypeProvider);

        if(!typeProvider) return res.status(400).json({ message: 'Tipo de proveedor no encontrado' });

        const provider = await Provider.findById(id);

        if(!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });

        const providerExists = await Provider.findOne({ nameProvider });
        console.log(providerExists)
        console.log('Id Query: ', id)
        console.log(provider)
        if(providerExists && providerExists._id != id) return res.status(400).json({ message: 'Ya existe un proveedor con ese nombre' });

        const newProvider = await Provider.findByIdAndUpdate(id, { idTypeProvider, nameProvider, noteProvider });

        await newProvider.save();

        const movementType = await MovementType.findOne({ nameMovementType: 'UPDATE' });

        const newHistoryProvider = new HistoryProvider({ idProvider: id, idMovementType: movementType._id, idUser: req.user.id });

        await newHistoryProvider.save();

        await provider.save();

        return res.status(200).json({ message: 'Proveedor actualizado con éxito' });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const disableProvider = async (req, res) => {
    try{
        const { id } = req.params;

        const provider = await Provider.findById(id);

        if(!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });

        const providerDisabled = await Provider.findByIdAndUpdate(id, { statusProvider: false });

        await providerDisabled.save();

        const movementType = await MovementType.findOne({ nameMovementType: 'DISABLE' });

        const newHistoryProvider = new HistoryProvider({ idProvider: id, idMovementType: movementType._id, idUser: req.user.id });

        await newHistoryProvider.save();

        return res.status(200).json({ message: 'Proveedor deshabilitado con éxito' });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const enableProvider = async (req, res) => {
    try{
        const { id } = req.params;

        const provider = await Provider.findById(id);

        if(!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });

        const providerEnabled = await Provider.findByIdAndUpdate(id, { statusProvider: true });

        await providerEnabled.save();

        const movementType = await MovementType.findOne({ nameMovementType: 'ENABLE' });

        const newHistoryProvider = new HistoryProvider({ idProvider: id, idMovementType: movementType._id, idUser: req.user.id });

        await newHistoryProvider.save();

        return res.status(200).json({ message: 'Proveedor habilitado con éxito' });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const updateProviderContact = async (req, res) => {
    try{
        const { id } = req.params;
        const { idTypeContact, data } = req.body;

        if(!idTypeContact || !data) return res.status(400).json({ message: 'No puede haber datos vacíos' });

        const typeContact = await TypeContact.findById(idTypeContact);

        if(!typeContact) return res.status(400).json({ message: 'Tipo de contacto no encontrado' });

        const providerContact = await ProviderContact.findById(id);

        if(!providerContact) return res.status(404).json({ message: 'Contacto de proveedor no encontrado' });

        const newProviderContact = await ProviderContact.findByIdAndUpdate(id, { idTypeContact, data });

        await newProviderContact.save();

        return res.status(200).json({ message: 'Contacto de proveedor actualizado con éxito' });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};