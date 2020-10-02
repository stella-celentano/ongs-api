
exports.up = function(knex) {
    return knex.schema.createTable('Animal', function (table){
        table.increments('id');
        table.string('nome').notNullable();
        table.string('porte').notNullable();
        table.string('comportamento').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('ong_id').unsigned().notNullable();
        
        table.foreign('ong_id').references('id').inTable('Ong');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Animal');
  };
  