const express = require('express');
const app = express();

const productos = [
    { id: 0, nombre: 'Producto 1', precio: 10 },
    { id: 1, nombre: 'Producto 2', precio: 20 },
    { id: 2, nombre: 'Producto 3', precio: 30 }
  ];

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req,res) => {
    let body= "", data;

    req.on("data", chunck => { body += chunck.toString(); });
    
    req.on("end", () => {
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.json({
                "message": "Error - Procesamiento de los datos"
            });
        }

        productos.push(data);
        res.json(productos);
    });
})

app.put('/productos/upd/:id', (req,res) => {
    let body= "", data;

    req.on("data", chunck => { body += chunck.toString(); });
    
    req.on("end", () => {
        try {
            data = JSON.parse(body);
        } catch (error) {
            res.json({
                "message": "Error - Procesamiento de los datos",
                "addition": `${error}`
            });
        }

        productos[req.params.id] = data;
        res.json(productos);
    });
})

app.delete('/productos/del/:id', (req,res) => {
    try {
        productos.splice(req.params.id,1);
        res.json(productos);
    } catch (error) {
        res.json({
            "message": "Error - Procesamiento de los datos",
            "addition": `${error}`
        });
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
