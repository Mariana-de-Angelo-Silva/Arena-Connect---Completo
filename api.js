// =============================== instalando o server express: ===============================

const express = require ('express');
const ArenaConnect = require('./src/models/ArenaConnect');
const Equipe = require('./src/models/Equipe');


const app = express();
const sistema = ArenaConnect.getInstancia();
const PORT = 3000; //usamos para não ter que mudar sempre a porta em todo o código caso seja necessário



app.use(express.json());


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

function existe (res,buscar){  
    try{
        buscar();
        return  true;
    } catch (erro){
        res.status(404).json({ erro: erro.message})
        return false;
    }
}

// ============================= TURMAS ====================================
app.post('/turmas', (req,res) => {
    const { nome } = req.body ?? {};
    try{
        const turma = sistema.adicionarTurma(nome);
        sistema. salvarEstado();
        res.status(201).json(sistema.dadosDaTurma(turma.id)); // não podemos passar o "turma" diretamente pois ele não mostraria os dados privados -> mostrar esses dados privados é o motivo de chamar o "dadosTurma
    } catch (erro) {
        res.status(400).json({erro: erro.messagem});
    }
})

app.put ('/turmas/:id', (req,res) => {
    const id = Number(req.params.id);
    if(!existe (res, () => sistema.buscarTurmaOuFalhar(id))) return; // ele já deu o 404 quando chamou o "existe"
    const {nome} = req.body ?? {};
    try {
        const turma = sistema.adicionarTurma(id, nome);
        sistema.salvarEstado();
        res.status(201).json({erro: erro.message});
    } catch (erro){
        res.status(400).json({erro: erro.message})
    }
})

app.delete('/turmas/:id', (req,res) => {
    const id = Number(req.params.id);
    if(!existe(res, () => sistema.buscarTurmaOuFalhar(id)));
    try{
        sistema.removerTurma(id);
        sistema.salvarEstado();
        res.status(204).end();
    } catch (erro){
        res.status(409).json({erro: erro.message})
    }
})
// ==================================================================

//====================== EQUIPES ===================================

app.post('/equipes', (req,res) => {
    const { nome } = req.body ?? {};
    try{
        const turma = sistema.adicionarEquipe(nome);
        sistema. salvarEstado();
        res.status(201).json(sistema.dadosDaEquipe(Equipe.id)); 
    } catch (erro) {
        res.status(400).json({erro: erro.messagem});
    }
})


app.put ('/equipes/:id', (req,res) => {
    const id = Number(req.params.id);
    if(!existe (res, () => sistema.buscarEquipesOuFalhar(id))) return; 
    const {nome} = req.body ?? {};
    try {
        const turma = sistema.adicionarEquipe(id, nome);
        sistema.salvarEstado();
        res.status(201).json({erro: erro.message});
    } catch (erro){
        res.status(400).json({erro: erro.message})
    }
})

app.delete('/equipes/:id', (req,res) => {
    const id = Number(req.params.id);
    if(!existe(res, () => sistema.buscarEquipeOuFalhar(id)));
    try{
        sistema.removerEquipe(id);
        sistema.salvarEstado();
        res.status(204).end();
    } catch (erro){
        res.status(409).json({erro: erro.message})
    }
})
// ==================================================================




app.listen(PORT, () => {
    console.log(`Arena-Connect API em http://localhost:${PORT}`);
});



