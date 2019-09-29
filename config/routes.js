module.exports = app=>{
    app.post('/signup',app.api.user.save)// consigo passar a funcao save
    // diretamente pois ela foi adicionada em index.js na funcao consign()
    app.post('/signin',app.api.auth.signin)
    app.route('/tasks')
        .all(app.config.passport.authenticate())// todas as rotas de /tasks passam pela autenticacao
        .get(app.api.task.getTasks)
        .post(app.api.task.save)
        //.put(app.api.taks.toggleTask) // poderia colocar aqui

    app.route('/tasks/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.task.remove)

    app.route('/tasksToggle/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)
}