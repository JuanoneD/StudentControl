const sala = require("../model/sala");
const aluno = require("../model/aluno"); 

module.exports = {
    async pagInicialGet(req, res){
        // Encontrando todas as salas disponíveis no SQL
        const salas = await sala.findAll({
            raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
            attributes: ['IDSala', 'Nome']
        });

        const alunos = await aluno.findAll({
            raw: true,
            attributes:['IDAluno','Nome','Idade','Sexo','Foto','IDSala'],
        })
        // Renderizando e passando o nome das salas para o front
        res.render('../views/Index', {salas,alunos,id_filter:''});
    },
    async pagInicialPost(req, res){
        let id_filter = req.body.sala_filter;
        const alunos = await aluno.findAll({
            raw: true,
            attributes:['IDAluno','Nome','Idade','Sexo','Foto','IDSala'],
            where : (id_filter? {IDSala: id_filter} :{})
        })

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });
        res.render('../views/index', {salas, alunos, id_filter});
    }
}