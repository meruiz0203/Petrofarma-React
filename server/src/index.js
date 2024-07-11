const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const sequelize = require('../config/database');
const productRoutes = require('../routes/products');


app.use(express.json());


// Sincronizar Sequelize
sequelize.sync()
  .then(() => {
    console.log('Conectado a la base de datos SQLite');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });



// Configurar rutas de la API antes de servir los archivos estáticos de React
app.use('/api/products', productRoutes);

// Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'client/build')));

// Ruta para manejar todas las demás solicitudes y devolver el archivo index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

