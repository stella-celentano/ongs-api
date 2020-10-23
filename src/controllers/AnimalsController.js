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
        const animais = await connection('Animal').select('*');

        return response.json(animais);
    },

    async create(request, response) {
        const ong_id = request.headers;

        const requestImages = request.files;

        const { nome, porte, comportamento } = request.body;

        const images = requestImages.map(image => {
            return {path: image.filename}
        });

        const id = createUID();

        const trx = await connection.transaction();

        try {
            await trx('Animal').insert({
                id,
                nome,
                porte,
                comportamento,
                ong_id: ong_id.ongid
            });

            await trx('AnimalPictures').insert(
                images.map(image =>{
                    return{
                        path : image.path,
                        animal_id: id
                    }
                })
            );

            await trx.commit();

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