// Iniciando Route do Express
const express = require('express');
const multer = require("multer");
const route = express.Router();
const cadastro = require('./src/controllers/cadastro');
const config = require('./src/config/multer');
const home = require('./src/controllers/home');
const editar = require('./src/controllers/editar');


route.get('/Index', home.pagInicialGet);
route.get('/', home.pagInicialGet);
route.post('/RegisterStudent', multer(config).single('ImgLink'), cadastro.alunoInsert);
route.get('/RegisterClass',cadastro.sala);
route.get('/RegisterStudent',cadastro.aluno);
route.post('/RegisterClass',cadastro.salaInsert);
route.post('/Index',home.pagInicialPost);
route.post('/',home.pagInicialPost);
route.get('/UpdateStudent/:id',editar.alunos);
route.post('/UpdateStudent/:id',multer(config).single('ImgLink'),editar.update);
route.get('/UpdateClass/:id',editar.Salas);
route.post('/UpdateClass/:id',editar.UpdateSalas);

const Aluno = require('./src/model/aluno');
const Sala = require('./src/model/sala');


route.get('/DeleteStudent/:id',async(req,res)=>{
    var deleted_id = req.params.id;
    await Aluno.destroy({
        where:{
            IDAluno : deleted_id
        }
    })
    res.redirect('/');
});

route.get('/DeleteClass/:id',async(req,res)=>{
    var deleted_id = req.params.id;
    await Sala.destroy({
        where:{
            IDSala : deleted_id
        }
    })
    res.redirect('/');
})

module.exports = route;