const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db'); // Importar la conexión a la base de datos

// Conectar a la base de datos
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar Handlebars con opciones de tiempo de ejecución
const hbs = create({
  extname: '.handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para pasar io a las rutas
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas principales
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');
const viewsRoutes = require('./routes/views.routes');

// Usar rutas
app.use('/api/products', productsRoutes); // Rutas para productos
app.use('/api/carts', cartsRoutes); // Rutas para carritos
app.use('/', viewsRoutes); // Rutas para vistas

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = { app, server, io };