const prompt = require('prompt-sync')();

const PartidaView = {
    perguntarIdEquipe(mensagem){
        return parseInt(prompt(mensagem));
    },

    perguntarGols(mensagem){
        return parseInt(prompt(mensagem));
    },

    mostrarRegistrada(nomeA, nomeB, golsA, golsB){
        console.log(`Partida registrada com sucesso: ${nomeA} ${golsA}  X ${golsB} ${nomeB} ! `);
    },

    mostrarErroCadastro(mensagem){
        console.log(`Não foi possível cadastrar a partida. Erro: ${mensagem}`);
    },

    listarPartidas(lista){
        console.log("======Lista de Partidas======");
        if(lista.lenght === 0) return console.log("Nenhuma partida registrada");
        lista.forEach(({partida, nomeEquipeA, nomeEquipeB}) => partida.exibir( nomeEquipeA, nomeEquipeB ));

    }

}

module.exports = PartidaView;