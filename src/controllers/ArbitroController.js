const ArbitroView = require('./src/views/ArbitroView');

const ArbitroController = {

    adicionar(sistema){
        const nome = ArbitroView.perguntarNome();
        const numeroCredencial = ArbitroView.perguntarCredeicial();
        const anosExperiência = ArbitroView.perguntarAnosExperiencia();
         try {
                    sistema.buscarArbitroOuFalhar(idArbitro);
                    const nome = ArbitroView.perguntarNome();
                    const numeroCredencial = ArbitroView.perguntarCredeicial();
                    const anosExperiencia = ArbitroView.perguntarAnosExperiencia();
                } catch (erro) {
                    ArbitroView.mostrarErroCadastro(erro.mensagem);
    },

    listar(sistema){
        AtletaView.listar(sistema.listarArbitros());
    }
}