const AtletaView = require("../views/AtletaView");
const fn = require ('fs');
const path = require ('path');

const ARQUIVO_ATLETA  = path.join(__dirname, 'atleta.json');
const AtletaController = {
    adicionar(sistema){
        //Listar Turmas - TurmaVieW
        const idTurma = AtletaView.perguntarIdTurma();
        try {
            sistema.buscarTurmaOuFalhar(idTurma);
            const nome = AtletaView.perguntarNome();
            const { atleta, turma } = sistema.adicionarAtleta(idTurma, nome);
            AtletaView.mostrarAtletaVinculado(atleta.nome, turma.nome);
        } catch(erro) {
            AtletaView.mostrarErroCadastro(erro.message);
        }
    },

    listar(sistema) {
        AtletaView.listar(sistema.listarAtletas());
    },
};

module.exports = AtletaController;