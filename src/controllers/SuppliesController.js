const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const supplies = await connection('Mantimento').select('*');

        return response.json(supplies);
    },

    async create(request, response) {
        const ong_id = request.headers;
        
        

        const { nomeItem, quantidade, valorTotal } = request.body;
        


        try {
            await connection('Mantimento').insert({
                nomeItem,
                quantidade,
                valorTotal,
                ong_id: ong_id.ongid
            });

           

            return response.status(204).send({ message: 'Supplie has been created' });

        } catch (ex) {
            

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while creating new supplie"
            })
        }
    },

    async update(request, response){
        const { id } = request.params;
        const ong_id = request.headers;
        const { nomeItem, quantidade, valorTotal } = request.body;


        try {
            await connection('Mantimento').where('id', '=' , id).update({
                nomeItem,
                quantidade,
                valorTotal,
                ong_id: ong_id.ongid
            });

            

            return response.status(204).send({ message: 'Supplie has been updated' });

        } catch (ex) {
            

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while update new supplie"
            })
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        
        
        try {
            await connection('Mantimento').where('id', '=' , id).delete();
            
            return response.status(204).send({ message: 'Supplie has been deleted' });

        } catch (ex) {
            

            console.log(ex);
            return response.status(400).json({
                error: "Unexpected error while creating new supplie"
            })
        }
    }
};