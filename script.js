// 1. Classe Base
class ComponenteMonitor {
    constructor(elementId) {
        this.cardElement = document.getElementById(elementId);
        this.valorElement = this.cardElement.querySelector('.valor');
    }
}

// 2. Herança
class CardHardware extends ComponenteMonitor {
    constructor(elementId) {
        super(elementId);
    }

    // 3 e 4. Polimorfismo e Lógica de Negócio
    atualizarInterface(valor, tipo) {
        let textoFinal = valor;
        let critico = false;

        // Formatação e verificação da regra de negócio
        if (tipo === 'cpu') {
            textoFinal = `${valor}%`;
            if (valor > 90) critico = true;
        } else if (tipo === 'ram') {
            textoFinal = `${valor} GB`;
        } else if (tipo === 'temp') {
            textoFinal = `${valor} °C`;
            if (valor > 75) critico = true;
        }

        // Atualiza o HTML
        this.valorElement.innerText = textoFinal;

        // Aplica ou remove a classe de alerta dinamicamente
        if (critico) {
            this.cardElement.classList.add('alerta-critico');
        } else {
            this.cardElement.classList.remove('alerta-critico');
        }
    }
}

// Instanciar os objetos
const cardCpu = new CardHardware('card-cpu');
const cardRam = new CardHardware('card-ram');
const cardTemp = new CardHardware('card-temp');

// 5. Comunicação (Fetch API)
async function buscarDados() {
    try {
        const resposta = await fetch('/api/status');
        const dados = await resposta.json();

        // Atualiza cada card com os dados recebidos do backend
        cardCpu.atualizarInterface(dados.cpu, 'cpu');
        cardRam.atualizarInterface(dados.ram, 'ram');
        cardTemp.atualizarInterface(dados.temperatura, 'temp');
    } catch (erro) {
        console.error("Erro ao buscar dados do servidor:", erro);
    }
}

// Inicia o loop a cada 2 segundos (2000 ms)
setInterval(buscarDados, 2000);
buscarDados(); // Executa imediatamente a primeira vez