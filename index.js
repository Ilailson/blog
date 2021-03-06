const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')
const pergunta = require('./database/pergunta')
const resposta = require('./database/resposta')

//sicronizando a criação com o banco.
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão realizada com sucesso")
    }
    ).catch((msgError) => {
        console.log("Erro ao conectar")
        console.error(msgError)
    })


    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
//===============rotas===================
app.get
("/perguntar",(req, res) => 
    {
        res.render("perguntar")   
    }
)

app.get("/pergunta", (req, res) =>
    {
        res.render("pergunta")
    }
)

//exibir todas as perguntas no formulário pergunta
app.get("/", (req, res) =>{
    pergunta.findAll({
        raw: true, order: 
        [
            ['id','desc']
        ]
    })
    .then(perguntas =>{
        res.render("index", {
            perguntas: perguntas
        })
    })
})

app.post
("/salvarpergunta", (req, res) =>
{
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    pergunta.create({
        titulo: titulo,
        descricao: descricao
      })
      .then(() =>
      {
        res.redirect("/")
      }
      )
})

//=======================Rotas respostas =====================

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    pergunta.findOne({where: {id: id}})
    .then(pergunta => {
        if (pergunta != undefined) {
            //exibir respostas - antes - renderizar
            /*Passando - views
            pergunta: pergunta,
            respostas: respostas
            */
            resposta.findAll(
                {where: 
                    {perguntaId: pergunta.id}, 
                order: 
                [
                    ['id', 'DESC']
                ]})
            .then(resposta => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    resposta: resposta
                })
            })
            
        } else {
            res.redirect("/")
        }
       
    })

}


)

app.post('/responder',(req, res) => {
    //variaveis para receber as perguntas do formulário
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    resposta.create({
       corpo: corpo,
       perguntaId: perguntaId 
    }).then(() => {
       res.redirect("/pergunta/"+perguntaId) 
    })
})

app.listen
(
    8081, (erro) => 
    {
        if (erro) {
            console.log('Ocorreu um erro')
        } else {
            console.log('App rodando!')
        }
    } 
)

