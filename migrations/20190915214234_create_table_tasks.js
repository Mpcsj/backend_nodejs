
exports.up = function(knex) {
  knex.schema.hasTable('tasks').then(function(exists){
    if(!exists){
      return knex.schema.createTableIfNotExists('tasks',table=>{
        // o callback retorna um objeto table
        table.increments('id').primary()
        table.string('desc').notNull()
        table.datetime('estimateAt')
        table.datetime('doneAt')
        table.integer('userId').unsigned().references('id')
        .inTable('users').notNull()
    })
    }else{
      return knex.schema.dropTable('tasks').then(function(){
        return knex.schema.createTableIfNotExists('tasks',table=>{
          // o callback retorna um objeto table
          table.increments('id').primary()
          table.string('desc').notNull()
          table.datetime('estimateAt')
          table.datetime('doneAt')
          table.integer('userId').unsigned().references('id')
          .inTable('users').notNull()
      })  
      })  
    }
  })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks')
};
