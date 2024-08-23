const sala = require("../model/sala");
const aluno = require("../model/aluno"); 
const { where } = require("sequelize");

module.exports = {
    async pagInicialGet(req, res){
        // Encontrando todas as salas disponíveis no SQL
        const salas = await sala.findAll({
            raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
            attributes: ['IDSala', 'Nome','Capacidade']
        });

        const alunos = await aluno.findAll({
            raw: true,
            attributes:['IDAluno','Nome','DataNas','Sexo','Foto','IDSala'],
        })
        const countStudent = await aluno.count({});

        res.render('../views/Index', {salas,alunos,id_filter:'',countStudent});
    },
    async pagInicialPost(req, res){
        let id_filter = req.body.sala_filter;
        const alunos = await aluno.findAll({
            raw: true,
            attributes:['IDAluno','Nome','DataNas','Sexo','Foto','IDSala'],
            where : (id_filter? {IDSala: id_filter} :{})
        });
        const countStudent = await aluno.count({
            where : (id_filter? {IDSala: id_filter} :{})
        });
        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome','Capacidade'] });
        res.render('../views/index', {salas, alunos, id_filter,countStudent});
    }
}