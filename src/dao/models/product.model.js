import mongoose, { mongo } from "mongoose";

const productCollection = "Productos"

const productSchema = new mongoose.Schema({
    titulo: { type: String, require: true, max: 50 },
    descripcion: { type: String, require: true, max: 100 },
    precio: { type: Number, require: true},
    thumbnail: { type: String, require: true},
    code: { type: String, require: true},
    stock: { type: Number, require: true},
    disponible: { type: Boolean, require: true},
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel