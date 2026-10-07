const prompt = require('prompt-sync')();
const Modalidade = require('./src/views/ModalidadesView');
const Turma = require('./src/views/TurmaView');

const EquipeView ={

    
     listarEquipes(equipes){
        console.log("\n=== LISTA DE EQUIPES ===");
        if (equipes.length === 0) return console.log("Nenhuma equipe no sistema.");
        equipes.forEach(({ id, idTurma, modalidade}) => equipe.exibir());
    }, //também no criar e remover


    //criar equipe:
    perguntarIdTurma(){
        return parseInt(prompt("Informe o ID da turma: "));
    }, // também no remover

    perguntarModalidade(){
        ModalidadesView.listarModalidades();
        return prompt("Informe qual a modalidade desejada: ");
    },

    mostrarErro(mensagem) {
    console.log(`[ERRO] Não foi possível criar a turma: ${mensagem}`);
    }, // repetido no criar, remover e desvincular



    //remover equipe: Repetidos

    //vincular Atleta:

    perguntarIdAtleta(){
         listarTurma = TurmasView.listarTurmas();
         return parseInt(prompt("Informe o ID do atleta a ser vinculado: "));
    }, // repetido no desvincular


}