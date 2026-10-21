const Placar = require ('./Placar');

class Partida {
    #id; 
    #idEquipeA;
    #idEquipeB;
    #modalidade;
    #placar;

    constructor(id, idEquipeA, idEquipeB, modalidade, golsA, golsB){
        console.log(id, idEquipeA, idEquipeB, modalidade, golsA, golsB)
        this.#id = id;
        this.idEquipeA = idEquipeA;
        this.idEquipeB = idEquipeB;
        this.modalidade = modalidade;
        this.#placar =  new Placar(golsA, golsB); // aqui acontece a composição -> Não faz sentido uma Partida não ter um Placar
    }
    
    get id(){ return this.#id;}
    
    // SETS:

    set idEquipeA(valor){
            if(!Number.isInteger(valor) || valor < 0) {
                console.log("O ID A dessa equipe é invalido!");
                return;
        }
        this.#idEquipeA = valor;
    }
    
    get idEquipeA(){ return this.#idEquipeA;}

    set idEquipeB(valor){
            if(!Number.isInteger(valor) || valor < 0) {
                console.log("O ID B dessa equipe é invalido!");
                return;
        }
        this.#idEquipeB = valor;
    }
    
    get idEquipeB(){ return this.#idEquipeB;}

    set modalidade(categoria){
        if(!categoria){
            console.log("A categoria é invalida para as modalidades!");
            return;
        }
        this.#modalidade = categoria;
    }

    get modalidade(){ return this.#modalidade;}
    // GETS:

    get placar(){ return this.#placar;}


    // Exibir:

    exibir(nomeEquipeA, nomeEquipeB){
        console.log(`ID: ${this.id} | ${nomeEquipeA}  ${this.placar.golsA}  X  ${this.placar.golsB} ${nomeEquipeB} | ${this.modalidade}`);
    }

}

module.exports = Partida;