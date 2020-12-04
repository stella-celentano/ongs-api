const connection = require('../database/connection');

function createUID() {
    var dt = new Date().getTime();
    var OngId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return OngId;
}

module.exports = {
    async index(request, response) {
        const { ongId } = request.body
        try{
            const ongs = await connection('Ong')
            .join('Endereco', 'Ong.id', '=', 'Endereco.ong_id')
            .join('Telefone', 'Ong.id', '=', 'Telefone.ong_id')
            .select('Ong.id', 'Ong.nome', 'Ong.descricao', 'Ong.email', 'Ong.nome_responsavel', 'Endereco.id as Endereco_Id', 'Endereco.cep', 'Endereco.rua', 'Endereco.numeroEndereco', 'Endereco.estado', 'Endereco.cidade', 'Telefone.id as TelefoneId', 'Telefone.ddd', 'Telefone.numeroTelefone')
            .where({"Ong.id" : ongId})
            
            // .join('Images', 'Ong.id', '=', 'Images.ong_id')
            
            
            // .raw('SELECT * FROM Ong').then(function(resp){

                // return response.json(resp);
            // })
            return response.json(ongs);
        }catch(err){
            return response.status(404).json({
                error: "Unexpected error while trying to get ong data"
            })
        }
    },

    async login(request, response){
        const { emailRequest, passwordRequest } = request.body;
        try{
            const ong = await connection('Ong')
            .where({
                email: emailRequest,
                senha: passwordRequest
            })
            .select('id')
            .select('nome')
            .first();

            if(!ong){
                return response.status(404).json({error: 'No User found with this login'});
            }

            console.log(ong);

            // response.header('loggedOng', ong);

            return response.json(ong);

        }catch(err){
            return response.status(404).json({
                error: "Unexpected error while trying to loggin"
            })
        }
    },


    async create(request, response) {
        const { nome, descricao, email, nome_responsavel, senha, ddd, numeroTelefone, cep, rua, numeroEndereco, estado, cidade } = request.body;
        
        const requestImages = request.files;

        console.log(requestImages);

        const images = requestImages.map(image => {
            return {path: image.filename}
        });

        const id = createUID();

        const trx = await connection.transaction();

        try {
            await trx('Ong').insert({
                id,
                nome,
                descricao,
                email,
                nome_responsavel,
                senha
            });

            await trx('Telefone').insert({
                ddd,
                numeroTelefone,
                ong_id: id
            });

            await trx('Endereco').insert({
                cep,
                rua,
                numeroEndereco,
                estado,
                cidade,
                ong_id: id
            });

            await trx('Images').insert(
                images.map(image =>{
                    return{
                        path : image.path,
                        ong_id: id
                    }
                })
            );

            await trx.commit();

            response.header('ongId', id);

            return response.status(204).send({ message: 'Ong, telefone, endereço has been created' });
        } catch (ex) {
            trx.rollback();

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while creating new ong"
            })
        }

    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, descricao, email, nome_responsavel, senha, ddd, numeroTelefone, cep, rua, numeroEndereco, estado, cidade } = request.body;

        const trx = await connection.transaction();

        try {
            await trx('Ong').where('id', '=', id).update({
                nome: nome,
                descricao: descricao,
                email: email,
                nome_responsavel: nome_responsavel,
                senha: senha
            });

            await trx('Telefone').insert({
                ddd: ddd,
                numeroTelefone: numeroTelefone,
                ong_id: id
            });

            await trx('Endereco').insert({
                cep: cep,
                rua: rua,
                numeroEndereco: numeroEndereco,
                estado: estado,
                cidade: cidade,
                ong_id: id
            })

            return response.status(204).send('Updated');
        } catch (ex) {
            trx.rollback();

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while updating new ong"
            })
        }

    },

    async delete(request, response) {
        const { id } = request.params;

        const trx = await connection.transaction();

        try {
            await trx('Ong').where('id', '=', id).delete();

            await trx('Telefone').where('id', '=', id).delete();

            await trx('Endereco').where('id', '=', id).delete();

            return response.status(204).send('Deleted');
        } catch (ex) {
            trx.rollback();

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while delete an ong"
            })
        }


    }
};