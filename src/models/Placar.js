// Dúvida: podemos usar um extend no constructor se quisermos puxar equipes já cadastrdas no sistema pra jogar?
        // usar isso  no placar e não com o exteds, mas com o module.exports

class Placar{
    #golsA;
    #golsB; 

        constructor(golsA,golsB){
            this.golsA = golsA;
            this.golsB = golsB;
        }

        set golsA(valor){
            // ABAIXO: VERIFICAÇÃO  -> o golsA precisa receber um valor. Esse valor NÃO vai ser aceito se ele NÃO for: inteiro, número ou negativo
            if(!Number.isInteger(valor) || valor < 0) {
                console.log('[Erro] Gol informado é inválido');
                return;
            } 
            this.#golsA = valor;

        }

        get golsA(){
            return this.#golsA;
        }

        // O valor naão precisa ser alterado do golsA pro B pois ele morre dentro da function

        set golsB(valor){
            // ABAIXO: VERIFICAÇÃO  -> o golsA precisa receber um valor. Esse valor NÃO vai ser aceito se ele NÃO for: inteiro, número ou negativo
            if(!Number.isInteger(valor) || valor < 0) {
                console.log('[Erro] Gol informado é inválido');
                return;
            } 
            this.#golsB = valor;

        }

        get golsB(){
            return this.#golsB;
        }

        
        // aqui só poderemos retornar com A, B ou empate
        vencedor(){
            if(this.#golsA > this.#golsB) return  console.log("O vencedor é 'A'");
            if(this.#golsA < this.#golsB) return  console.log("O vencedor é 'B'");
            return console.log ("Houve um empate");
        }
}

module.exports = Placar;


// com # -> muda diretamente 
// sem # -> força a passar pela verificaçõa do set 