
exports.up = function(knex) {
    return knex.schema.createTable('Telefone', function (table){
        table.increments('id');
        table.string('ddd').notNullable();
        table.string('numeroTelefone').notNullable();
        table.string('ong_id').notNullable();
        
        table.foreign('ong_id').references('id').inTable('Ong');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Telefone');
  };
  