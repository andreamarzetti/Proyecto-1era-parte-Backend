require('dotenv').config();
const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectDB = require('./db');

// Conectar a la base de datos
connectDB();

// Inicializar la app de Express
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar Handlebars con opciones de tiempo de ejecución
const hbs = create({
  extname: '.handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para JSON, formularios y cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY)); // Firmar cookies con una clave secreta
app.use(passport.initialize());

// Middleware para pasar io a las rutas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Configuración de Passport
require('./config/passport');

exports.authenticateJWT = passport.authenticate('jwt', { session: false });

// Rutas principales
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');
const viewsRoutes = require('./routes/views.routes');
const userRoutes = require('./routes/user.routes');

// Usar rutas
app.use('/api/products', productsRoutes); // Rutas para productos
app.use('/api/carts', cartsRoutes); // Rutas para carritos
app.use('/api/users', userRoutes); // Rutas para usuarios
app.use('/', viewsRoutes); // Rutas para vistas

// Ruta al endpoint raíz para mostrar la página de inicio
app.get('/', (req, res) => {
  res.render('home', { title: 'Inicio', message: '¡Bienvenido al servidor de Backend!' });
});

// Configuración de WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = { app, server, io };