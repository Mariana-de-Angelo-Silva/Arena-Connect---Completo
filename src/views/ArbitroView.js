const prompt = require('prompt-sync')();

const ArbitroView = {

    perguntarNome(){
        return prompt("Informe o nome do arbitro: ");
    },
    
    perguntarCredencial(){
        return parseInt(prompt("Informe a credencial do arbitro: "));
    },

    perguntarAnosExperiencia(){
        return parseInt(prompt("Possui quantos anos de experiência? "));
    },

    mostrarArbitroCriado(){
        console.log("Arbitro cadastrado com sucesso!")
    },

    mostrarErroCadastro(mensagem) {
        console.log(`✖ Não foi possível cadastrar o arbitro: ${mensagem}`);
    },

    listarAtletas(arbitros){
            console.log("\n=== LISTA DE ARBITROS ===");
            if (arbitros.length === 0) return console.log("Nenhum arbitro no sistema.");
            arbitros.forEach(({ arbitro, numeroCredencial, anosExperiencia }) => arbitro.exibir());
        },
}