import { Router } from 'express'
import messageModel from '../dao/models/message.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        let messages = await messageModel.find().lean(); //puse el .lean() para solucionar un problema de handlebars que me aparecia sobre acceso a propiedades
        res.render('chat', { messages });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al obtener los mensajes" });
    }
});

router.post('/', async (req, res) => {
    let { user, message } = req.body;
    if (!user || !message) {
        return res.send({ status: "error", error: "Faltan parametros" });
    }
    try {
        let result = await messageModel.create({ user, message });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al crear el mensaje" });
    }
});

router.put('/:uid', async (req, res) => {
    let { uid } = req.params;
    let messageToReplace = req.body;

    if (!messageToReplace.user || !messageToReplace.message) {
        return res.send({ status: "error", error: "Parametros no definidos" });
    }
    try {
        let result = await messageModel.updateOne({ _id: uid }, messageToReplace);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al actualizar el mensaje" });
    }
});

router.delete('/:uid', async (req, res) => {
    let { uid } = req.params;
    try {
        let result = await messageModel.deleteOne({ _id: uid });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al eliminar el mensaje" });
    }
});

export default router;
