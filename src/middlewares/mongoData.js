import MovementType from '../models/type/movementType.model.js'; // Importa el modelo MovementType
import TypeUser from '../models/type/typeUser.model.js'; // Importa el modelo TypeUser
import TypeContact from '../models/type/typeContact.model.js'; // Importa el modelo TypeContact
import TypeProduct from '../models/type/typeProduct.model.js'; // Importa el modelo TypeProduct
import TypeProvider from '../models/type/typeProvider.model.js'; // Importa el modelo TypeProvider
import TypeStatusRepair from '../models/type/typeStatusRepair.model.js'; // Importa el modelo TypeStatusRepair
import TypeUrgency from '../models/type/typeUrgency.model.js'; // Importa el modelo TypeUrgency

const mongoData = async () => {
    const movementTypeData = [
        {nameMovementType: "INSERT"},
        {nameMovementType: "UPDATE"},
        {nameMovementType: "ENABLE"},
        {nameMovementType: "DISABLE"},
    ];
    const typeUserData = [
        {nameTypeUser: "Administrador"},
        {nameTypeUser: "Usuario"},
    ];
    const typeContactData = [
        {nameTypeContact: "Correo"},
        {nameTypeContact: "Teléfono"},
        {nameTypeContact: "WhatsApp"},
        {nameTypeContact: "Facebook"},
        {nameTypeContact: "Messenger"},
        {nameTypeContact: "Instagram"},
        {nameTypeContact: "Tiktok"},
    ];
    const typeProductData = [
        {nameTypeProduct: "Celular"},
        {nameTypeProduct: "Tablet"},
        {nameTypeProduct: "Laptop"},
        {nameTypeProduct: "PC"},
        {nameTypeProduct: "Impresora"},
        {nameTypeProduct: "Cámara"},
        {nameTypeProduct: "Consola"},
        {nameTypeProduct: "Smartwatch"},
        {nameTypeProduct: "Audífonos"},
        {nameTypeProduct: "Teclado"},
        {nameTypeProduct: "Mouse"},
        {nameTypeProduct: "Monitor"},
        {nameTypeProduct: "Proyector"},
        {nameTypeProduct: "Bocina"},
    ];
    const typeProviderData = [
        {nameTypeProvider: "Online"},
        {nameTypeProvider: "Fisico"},
    ];
    const typeStatusRepairData = [
        {nameTypeStatusRepair: "Pagado"},
        {nameTypeStatusRepair: "En proceso"},
        {nameTypeStatusRepair: "Finalizado"},
        {nameTypeStatusRepair: "Entregado"},
        {nameTypeStatusRepair: "Cancelado"},
    ];
    const typeUrgencyData = [
        {nameTypeUrgency: "Baja"},
        {nameTypeUrgency: "Media"},
        {nameTypeUrgency: "Alta"},
    ];

    // Revisa si ya existen los datos en la base de datos y si no, los inserta
    await movementTypeData.forEach(async (data) => {
        const movementTypeFound = await MovementType.findOne({
            nameMovementType: data.nameMovementType,
        });
        if (!movementTypeFound) {
            await new MovementType(data).save();
        }
    });

    await typeUserData.forEach(async (data) => {
        const typeUserFound = await TypeUser.findOne({
            nameTypeUser: data.nameTypeUser,
        });
        if (!typeUserFound) {
            await new TypeUser(data).save();
        }
    });

    await typeContactData.forEach(async (data) => {
        const typeContactFound = await TypeContact.findOne({
            nameTypeContact: data.nameTypeContact,
        });
        if (!typeContactFound) {
            await new TypeContact(data).save();
        }
    });

    await typeProductData.forEach(async (data) => {
        const typeProductFound = await TypeProduct.findOne({
            nameTypeProduct: data.nameTypeProduct,
        });
        if (!typeProductFound) {
            await new TypeProduct(data).save();
        }
    });

    await typeProviderData.forEach(async (data) => {
        const typeProviderFound = await TypeProvider.findOne({
            nameTypeProvider: data.nameTypeProvider,
        });
        if (!typeProviderFound) {
            await new TypeProvider(data).save();
        }
    });

    await typeStatusRepairData.forEach(async (data) => {
        const typeStatusRepairFound = await TypeStatusRepair.findOne({
            nameTypeStatusRepair: data.nameTypeStatusRepair,
        });
        if (!typeStatusRepairFound) {
            await new TypeStatusRepair(data).save();
        }
    });

    await typeUrgencyData.forEach(async (data) => {
        const typeUrgencyFound = await TypeUrgency.findOne({
            nameTypeUrgency: data.nameTypeUrgency,
        });
        if (!typeUrgencyFound) {
            await new TypeUrgency(data).save();
        }
    });

    console.log("Data inserted!");
};

export default mongoData; // Exporta la función mongoData