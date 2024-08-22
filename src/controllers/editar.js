const sala = require('../model/sala');
const aluno = require('../model/aluno');

module.exports = {
    async alunos(req,res){
        const update_id = req.params.id;
        const alunos = await aluno.findByPk(update_id,{
            raw:true,
            attributes: ['IDAluno','Nome','DataNas','Sexo','Foto','IDSala']
        });
        const salas = await sala.findAll({raw:true,attributes:['IDSala','Nome','Maxima','Minima']});
        res.render('../views/UpdateStudent',{salas,alunos});
    },
    async update(req,res){
        const dados = req.body;
        const id = req.params.id;

        let salas = await sala.findByPk(dados.IdSala,{
            raw:true,
            attributes: ['IDSala','Nome','Capacidade','Maxima','Minima']
        })

        if(dados.StudentAge>=salas.Maxima || dados.StudentAge<=salas.Minima){
            return;
        }

        await aluno.update({
            Nome: dados.StudentName,
            DataNas: dados.StudentAge,
            Sexo: dados.StudentSex,
            IDSala: dados.IdSala
        },
        {
            where: {IDAluno:id}
        });
        if(req.file){
            const antigaFoto = await aluno.findAll({
                raw:true,
                attributes:['Foto'],
                where:{ IDAluno:id}
            });
            if(antigaFoto[0].Foto != 'DefaultUser.png')fs.unlink(`public/img/${antigaFoto[0].Foto}`,( err => {
                if(err) console.log(err);
            }))
            await aluno.update(
                {Foto: req.file.filename},
                {where : {IDAluno: id}}
            );
        }
        res.redirect('/');
    },
    async Salas(req,res){
        const update_id = req.params.id; /// arrumar lugar para pegar o id da sala
        const salas = await sala.findByPk(update_id,{
            raw:true,
            attributes: ['IDSala','Nome','Capacidade','Maxima','Minima']
        });
        res.render('../views/UpdateClass',{salas});
    },
    async UpdateSalas(req,res){
        const dados = req.body;
        const id = req.params.id;
        await sala.update({
            Nome: dados.ClassRoomName, 
            Capacidade: dados.ClassRoomCapacity,
            Minima: dados.ClassRoomMinAge,
            Maxima: dados.ClassRoomMaxAge
        },{where : {IDSala : id}});
        res.redirect('/');
    }
}