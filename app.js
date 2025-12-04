const express = require('express');
const app = express();
const fs = require('fs');

app.get('/api/productos', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer productos');
    }
    const productos = JSON.parse(data);
    res.json(productos);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api/productos`);
});
