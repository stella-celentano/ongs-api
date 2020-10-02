const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const animais = await connection('Animal').select('*');

        return response.json(animais);
    },

    async create(request, response) {
        const ong_id = 1;
        
        console.log('entrou index');

        const { nome, porte, comportamento } = request.body;
        
        console.log(request.body);
        await connection('Animal').insert({
            nome,
            porte,
            comportamento,
            ong_id

        });

        return response.json({ong_id}); 
    },

    async update(request, response){
        const { id } = request.params;
        const { nome, porte, comportamento } = request.body;

        await connection('Animal').where('id', '=' , id).update({
            nome : nome,
            porte : porte,
            comportamento : comportamento
        });

        return response.status(204).send('Updated');
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('Animal').where('id', '=' , id).delete();
        return response.status(204).send('Deleted');
    }
};