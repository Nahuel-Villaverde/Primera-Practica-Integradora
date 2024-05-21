import { Router } from 'express';
import messageModel from '../../dao/models/message.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        let messages = await messageModel.find().lean();
        res.render('chat', { messages });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los mensajes');
    }
});

export default router;