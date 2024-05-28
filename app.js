const express = require ('express')
const app = express()
const mod_fs = require('fs')

const http = require('http')
const server = http.createServer(app)

const{Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    //Procedimiento1:
    console.log('Un usuario se ha conectado')

    //Procedimiento2:
    socket.on('disconnet', () =>{
        console.log('Un usuario se ha desconectado')
    })

    //Procedimiento 3 y 4:
    socket.on('chat', (msg) => {
        console.log('Mensaje: ', msg)
        io.emit('chat', msg)
    })
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())




app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})
app.get('/catalogo', (req, res) => {
    res.sendFile(`${__dirname}/public/catalogo.html`)
})
app.get('/contactanos', (req, res) => {
    res.sendFile(`${__dirname}/public/contactanos.html`)
})
app.get('/nosotros', (req, res) => {
    res.sendFile(`${__dirname}/public/nosotros.html`)
})
app.get('/devoluciones', (req, res) => {
    res.sendFile(`${__dirname}/public/devoluciones.html`)
})



app.post("/datosform", (req, res) =>{
    let datos_html = false
    try {
        datos_html = mod_fs.readFileSync("./public/datos.html", {encoding: 'utf8', flag:'r'})
        datos_html = datos_html.replace("%nombre%", req.body.nombre)
        datos_html = datos_html.replace("%apellido%", req.body.apellido)
        datos_html = datos_html.replace("%telefono%", req.body.telefono)
        datos_html = datos_html.replace("%correo%", req.body.correo)
        datos_html = datos_html.replace("%descripcion%", req.body.descripcion)
    }
    catch (error){
        res.status(200).send("Archivo no Encontrado." + error)
    }
    return res.send(datos_html)
})


server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})