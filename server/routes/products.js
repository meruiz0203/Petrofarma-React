const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
