
exports.up = function(knex) {
    return knex.schema.createTable('Images', function (table){
        table.increments('id');
        table.string('path').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('ong_id').notNullable();
        
        table.foreign('ong_id').references('id').inTable('Ong');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('Images');
};
