const Modalidade = require('./Modalidade');
const CadastroFactory = require('./CadastroFactory');
const { calcularClassificacao } = require('./Classificacao');
const fn = require ('fs');
const path = require ('path');


const ARQUIVO = path.join(__dirname,'memoriaArena.json');

class Pessoa {
    #Atleta;
    #Arbitro;

        contructor (atleta, arbitro) {
            this.Atleta = atleta;
            this.Arbitro = arbitro;
        }
        get Atleta (){}
};

class ArenaConnect {

    static #instancia = null;
    // SINGLETON: todo o sistema pega o gerenciador por aqui — nunca por `new`.
    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }
        return ArenaConnect.#instancia;
    }

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error('ArenaConnect já existe. Use ArenaConnect.getInstancia().');
        }
        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];
        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
        this.idEquipeContador = 1;
    }

    adicionarTurma(nome){ //pede pra criar a turma
        const turma = CadastroFactory.criarTurma(this.idTurmaContador, nome); // manda o pedido pro cadastrofactory
        this.idTurmaContador++; // add ela no id contador (crianodo um id pra ela)
        this.turmas.push(turma); //ativando um criar turma
        return turma;
    }

    editarTurma(idTurma, novoNome){ // pede pra editar turma
        const turma = this.buscarTurmaOuFalhar(idTurma); // mostra s turmas que tem com o buscarTurma passando o id
        CadastroFactory.criarTurma(idTurma, novoNome)// ele não cria uma nova turma, ele só faz a verificação dos novos dados e informa se houverem erros 
        turma.nome = novoNome;
        return turma;
        //não precisamos de um push, pois ele cria novas turmas e nesse caso apenas atualiza o objeto
    }

    removerTurma(idTurma){
        const turma = this.buscarTurmaOuFalhar(idTurma);
        if(this.atletas.some(a => a.idTurma === idTurma)){
            throw new Error (`a turma ${turma.nome} ainda possui atletas. Remova ou mude os atletas antes.`);
        }

        if(this.equipes.some(e => e.idTurma === idTurma)){
            throw new Error(`a turma ${turma.nome} ainda possui equipes. Remova ou mude as equipes antes.`)
        }
        this.turmas = this.turmas.filter(t => t.id !== turma.id);
        return turma;
    }

    listarTurmas() {
        console.log("\n=== LISTA DE TURMAS ===");
        if (this.turmas.length === 0) return console.log("Nenhuma turma no sistema.");
        this.turmas.forEach(t => t.exibir());
    }

    // NOVO (Clean Code): a pré-condição "essa turma deveria existir" agora
    // lança um erro de verdade em vez de só imprimir e devolver undefined.
    // Quem chama decide como reagir (ver adicionarAtleta() abaixo).
    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(t => t.id === idTurma);
        if (!turma) {
            throw new Error(`Turma com ID ${idTurma} não existe.`);
        }
        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(a => a.id === idAtleta);
        if (!atleta) throw new Error(`Atleta com ID ${idAtleta} não existe.`);
        return atleta;
    }

    buscarArbitroOuFalhar(nome) {
        const arbitro = this.arbitros.find(a => a. nome === nome.arbitro);
        if (nome = nome.arbitro) throw new Error(`Arbitro com nome ${nome} já existe.`);
        return arbitro;
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(e => e.id === idEquipe);
        if (!equipe) throw new Error(`Equipe com ID ${idEquipe} não existe.`);
        return equipe;
    }

    adicionarAtleta(idT, nome) {
        const turma = this.buscarTurmaOuFalhar(idT);
        const novoAtleta = CadastroFactory.criarAtleta(this.idAtletaContador, nome, idT);
        this.idAtletaContador++;
        this.atletas.push(novoAtleta);
        return { atleta, turma };
    }

    listarAtletas() {
        return this.atletas.map(atleta => ({
            atleta,
            nomeTurma: this.turmas.find(t => t.id === atleta.idTurma)?.nome ?? 'Turma não encontrada',
        }))
    }

    adicionarArbitro() {
        const nome = prompt("Nome do Árbitro: ");
        const numeroCredencial = parseInt(prompt("Número de Credencial: "));
        const anosExperiencia = parseInt(prompt("Anos de Experiência: "));
        try {
            const novoArbitro = CadastroFactory.criarArbitro(this.idArbitroContador, nome, numeroCredencial, anosExperiencia);
            this.idArbitroContador++;
            this.arbitros.push(novoArbitro);
            console.log("✔ Árbitro registrado com sucesso!");
        } catch (erro) {
            console.log(`✖ Árbitro não registrado: ${erro.message}`);
        }
    }

    listarArbitros() {
        console.log("\n=== LISTA DE ÁRBITROS ===");
        if (this.arbitros.length === 0) return console.log("Nenhum árbitro no sistema.");
        this.arbitros.forEach(a => a.exibir());
    }


    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(e => e.idTurma === idTurma && e.modalidade === modalidade);
    }

    adicionarEquipe() {
        this.listarTurmas();
        const idT = parseInt(prompt("ID da Turma: "));

        try {
            const turma = this.buscarTurmaOuFalhar(idT);

            console.log("\nModalidades disponíveis:");
            Object.values(Modalidade).forEach(m => console.log(`- ${m}`));
            const modalidade = prompt("Modalidade (copie exatamente como está na lista acima): ");

            if (this.equipeJaExiste(idT, modalidade)) {
                throw new Error(`a turma ${turma.nome} já tem uma equipe em "${modalidade}".`);
            }

            const novaEquipe = CadastroFactory.criarEquipe(this.idEquipeContador, idT, modalidade);
            this.idEquipeContador++;
            this.equipes.push(novaEquipe);
            console.log(`✔ Equipe registrada: ${turma.nome} em "${modalidade}"!`);
        } catch (erro) {
            console.log(`✖ Equipe não registrada: ${erro.message}`);
        }
    }

    listarEquipes() {
        console.log("\n=== LISTA DE EQUIPES ===");
        if (this.equipes.length === 0) return console.log("Nenhuma equipe no sistema.");
        this.equipes.forEach(e => {
            const turma = this.turmas.find(t => t.id === e.idTurma);
            const nomesAtletas = e.atletas
                .map(idA => this.atletas.find(a => a.id === idA))
                .filter(a => a)
                .map(a => a.nome);
            e.exibir(turma ? turma.nome : "TURMA NÃO ENCONTRADA", nomesAtletas);
        });
    }

    removerEquipe() {
        this.listarEquipes();
        const idE = parseInt(prompt("ID da Equipe a remover: "));

        try {
            const equipe = this.buscarEquipeOuFalhar(idE);
            this.equipes = this.equipes.filter(e => e.id !== equipe.id);
            console.log(`✔ Equipe removida. Os atletas continuam no sistema (total de atletas: ${this.atletas.length}).`);
        } catch (erro) {
            console.log(`✖ Não foi possível remover: ${erro.message}`);
        }
    }

    vincularAtletaEquipe() {
        this.listarEquipes();
        const idE = parseInt(prompt("ID da Equipe: "));

        try {
            const equipe = this.buscarEquipeOuFalhar(idE);

            this.listarAtletas();
            const idA = parseInt(prompt("ID do Atleta: "));
            const atleta = this.buscarAtletaOuFalhar(idA);

            if (atleta.idTurma !== equipe.idTurma) {
                throw new Error(`${atleta.nome} não pertence à turma dessa equipe.`);
            }
            if (!equipe.adicionarAtleta(idA)) {
                throw new Error(`${atleta.nome} já está nessa equipe.`);
            }
            console.log(`✔ ${atleta.nome} vinculado à equipe de "${equipe.modalidade}"!`);
        } catch (erro) {
            console.log(`✖ Não foi possível vincular: ${erro.message}`);
        }
    }

    desvincularAtletaEquipe() {
        this.listarEquipes();
        const idE = parseInt(prompt("ID da Equipe: "));

        try {
            const equipe = this.buscarEquipeOuFalhar(idE);
            const idA = parseInt(prompt("ID do Atleta a remover da equipe: "));
            const atleta = this.buscarAtletaOuFalhar(idA);

            if (!equipe.removerAtleta(idA)) {
                throw new Error(`${atleta.nome} não está nessa equipe.`);
            }
            console.log(`✔ ${atleta.nome} removido da equipe. Ele continua no sistema (total de atletas: ${this.atletas.length}).`);
        } catch (erro) {
            console.log(`✖ Não foi possível desvincular: ${erro.message}`);
        }
    }

    classificacaoGeral() {
        const modalidades = [...new Set(this.equipes.map(e => e.modalidade))];
        return modalidades.map(modalidade => {
            const equipes = this.equipes.filter(e => e.modalidade === modalidade);
            const partidas = this.partidas.filter(p => p.modalidade === modalidade);
            const linhas = calcularClassificacao(equipes, partidas)
                .map(l => ({ ...l, nomeEquipe: this.#rotularEquipe(l.idEquipe) }));
            return { modalidade, linhas };
        });
    }

    #rotularEquipe(idEquipe){
        const equipe = this.equipes.find(e => e.id === idEquipe);
        if (!equipe) return 'Equipe não encontrada';
        const turma = this.turmas.find(t => t.id === equipe.idTurma);
        return `${turma ? turma.nome : '?'} (${equipe.modalidade})`;
    }

    dadosTurmas(){
        return this.turmas.map( t => ({id: t, nome: t.nome}))
    }

    dadosDaTurma(idTurma){
        const turma = this.buscarTurmaOuFalhar(idTurma);
        return {id: turma.id, nome: turma.nome};
    }

   dadosEquipes(){
    return this.equipes.map( e => this.#dadosDaEquipe(e))
   } 

   dadosDaEquipe(idEquipe){
        return this.#dadosDaEquipe(this.buscarEquipeOuFalhar(idEquipe));
   }


   #dadosDaEquipe(e){
        return{
            id: e.id,
            turmas: this.turmas.find(t => t.id === e.idTurma)?.nome?? 'Turma não encontrada', atletas: e.atletas
            .map(idA => this.atletas
            .find(a => a.id === idA))
            .filter(a => a)
            .map(a => a.nome),
        }
   }

   dadosPartidas(){
        return this.partidas.map(p => ({
            id: p.id,
            modalidade: p.modalidade,
            equipeA: this.#rotularEquipe(p.idEquipeA),
            equipeB: this.#rotularEquipe(p.idEquipeB),
            golsA: p.placar.golsA,
            golsB: p.placar.golsB,
        }));
   }
   carregarEstado(silencioso=false) {
        if (!fs.existsSync(ARQUIVO_DADOS)) {
            console.log('Nenhum estado salvo encontrado ainda — começando do zero.');
            return;
        }
        const dados = JSON.parse(fs.readFileSync(ARQUIVO_DADOS, 'utf-8'));

        this.turmas = dados.turmas.map(t => CadastroFactory.criarTurma(t.id, t.nome));
        this.atletas = dados.atletas.map(a => CadastroFactory.criarAtleta(a.id, a.nome, a.idTurma));
        this.arbitros = dados.arbitros.map(a => CadastroFactory.criarArbitro(a.id, a.nome, a.numeroCredencial, a.anosExperiencia));

        this.equipes = dados.equipes.map(e => {
            const equipe = CadastroFactory.criarEquipe(e.id, e.idTurma, e.modalidade);
            // #atletas é privado e não tem setter — reconstruímos chamando o
            // mesmo método público usado no fluxo normal, um ID de cada vez.
            e.atletas.forEach(idAtleta => equipe.adicionarAtleta(idAtleta));
            return equipe;
        });
        this.partidas = dados.partidas.map(p => {
            return CadastroFactory.criarPartida(p.id, p.idEquipeA, p.idEquipeB, p.modalidade, p.golsA, p.golsB);
        });

        this.idTurmaContador = dados.idTurmaContador;
        this.idAtletaContador = dados.idAtletaContador;
        this.idArbitroContador = dados.idArbitroContador;
        this.idEquipeContador = dados.idEquipeContador;
        this.idPartidaContador = dados.idPartidaContador;
        console.log(`✔ Estado carregado: ${this.turmas.length} turma(s), ${this.atletas.length} atleta(s), 
            ${this.equipes.length} equipe(s), ${this.partidas.length} partida(s).`);

            if (!silencioso) {
            console.log(`✔ Estado carregado: ${this.turmas.length} turma(s), ${this.atletas.length} atleta(s), 
            ${this.equipes.length} equipe(s), ${this.partidas.length} partida(s).`);
        }
    }

    
     salvarEstado() {
        const dados = {
            turmas: this.turmas.map(t => ({ id: t.id, nome: t.nome })),
            atletas: this.atletas.map(a => ({ id: a.id, nome: a.nome, idTurma: a.idTurma })),
            arbitros: this.arbitros.map(a => ({ id: a.id, nome: a.nome,
                numeroCredencial: a.numeroCredencial, anosExperiencia: a.anosExperiencia })),
            equipes: this.equipes.map(e => ({ id: e.id, idTurma: e.idTurma, 
                modalidade: e.modalidade, atletas: e.atletas })),
            partidas: this.partidas.map(p => ({
                id: p.id, idEquipeA: p.idEquipeA, idEquipeB: p.idEquipeB, modalidade: p.modalidade,
                golsA: p.placar.golsA, golsB: p.placar.golsB,
            })),

            idTurmaContador: this.idTurmaContador,
            idAtletaContador: this.idAtletaContador,
            idArbitroContador: this.idArbitroContador,
            idEquipeContador: this.idEquipeContador,
            idPartidaContador: this.idPartidaContador,
        };
        fs.writeFileSync(ARQUIVO_DADOS, JSON.stringify(dados, null, 2));
        console.log(`✔ Estado salvo em ${ARQUIVO_DADOS}`);
    }
}



module.exports = ArenaConnect;