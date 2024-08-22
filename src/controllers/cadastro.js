// Importando as tabelas do DB
const sala = require('../model/sala');
const aluno = require('../model/aluno');

module.exports = {
    async sala(req, res){
        res.render('../views/RegisterClass');
    },
    async salaInsert(req, res){
        // Recebe as informações do front-end
        const dados = req.body;
        // Criando sala no banco de dados
        await sala.create({
            Nome: dados.ClassRoomName, //  Meu HTML
            Capacidade: dados.ClassRoomCapacity,
            Minima: dados.ClassRoomMinAge,
            Maxima: dados.ClassRoomMaxAge
        });
        // Redirecionar para a página principal
        res.redirect('/');
    },
    async aluno(req, res){
        // Encontrando todas as salas disponíveis no SQL
        const salas = await sala.findAll({
            raw: true, // Retorna somente os valores de uma tabela, sem os metadados.
            attributes: ['IDSala', 'Nome','Maxima','Minima','Capacidade']
        });
        // Renderizando e passando o nome das salas para o front

        res.render('../views/RegisterStudent', {salas});
    },
    async alunoInsert(req,res){
        const dados = req.body;
        let picture = 'DefaultUser.png';

        let salas = await sala.findByPk(dados.IdSala,{
            raw:true,
            attributes: ['IDSala','Nome','Capacidade','Maxima','Minima']
        })

        let currentYear = new Date().getFullYear();
        let birthdateYear = new Date(dados.StudentBirthdate).getFullYear();
        let StudentAge = currentYear - birthdateYear;

        let count = await aluno.count({
            where:{
                IDSala : salas.IDSala
            }
        });

        if(StudentAge>salas.Maxima || StudentAge<salas.Minima || count >= salas.Capacidade ){
            return;
        }

        console.log(dados.StudentBirthdate);

        if(req.file){
            picture = req.file.filename;
        }
        await aluno.create({
            Nome: dados.StudentName,
            DataNas : dados.StudentBirthdate,
            Sexo: dados.StudentSex,
            Foto: picture,
            IDSala: dados.IdSala
        })
        res.redirect('/');
    }
}