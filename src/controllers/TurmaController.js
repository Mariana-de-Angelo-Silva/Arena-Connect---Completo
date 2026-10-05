const TurmaView = require('../views/TurmaView');

const TurmaController = {

    adicionar(sistema){
        //Listar Turmas - TurmaVieW
        try {
            const nome = TurmaView.perguntarNome();
            const { turmaNova } = sistema.adicionarTurma(idTurma, nome);
            TurmaView.mostrarTurmaCriada( turma.nome, turma.id);
        } catch(erro) {
            TurmaView.mostrarErroCadastro(erro.message);
        }
    },

    listar(sistema) {
        TurmaView.listar(sistema.listarTurmas());
    },
}
