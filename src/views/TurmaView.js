const prompt = require('prompt-sync')();

const TurmaView = {
    perguntarNome(){
        return (prompt("Informe o nome da Turma: "));
    },

    mostrarTurmaCriada(nome, id){
        console.log('Turma criada com sucesso')
        return 
    },

    ErroNome(){
         console.log('[ERRO] Nome de turma inválido. Acesso negado.');
            return
    },

   exibir(){
        console.log(`ID: ${this.id} | Sala: ${this.nome}`);
    }
}