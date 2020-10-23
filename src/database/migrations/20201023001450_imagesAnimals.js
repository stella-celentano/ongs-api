
exports.up = function(knex) {
    return knex.schema.createTable('AnimalPictures', function (table){
        table.increments('id');
        table.string('path').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('animal_id').notNullable();
        
        table.foreign('animal_id').references('id').inTable('animal');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('AnimalPictures');
};
