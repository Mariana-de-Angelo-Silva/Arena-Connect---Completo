const TurmaView = require('../views/TurmaView');

const TurmaController = {

    adicionar(sistema){
       const nome = TurmaView.perguntarNome();
        try {
            const { turma } = sistema.adicionarTurma(nome);
            TurmaView.mostrarTurmaCriada();
        } catch(erro) {
            TurmaView.mostrarErroCadastro(erro.mensage);
        }
    },

    listar(sistema) {
        TurmaView.turmaListar(sistema.listarTurmas());
    },
}
