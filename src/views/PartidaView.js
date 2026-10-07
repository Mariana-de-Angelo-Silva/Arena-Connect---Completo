const prompt = require('prompt-sync')();

const PartidaView = {
    perguntarIdEquipe(mensagem){
        return parseInt(prompt(mensagem));
    },

    perguntarGols(mensagem){
        return prompt(mensagem);
    },

    mostrarRegistrada(nomeA,golsA, nomeB, golsB){
        console.log(`Partida registrada com sucesso: ${nomeA} ${nomeB}  X ${golsA} ${golsB} ! `);
    },

    mostrarErroCadastro(mensagem){
        console.log(`Não foi possível cadastrar a partida. Erro: ${mensagem}`);
    },

    listarPartidas(lista){
        console.log("======Lista de Partidas======");
        if(lista.lenght === 0) return console.log("Nenhuma partida registrada");
        lista.forEach(({partida, nomeEquipeA, nomeEquipeB}) => partida.exibir({ nomeEquipeA, nomeEquipeB}));

    }

}