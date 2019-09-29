
exports.up = function(knex) {
    return knex.schema.createTable('users',table=>{
        // retorno um schema com a table e seus atributos a serem criados
        table.increments('id').unsigned().primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        
    })
};

exports.down = function(knex) {
    // deleto a tabela criada
    return knex.schema.dropTable('users')
};
