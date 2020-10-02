const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('Ong').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { nome, descricao, email, nome_responsavel, senha } = request.body;
        console.log(request.body);

        await connection('Ong').insert({
            nome,
            descricao,
            email,
            nome_responsavel,
            senha
        });

        return response.status(204).send('Created'); 
    },

    async update(request, response){
        const { id } = request.params;
        const { nome, descricao, email, nome_responsavel, senha } = request.body;

        await connection('Ong').where('id', '=' , id).update({
            nome : nome,
            descricao : descricao,
            email : email,
            nome_responsavel: nome_responsavel,
            senha: senha
        });

        return response.status(204).send('Updated');
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('Ong').where('id', '=' , id).delete();
        return response.status(204).send('Deleted');
    }
};