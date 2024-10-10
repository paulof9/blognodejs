//Carregando módulos
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
import { engine } from "express-handlebars";
import admin from './routes/admin.js';

//import mongoose from "mongoose"

/*
Utilizava-se o bodyparser porem em versoes atuais do express ele já está imbutido.
#Então, bodyparser:
app.use(express.urlencoded({extented:true: true})
app.use(express.json())
*/
//Configurações
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    //Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
    //Public
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    app.use(express.static(path.join(__dirname,"public"))) //arquivos estaticos

//Rotas
app.get("/", function(req, res){
    res.render("home") 
})

app.use('/admin', admin)

//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando em localhost:8081")
})