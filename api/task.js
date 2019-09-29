const moment = require('moment')

// obs: geralmente erro 400 são erros do lado do cliente e erro 500 são erros do lado
// do servidor
module.exports = app=>{
    const getTasks =(req,res)=>{
        // verifico se houve data passada
        // se nao houve, pego a data ate o fim do dia de hoje
        let date = req.query.date?req.query.date
            :moment().endOf('day').format()//'YYYY-MM-DD'
        app.db('tasks')
            .where({userId:req.user.id})
            .where('estimateAt','<=',date)
            .orderBy('estimateAt')
            .then(tasks=>res.status(200).json(tasks))
            .catch(err=>res.status(400).json(err))
            /*return res.status(200).send(`mensagem enviada de ${req.user.id}
            para ${date}`)*/
    }
    const save=(req,res)=>{
        if(!req.body.desc.trim()){
            return res.status(400).send('Descrição é um erro obrigatório')
        }
        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)//obs1
            .then(_=>res.status(204).send())
            .catch(err=>res.status(400).json(err))
            // obs1:posso mandar a requisicao diretamente
            // para o banco pois estou usando os mesmos nomes de variaveis
            // tanto no frontend quanto no backend
    }

    const remove = (req,res)=>{
        app.db('tasks')
            .where({id:req.params.id,userId:req.user.id})
            .del()
            .then(rowsDeleted=>{
                if(rowsDeleted>0){
                    res.status(204).send()
                }else{
                    let msg = `Não foi encontrada task com id ${req.params.id}`
                    res.status(400).send(msg)
                }
            })
            .catch(err=>res.status(400).json(err))
    }
    const updateTaskDoneAt = (req,res,doneAt)=>{
        app.db('tasks')
            .where({id:req.params.id,userId:req.user.id})
            .update({doneAt:doneAt})
            .then(a =>res.status(204).send(''))
            .catch(err=>res.status(400).json(err))
    }
    
    const toggleTask = (req,res)=>{
        app.db('tasks')
            .where({id:req.params.id,userId:req.user.id})
            .first()
            .then(task=>{
                if(!task){
                    const msg= `Task com id ${req.params.id} não encontrada!`
                    return res.status(400).send(msg)
                }
                const doneAt = task.doneAt?null:new Date()
                return updateTaskDoneAt(req,res,doneAt)
                //return res.status(200).send('chegou ate aqui')
            })
            .catch(err=>res.status(400).json(err))
        /*let msg = `msg teste, userId: ${req.user.id}, id task: ${req.params.id}`
        return res.status(200).send(msg)*/
    }
    return {getTasks,save,remove,toggleTask}
}