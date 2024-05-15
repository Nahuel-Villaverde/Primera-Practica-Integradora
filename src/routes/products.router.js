import { Router } from 'express'
import productModel from '../dao/models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        let products = await productModel.find()
        res.send({ result: "success", payload: products })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    let { titulo, descripcion, precio, disponible } = req.body
    if ( !titulo || !descripcion || !precio || !disponible) {
        res.send({ status: "error", error: "Faltan parametros" })
    }
    let result = await productModel.create({ titulo, descripcion, precio, disponible })
    res.send({ result: "success", payload: result })
})

router.put('/:uid', async (req, res) => {
    let { uid } = req.params
    let productToReplace = req.body

    if (!productToReplace.titulo || !productToReplace.descripcion || !productToReplace.precio || !productToReplace.disponible) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    let result = await productModel.updateOne({ _id: uid }, productToReplace)

    res.send({ result: "success", payload: result })
})

router.delete('/:uid', async (req, res) => {
    let { uid } = req.params
    let result = await productModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

export default router