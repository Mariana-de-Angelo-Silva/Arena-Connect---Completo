const TurmaView = require('../views/TurmaView')();

const TurmaController = {
    adicionar(sistema) {
        try {
            const nome = TurmaView.perguntarNome();

            sistema.adicionarTurma(nome);


            TurmaView.mostrarTurmaCriada();
        } catch (erro) {
            TurmaView.mostrarErroCadastro(erro.message);
        }
    },

    listar(sistema) {
        TurmaView.turmaListar(sistema.listarTurmas());
    }
};

module.exports = TurmaController;
