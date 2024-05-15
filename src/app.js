import express from 'express'
import mongoose from 'mongoose'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import userRouter from './routes/users.router.js'
import productRouter from './routes/products.router.js'
import messageRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

mongoose.connect("mongodb+srv://nahuel:12345@cluster0.n6uawfv.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => { console.log("Conectado a la base de datos") })
.catch(error => console.error("Error en la conexion", error))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/messages', messageRouter)

app.use('/realTimeProducts', viewsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})