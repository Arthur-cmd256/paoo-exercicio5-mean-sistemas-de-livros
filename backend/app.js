const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors')

app.use(cors())

require('dotenv').config()

const {
  mongodb_user,
  mongodb_password,
  mongodb_cluster,
  mongodb_host,
  mongodb_database
} = process.env

const mongoose = require('mongoose');

const Livro = require('./models/livro');

mongoose.connect(`mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_cluster}.${mongodb_host}.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`)
.then(() => {
  console.log('Conexão OK')
}).catch(() => {
  console.log('Conexão NOK')
});

app.use(bodyParser.json());

const livros = [
    {
        id: 1,
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien',
        paginas: '456'
    },
    {
        id: 2,
        titulo: 'O Hobbit',
        autor: 'J.R.R. Tolkien',
        paginas: '456'
    }
]

app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,OPTIONS');
    next();
});

app.post ('/api/livros', (req, res, next) => {
    const livro = new Livro({
      titulo: req.body.titulo,
      autor: req.body.autor,
      paginas: req.body.paginas
    })
    livro.save().then(livroInserido => {
      res.status(201).json({
        message: 'Livro criado com sucesso',
        id: livroInserido._id
      })
    })
});


app.get('/api/livros',(req, res, next) => {
    Livro.find().then(documents => {
      console.log(documents);
      res.status(200).json({
        mensagem: "Tudo OK",
        livros: documents
      })
    });
});

app.delete('/api/livros/:id', (req, res, next) => {
  Livro.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({
      mensagem: "Livro deletado com sucesso"
    })
  })
});

module.exports = app;
