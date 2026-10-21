// =============================== instalando o server express: ===============================

const express = require ('express');
const ArenaConnect = require('./src/models/ArenaConnect');


const app = express();
const sistema = ArenaConnect.getInstancia();
PORT = 3000; //usamos para não ter que mudar sempre a porta em todo o código caso seja necessário



app.use(express.json);


app.use((req, res, next) => { // o app.use recebe todas as requisições, ele passa pelo next, que intercepta antes de ir pro /turmas, ele manda pro carregarEstado pra atualizar as informaçõs antes de mandar pro turma
    sistema.carregarEstado(true);
});
// por que do código anterior: A API roda a todo o momento, por isso, precisamos precisamos 


// ROTAS PARA TURMAS:

app.get('/turmas', (req,res) => {
    res.json(sistema.dadosTurmas())
});

app.get('/turmas/:id', (req,res) => {
    try{
        res.json(sistema.dadosDaTurma(Number(req.params.id))); // mandando dados do sistema
    } catch (erro) {
        res.status(404).json({erro: erro.message}); // a chave aqui é para montar um json
    }
});


//ROTAS PARA:

// Equipe
app.get('/equipes', (req,res) => {
    res.json(sistema.dadosEquipes());
});


// Equipe id
app.get('/equipes/:id', (req,res) => {
    try{
    res.json(sistema.dadosEquipes(Number(req.params.id)));
    } catch (erro) {
        res.status(404).json({erro: erro.message})
    }
});


// Partidas
app.get('/Partidas', (req,res) => {
    res.json(sistema.dadosPartidas());

});


// Classificação
app.get('/Classificacao', (req,res) => {
    res.json(sistema.classificacaoGeral());

});

app.listen(PORT, () => {
    console.log(`Arena-Connect API em http://localhost:${PORT}`)
});



