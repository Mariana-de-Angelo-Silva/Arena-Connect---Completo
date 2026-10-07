const PartidaView = require('../views/PartidaView');

const PartidaController = {

        registrarPartida(sistema){
            sistema.listarEquipe();

            try{
                const idEquipeA = PartidaView.perguntarIdEquipe("Informe o ID da equipe A: ");
                const idEquipeB = PartidaView.perguntarIdEquipe("Informe o ID da equipe B: ");
                const golsA= PartidaView.perguntarGols("Informe os gols da equipe A: ");
                const golsB= PartidaView.perguntarGols("Informe os gols da equipe B: ");
                const {equipeA, equipeB} = sistema.registrarPartida (idEquipeA, idEquipeB, golsA, golsB);
                PartidaView.mostrarRegistrada(equipeA.modalidade, equipeB.modalidade, golsA, golsB );

            } catch (erro){
                PartidaView.mostrarErroCadastro(mensagem);
            }

        },
    
        listar(sistema){
            PartidaView.listarPartidas(sistema.listarPartidas());
        }    
    
}