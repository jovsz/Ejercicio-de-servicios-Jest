import express from "express";
import morgan from "morgan";
import path from "path";
const app = express();

//midlewares de 3ros
app.use(morgan("dev")); //middleware de 3ros
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));//middleware para poder processar los datos que vienen con el formato urlencoded
app.use(express.json()); //middleware para procesar datos que vienen en formato JSON





//middleware de peticiones
app.get('/', (req,res) => {
    const homePage = path.resolve('./public','index-1.html')
    response.sendFile(homePage);
})

app.get("/nosotros", (req,res) => {
    res.send("Acerca de nosotrols");
})

app.post('/user', (req,res,next) => {
    //obtener los datos que envia el cliente a travez de la peticion POST
    console.log(req.body);
    const { firstname, lastname } = req.body;
    //validamos que tenga firstname y lastname
    if( firstname && lastname ){
        return res.send("Ha llegado la peticion a barra user")
    }
    return next("La peticion no pudo ser procesada por que hay campos vacias");
});

//Next cumple con dos funciones
//1. sin argumentos - continuar con el siguiente middleware
//2. con argumentos -

app.use('/user', (err,req,res,next) => {
    return res.status(400).send(err);
})

export default app;