import { Router } from 'express';
import { uploadImage, getImagesByProduct } from '../controllers/imageProduct.controller.js';
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";
import { upload } from '../middlewares/uploadImage.js';

const router = new Router();

router.post('/upload/:idProduct/:idUser', upload.single('productImage'), uploadImage);
router.get('/product/:idProduct', getImagesByProduct);

export default router;