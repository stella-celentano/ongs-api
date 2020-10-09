const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const animais = await connection('Animal').select('*');

        return response.json(animais);
    },

    async create(request, response) {
        const ong_id = request.headers;

        console.log('entrou index');

        const { nome, porte, comportamento } = request.body;

        console.log(request.body);

        try {
            await connection('Animal').insert({
                nome,
                porte,
                comportamento,
                ong_id: ong_id.ongid
            });

            return response.status(204).send({ message: 'Animal has been created' });

        } catch (err) {
            console.log(err);
            return response.status(400).json({
                error: "Unexpected error while creating new animal"
            })
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, porte, comportamento } = request.body;

        try {
            await connection('Animal').where('id', '=', id).update({
                nome: nome,
                porte: porte,
                comportamento: comportamento
            });

            return response.status(204).send({ message: 'Animal has been updated' });

        } catch (err) {
            console.log(err);
            return response.status(400).json({
                error: "Unexpected error while update an animal"
            })
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        try {
            await connection('Animal').where('id', '=', id).delete();
            return response.status(204).send('Deleted');
        } catch (err) {
            console.log(err);
            return response.status(400).json({
                error: "Unexpected error while delete an animal"
            })
        }
        
    }
};