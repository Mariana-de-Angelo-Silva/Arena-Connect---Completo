const fn = require ('fs');
const path = require ('path');
const AtletaController = require('./src/controllers/AtletaController');
const PartidaController = require('./src/controllers/PartidaController')
const ArenaConnect = require('./src/models/ArenaConnect');
const MenuView = require('./src/views/MenuView');

function main() {
    const sistema = ArenaConnect.getInstancia();
    sistema.carregarEstado();

    while (true) {
        sistema.salvarEstado(sistema);
        const op = MenuView.mostrarMenu();
        if (op === '1') sistema.adicionarTurma(sistema);
        else if (op === '2') sistema.listarTurmas(sistema);
        else if (op === '3') AtletaController.adicionar(sistema);
        else if (op === '4') AtletaController.listar(sistema);
        else if (op === '5') sistema.adicionarArbitro(sistema);
        else if (op === '6') sistema.listarArbitros(sistema);
        else if (op === '7') sistema.adicionarEquipe(sistema);
        else if (op === '8') sistema.listarEquipes(sistema);
        else if (op === '9') sistema.vincularAtletaEquipe(sistema);
        else if (op === '10') sistema.desvincularAtletaEquipe(sistema);
        else if (op === '11') sistema.removerEquipe(sistema);
        else if (op === '12') PartidaController.registrarPartida(sistema);
        else if (op === '13') PartidaController.listar(sistema);
        else if (op === '99') sistema.salvarEstado(sistema);
        else if (op === '0') {
            sistema.salvarEstado();
            break;
        }
        else MenuView.mostrarOpcaoInvalida();
    }
}
if (require.main === module) {
    main();
}

