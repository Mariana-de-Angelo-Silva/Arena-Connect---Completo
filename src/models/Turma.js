class Turma {
    #id;
    #nome;

    constructor(id, nome) {
        this.#id = id;
        this.nome = nome;
    }

    get id() {
        return this.#id;
    }

    set nome(novoNome) {
        if (!novoNome || novoNome.length < 2) {
           
        }
        this.#nome = novoNome.toUpperCase();
    }

    get nome() {
        return this.#nome;
    }

    
}

module.exports = Turma;