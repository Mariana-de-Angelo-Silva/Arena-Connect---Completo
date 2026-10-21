const PartidaView = require('../views/PartidaView');

const PartidaController = {

        registrarPartida(sistema){
            sistema.listarEquipes();

            try{
                const idEquipeA = PartidaView.perguntarIdEquipe("Informe o ID da equipe A: ");
                const idEquipeB = PartidaView.perguntarIdEquipe("Informe o ID da equipe B: ");
                const golsA= PartidaView.perguntarGols("Informe os gols da equipe A: ");
                const golsB= PartidaView.perguntarGols("Informe os gols da equipe B: ");
                const { nomeEquipeA, nomeEquipeB } = sistema.registrarPartida(idEquipeA, idEquipeB, golsA, golsB);
                PartidaView.mostrarRegistrada(nomeEquipeA, nomeEquipeB, golsA, golsB );

            } catch (erro){
                PartidaView.mostrarErroCadastro(erro.message);
            }

        },
    
        listar(sistema){
            PartidaView.listarPartidas(sistema.listarPartidas());
        }    
    
}

module.exports = PartidaController;