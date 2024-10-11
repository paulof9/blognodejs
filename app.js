//Carregando módulos
    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';
    const app = express();
    import { engine } from "express-handlebars";
    import admin from './routes/admin.js';
    import session from "express-session";
    import flash from "connect-flash";

//Configurações
    //Sessão
    app.use(session({
        secret: "qualquercoisa",
        resave: true,
        saveUninitialized: true
    }))
    //Flash
    app.use(flash());
    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    })
    //Express
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

    //MongooseDB
    import mongoose from "mongoose"
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp").then(() => {
        console.log("Conectado ao mongo!")
    }).catch((err) => {
        console.log("Erro ao se conectar"+err)
    })

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