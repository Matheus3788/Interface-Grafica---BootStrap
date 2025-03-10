const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")
const { createPool } = require("mysql2")
const { where } = require("sequelize")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine","handlebars")

app.use(bodyParser.urlencoded({defaultLayout: "main"}))//extended:flase
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.render("primeira_pagina")
})

app.listen(8081,function(){
    console.log("Servidor Ativo!")
})

app.post("/cadastrar", function(req,res){
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone: req.body.telefone,
        celular: req.body.celular
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("erro: " + erro)
    })
    // console.log("Dados Cadastrados")
    // res.send("Nome: " + req.body.nome)
})

app.get("/consulta", function(req,res){
    post.findAll().then(function(posts){
        res.render("consulta",{posts:posts})
        console.log(post)
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/editar/:id", function(req,res){
    post.findAll({where: {"id": req.params.id}}).then(function(posts){
        res.render("editar", {posts:posts})        
    })
})


app.post("/atualizar", function(req,res){
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone: req.body.telefone,
        celular: req.body.celular
    }, {where:{id:req.body.id}}).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
        res.send("Erro ao atualizar: " + erro)
    })
})

app.get("/excluir/:id", function(req,res){
    post.destroy({where:{"id":req.params.id}}).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
        res.send("Erro ao atualizar: " + erro)
    })
})


app.get("/excluir", function(req,res){

})