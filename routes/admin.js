import express from 'express';
const router = express.Router();
import { engine } from "express-handlebars";

import mongoose from 'mongoose';
import Categoria from '../models/Categoria.js';

// rotas
router.get('/', (req, res) => {
    res.render("admin/index");
});

router.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias')
        res.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias");
});

//cadastrar dados do form para a DB
router.post('/categorias/nova', (req, res) => {
        var erros = [];

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
            erros.push({texto: "Nome inválido"}); //.push insere dados dentro de array
        }
        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            erros.push({texto: "Slug inválido"});
        }
        if(req.body.nome.length < 2){
            erros.push({texto: "Nome da categoria muito pequeno, deve ser maior que dois dígitos!"})
        }
        if(erros.length > 0){
            res.render("admin/addcategorias", {erros: erros})
        }else{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!");
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
        res.redirect("/admin/categorias/add")
    })
}});
// router
export default router