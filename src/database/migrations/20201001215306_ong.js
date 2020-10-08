
exports.up = function(knex) {
    return knex.schema.createTable('Ong', function (table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.string('email').notNullable();
        table.string('nome_responsavel').notNullable();
        table.string('senha').notNullable();
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('Ong');
  };
  