const prompt = require('prompt-sync')();

const TurmaView = {
    perguntarNome() {
        return prompt("Informe o nome da Turma: ");
    },

    mostrarTurmaCriada() {
        console.log('Turma criada com sucesso!');
    },

    mostrarErroCadastro(mensagem) {
        console.log(`[ERRO] Não foi possível cadastrar a turma: ${mensagem}`);
    },

    // Recebe a lista 'turmas' enviada pelo Controller
    turmaListar(turmas) {
        if (!turmas || turmas.length === 0) {
            console.log("Nenhuma turma cadastrada.");
            return;
        }

        console.log(`--- Lista de Turmas (Total: ${turmas.length}) ---`);
        turmas.forEach((turma, index) => {
            // Ajuste 'turma.nome' conforme a propriedade do seu objeto Turma
            console.log(`${index + 1}. ${turma.nome || turma}`);
        });
    }
};

module.exports = TurmaView;