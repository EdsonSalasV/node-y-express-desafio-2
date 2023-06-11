const express = require('express');
const fs = require ('fs');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});


app.get('/canciones', (req, res) =>{
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    res.send(canciones);
})

app.post('/canciones', (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('agergar cancion');
})

app.put('/canciones/:id', (req, res) =>{
    const id = req.params.id;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex(cancion => cancion.id == id);
    canciones[index] = cancion;
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('editar cancion')
})

app.delete('/canciones/:id', (req,res) =>{
    const id = req.params.id;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    const index = canciones.findIndex(cancion => cancion.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('borrar cancion');
})


app.listen(PORT, ()=> {
    console.log(`owo ${PORT}!`);
})