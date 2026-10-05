const AtletaView = require("../views/AtletaView");
const fn = require ('fs');
const path = require ('path');

const ARQUIVO_ATLETA  = path.join(__dirname, 'atleta.json');
fs.writeFileSycn(ARQUIVO_ATLETA);
console.log(fs.readFileSync)


const AtletaController = {
    adicionar(sistema){
        //Listar Turmas - TurmaVieW
        const idTurma = AtletaView.perguntarIdTurma();
        try {
            sistema.buscarTurmaOuFalhar(idTurma);
            const nome = AtletaView.perguntarNome();
            const { atleta, turma } = sistema.adicionarAtleta(idTurma, nome);
            AtletaView.mostrarAtletaVinculado(atleta.nome, turma.nome);
        } catch(erro) {
            AtletaView.mostrarErroCadastro(erro.message);
        }
    },

    listar(sistema) {
        AtletaView.listar(sistema.listarAtletas());
    },
};


class Atletas{
    constructor(){
        this.Atletas = [];
    }

    salvar(){
        const informacoes ={
            atletas: this.atletas.map(a=>({nome: a.nome,
                                            IdTurma: a.idTurma
            }))
        };
        carregar(){
            if(!fs.existsSync(ARQUIVO_ATLETA)) return;
            const dados = JSON.parse(fs.readFileSync(ARQUIVO_ATLETA, 'utf-8'));
            this.atletas = dados.atletas.map(a=> new Atleta (a.nome,
                                                                a.id));
        }
    }
}

const atleta = new Atletas();
Atletas.carregar();
AtletaView.listarAtletas;


module.exports = AtletaController;

//professor, para esse caso, fiquei em dúvida, mas pensei que, como o objeto com o atleta já existia, eu poderia usar as informações do objeto já criado acima pra criar esse novo modelo.
// algumas dúvidas: em qual camada devo aplicar o FS? no model (pois ele vai controlar as demais funções) ou no controller (pois ele é responsável pelos controles, e dos mesmos é que deve surgir os arquivos e config - apliquei aqui por que acredito ser nessa correto aplicar aqui)?
// eu devo aplicar a estrutura do fs também no sever mesmo ele abrigando só as antigas bibliotecas?