const express = require('express')
const app = express()


app.set('view engine', 'ejs')
app.use(express.static('public'))

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

