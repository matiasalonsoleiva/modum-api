const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/productos', (req, res) => {
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf8'));
  res.json(productos);
});

// NUEVO: Ruta para JSON-LD estructurado
app.get('/productos', (req, res) => {
  const productos = JSON.parse(fs.readFileSync('productos.json', 'utf8'));

  const dataLD = productos.map(producto => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": producto.nombre,
    "image": [producto.imagen],
    "description": producto.nombre,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CLP",
      "price": producto.precio,
      "availability": "https://schema.org/InStock",
      "url": producto.url
    }
  }));

  res.setHeader('Content-Type', 'application/ld+json');
  res.send(JSON.stringify(dataLD, null, 2));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

