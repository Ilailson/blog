const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')
const Pergunta = require('./database/pergunta')

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

app.get("/", (req, res) =>
    {
        res.render("index")
    }
)

app.post
("/salvarpergunta", (req, res) =>
{
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
      })
      .then(() =>
      {
        res.redirect("/")
      }
      )
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

