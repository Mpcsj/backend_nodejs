// Update with your config settings.
module.exports = {
    client: 'mysql',
    connection: {
      database: 'tasks_estudo_react',
      user:     'estudoJPA',
      password: '12345678'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
