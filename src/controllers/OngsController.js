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
        const ongs = await connection('Ong').select('*');

        return response.json(ongs);
    },


    async create(request, response) {
        const { nome, descricao, email, nome_responsavel, senha, ddd, numeroTelefone, cep, rua, numeroEndereco, estado, cidade } = request.body;
        console.log(request.body);

        var id = createUID();

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
            })

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
        const { nome, descricao, email, nome_responsavel, senha } = request.body;

        await connection('Ong').where('id', '=', id).update({
            nome: nome,
            descricao: descricao,
            email: email,
            nome_responsavel: nome_responsavel,
            senha: senha
        });

        return response.status(204).send('Updated');
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('Ong').where('id', '=', id).delete();
        return response.status(204).send('Deleted');
    }
};