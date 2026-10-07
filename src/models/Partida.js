const Placar = require ('./Placar');

class Partida {
    #id; 
    #idEquipeA;
    #idEquipeB;
    #modalidade;
    #placar;

    constructor(id, idEquipeA, idEquipeB, modalidade, golsA, golsB){
        this.id = id;
        this.idEquipeA = idEquipeA;
        this.idEquipeB = idEquipeB;
        this.modalidade = modalidade;
        this.#placar =  new Placar(golsA,golsB); // aqui acontece a composição -> Não faz sentido uma Partida não ter um Placar
    }

    
    // SETS:

    set idEquipeA(valor){
            if(!Number.isInteger(valor) || valor < 0) {
                console.log("O ID dessa equipe é invalido!");
                return;
        }
        this.#idEquipeA = valor;
    }


    set idEquipeB(valor){
            if(!Number.isInteger(valor) || valor < 0) {
                console.log("O ID dessa equipe é invalido!");
                return;
        }
        this.#idEquipeB = valor;
    }

    set modalidade(categoria){
        if(!categoria){
            console.log("A categoria é invalida para as modalidades!");
            return;
        }
        this.#modalidade = categoria;
    }
    // GETS:

    get idEquipeA(){ return this.#idEquipeA;}
    
    get idEquipeB(){ return this.#idEquipeB;}

    get modalidade(){ return this.#modalidade;}

    get id(){ return this.#id;}

    get Placar(){ return this.#placar;}


    // Exibir:

    exibir(nomeEquipeA, nomeEquipeB){
        console.log(`ID: ${this.id} | ${nomeEquipeA}  ${this.placar.golsA}  X  ${this.placar.golsB} ${nomeEquipeB} | ${this.modalidade}`);
    }

}

module.exports = Partida;