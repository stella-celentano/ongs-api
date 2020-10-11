
exports.up = function(knex) {
    return knex.schema.createTable('Mantimento', function (table){
        table.increments('id');
        table.string('nomeItem').notNullable();
        table.integer('quantidade').notNullable();
        table.decimal('valorTotal').notNullable();
        table.string('ong_id').notNullable();
        
        table.foreign('ong_id').references('id').inTable('Ong');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Mantimento');
  };
  