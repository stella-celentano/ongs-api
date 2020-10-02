const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const supplies = await connection('Mantimento').select('*');

        return response.json(supplies);
    },

    async create(request, response) {
        const ong_id = 1;
        
        console.log('entrou index');

        const { nomeItem, quantidade, valorTotal } = request.body;
        
        console.log(request.body);
        await connection('Mantimento').insert({
            nomeItem,
            quantidade,
            valorTotal,
            ong_id

        });

        return response.json({ong_id}); 
    },

    async update(request, response){
        const { id } = request.params;
        const { nomeItem, quantidade, valorTotal } = request.body;

        await connection('Mantimento').where('id', '=' , id).update({
            nomeItem,
            quantidade,
            valorTotal
        });

        return response.status(204).send('Updated');
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('Mantimento').where('id', '=' , id).delete();
        return response.status(204).send('Deleted');
    }
};