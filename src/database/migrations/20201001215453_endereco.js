
exports.up = function(knex) {
    return knex.schema.createTable('Endereco', function (table){
        table.increments('id');
        table.string('cep').notNullable();
        table.string('rua').notNullable();
        table.integer('numeroEndereco').notNullable();
        table.string('estado').notNullable();
        table.string('cidade').notNullable();
        table.string('ong_id').notNullable();
        
        table.foreign('ong_id').references('id').inTable('Ong');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Endereco');
  };
  