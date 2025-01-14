const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Configuración del servidor Express
const app = express();
const server = http.createServer(app); // Usar HTTP para el servidor
const io = new Server(server); // Configurar Socket.IO

// Configurar Handlebars
const hbs = create({
    extname: '.handlebars',
});
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    // Aquí puedes manejar eventos personalizados
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Configurar el puerto y levantar el servidor
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Exportar io para usarlo en otros módulos
module.exports = { app, server, io };
