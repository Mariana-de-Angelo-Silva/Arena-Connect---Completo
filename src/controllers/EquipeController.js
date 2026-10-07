const AtletaView = require('../views/AtletaView');
const TurmaView = require('../views/TurmaView');


const EquipeCrontroller = {

    criarEquipe(sistema){
        const turmas = sistema.listarTurmas(); 
        const idTurma = EquipeView.perguntarIdTurma();
        const modalidade = EquipeView.perguntarModalidade();
        try{
            const equipe = sistema.criarEquipe(idTurma,modalidade);
        }catch{
            EquipeView.mostrarErro(erro.mensagem);
        }
    },

    removerEquipe(sistema){

        console.log(EquipeView.listarEquipes());
        const idEquipe = EquipeView.perguntarIdTurma();
        try{
            const equipe = sistema.removerEquipe();
        } catch{
            EquipeView.mostrarErro(erro.mensagem);
        }
    },

    vincularAtleta(){
        const idAtleta = EquipeView.perguntarIdAlteta();
        try{
            const atleta = sistema.vincularAtleta();
        } catch{
            EquipeView.mostrarErro(erro.mensagem);
        }
    },

    desvincularAtleta(){
        const idAtleta = EquipeView.perguntarIdAlteta();
        try{
            const atleta = sistema.desvincularAtleta();
        } catch{
            EquipeView.mostrarErro(erro.mensagem);
        }
    }

}