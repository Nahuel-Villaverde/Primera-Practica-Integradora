import express from 'express';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import userRouter from './routes/users.router.js';
import productRouter from './routes/products.router.js';
import messageRouter from './routes/messages.router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import messageModel from './dao/models/message.model.js';

const app = express();
const PORT = 8080;
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb+srv://nahuel:12345@cluster0.n6uawfv.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => { console.log("Conectado a la base de datos") })
.catch(error => console.error("Error en la conexion", error));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/messages', messageRouter);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('newMessage', async (data) => {
        try {
            const newMessage = await messageModel.create(data);
            io.emit('updateMessages', newMessage);
        } catch (error) {
            console.error("Error al guardar el mensaje en la base de datos:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});