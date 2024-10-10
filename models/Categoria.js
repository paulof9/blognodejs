import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

// Criando o modelo com o esquema 'CategoriaSchema'
const Categoria = mongoose.model('Categorias', CategoriaSchema);
export default Categoria;
