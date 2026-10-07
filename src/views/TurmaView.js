const prompt = require('prompt-sync')();

const TurmaView = {
    perguntarNome(){
        return prompt("Informe o nome da Turma: ");
    },

    mostrarTurmaCriada(){
        console.log('Turma criada com sucesso')
    },

    mostrarErroCadastro(mensagem) {
    console.log(`[ERRO] Não foi possível cadastrar a turma: ${mensagem}`);
    },

   turmaExibir(){
        console.log(`ID: ${this.id} | Sala: ${this.nome}`);
   },

    turmaListar(){
        console.log(Turmas.length());
    }
}

module.exports = TurmaView;