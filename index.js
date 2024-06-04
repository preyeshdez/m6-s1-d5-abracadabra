import express from 'express';

const app = express();

let PORT = 3000;
let direccion = `http://localhost:${PORT}`

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const Random = () => {
    const numero = Math.floor(Math.random() * (4)) + 1
    return numero
}

let usuarios = [
    { nombre: "pedro" },
    { nombre: "juan" },
    { nombre: "diego" }
]

app.use(express.static("assets"));

app.get("/", (req, res) => {
    res.send(`
    <html>
      <body>
        <h1>Bienvenido</h1>
        <img src="/sombrero.png" alt="Sombrero" width="300">
        <h3>Para ingresar al juego debes escribir en la barra del navegador un usuario correcto, de la siguiente manera:</h3>
        <p>${direccion}/abracadabra/juego/(escribe tu primer nombre aqui)</p>
        <h4>Ejemplo</h4>
        <p>${direccion}/abracadabra/juego/pepe</p>
      </body>
    </html>
  `)
})

app.get("/abracadabra/usuarios", (req, res) => {
    try {
        res.status(200).json({ usuarios });
    } catch (error) {
        res.status(500).json({
            msg: "Lista de usuarios no encontrada.",
            code: 400
        });
    }
});

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    let usuarioIngresado = req.params.usuario.toLowerCase();
    let usuarioBuscado = usuarios.find(usuario => usuario.nombre == usuarioIngresado);

    if (usuarioBuscado) {
        next();
    } else {
        return res.status(403).redirect("/who.jpeg");
    }
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile('/index.html', { root: '.' });
});

app.get("/abracadabra/conejo/:n", (req, res) => {
    let numeroElegido = req.params.n;
    let numeroRandom = Random();

    if (numeroElegido == numeroRandom) {
        res.redirect("/conejito.jpg")
    } else {
        res.redirect("/voldemort.jpg")
    }

})

app.get("*", (req, res) => {
    res.send("<h1>Pagina no encontrada</h1>")
})
