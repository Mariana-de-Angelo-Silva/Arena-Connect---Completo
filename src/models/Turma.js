class Turma {
    #id;
    #nome;

    constructor(id, nome) {
        this.#id = id;
        this.nome = nome; // Isso chama automaticamente o 'set nome(nome)'
    }

    get id() {
        return this.#id;
    }

    set nome(novoNome) {
        // Validação: lança um erro se o nome for inválido ou muito curto
        if (!novoNome || typeof novoNome !== 'string' || novoNome.trim().length < 2) {
            throw new Error("O nome da turma deve ter pelo menos 2 caracteres.");
        }
        this.#nome = novoNome.toUpperCase();
    }
    
    get nome() {
        return this.#nome;
    }
    exibir() {
        console.log(`ID: ${this.#id} | Sala: ${this.nome}`)
    }
}

module.exports = Turma;