module.exports = (app)=>{
    //abrir o arquivo login.ejs
    app.get('/login',(req,res)=>{
        res.render('login.ejs')
    })
    //validar o usuário e a senha 
    app.post('/login',async(req,res)=>{
        //recuperar as informações digitadas no formulário
        var dados = req.body
        //conectar com o banco de dados
        var database = require('../config/database')()
        //selecionar a model usuarios 
        var usuarios = require('../models/usuarios')
        //vereficar se o email está cadastrado
        var verificar = await usuarios.findOne(
            {email:dados.email})
            if(!verificar){
                return res.send("Email não cadastrado!") 
            }
            var cript = require('bcryptjs')
                var comparar = await cript.compare(dados.senha,verificar.senha)
                if(!comparar){
                    return res.send("Senha Inválida!")
                }
                //redirecionar para rota atividades(precisa do id)
                res.redirect('/atividades?id='+verificar._id)
                res.render("atividades.ejs",{lista:buscar,nome:verificar.nome,id:verificar._id})
    })
}