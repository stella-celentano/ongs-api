
exports.up = function(knex) {
    return knex.schema.createTable('Animal', function (table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('porte').notNullable();
        table.string('comportamento').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('ong_id').notNullable();
        
        table.foreign('ong_id').references('id').inTable('Ong');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Animal');
  };
  