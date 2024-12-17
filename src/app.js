const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.routes');
const cartsRoutes = require('./routes/carts.routes');

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Ruta de productos
app.use('/api/products', productsRoutes);

// Ruta de carritos
app.use('/api/carts', cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
