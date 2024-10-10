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
    res.render("admin/categorias");
});

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias");
});

//cadastrar dados do form para a DB
router.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch((err) => {
        console.log("Erro ao salvar categoria!"+err)
    })
});

// router
export default router;