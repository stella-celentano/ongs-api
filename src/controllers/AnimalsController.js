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

        const trx = await connection.transaction();

        try {
            await trx('Animal').insert({
                nome,
                porte,
                comportamento,
                ong_id: ong_id.ongid
            });

            await trx.commit();

            return response.status(204).send({ message: 'Animal has been created' });

        } catch (ex) {
            trx.rollback();

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while creating new animal"
            })
        }
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, porte, comportamento } = request.body;

        await connection('Animal').where('id', '=', id).update({
            nome: nome,
            porte: porte,
            comportamento: comportamento
        });

        return response.status(204).send('Updated');
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('Animal').where('id', '=', id).delete();
        return response.status(204).send('Deleted');
    }
};