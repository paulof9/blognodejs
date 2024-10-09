import express from 'express';
const router = express.Router();
import { engine } from "express-handlebars";

// rotas
router.get('/', (req, res) => {
    res.render("admin/index");
});

router.get('/posts', (req, res) => {
    res.send("pagina de posts");
});

router.get('/categorias', (req, res) => {
    res.send("pagina de categorias");
});

// router
export default router;