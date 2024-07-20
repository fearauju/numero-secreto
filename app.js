let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let limiteCaracter = Math.ceil(Math.log10(numeroLimite)) + 1;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

// Adicione o ouvinte de evento após o campo de entrada ser criado
const inputNumeroSecreto = document.getElementById('input');
inputNumeroSecreto.addEventListener('input', function() {
  // Corrigindo a expressão regular para permitir todos os números de 0 a 9
  this.value = this.value.replace(/[^0-9]/g, '');

  // Limitando a quantidade de caracteres para tamanho do número limite
  this.value = this.value.substring(0, limiteCaracter);
  
    // Remover zeros à esquerda
    this.value = this.value.replace(/^0+/, '');
  
    // Limitar a entrada para não ultrapassar o número limite
    if (Number(this.value) > numeroLimite) {
      this.value = numeroLimite;
    }
});

function verificarChute() {

    let chute = document.querySelector('input').value;
    
     if (isNaN(chute) || chute === "") {
        alert('Caractere inválido. Digite apenas números entre 1 e 100.');
        limparCampo();
        exibirMensagemInicial();
        return;
    } else{
        chute = parseInt(chute);
            if (chute == numeroSecreto) {
                exibirTextoNaTela('h1', 'Acertou!');
                let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
                let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
                exibirTextoNaTela('p', mensagemTentativas);
                document.getElementById('reiniciar').removeAttribute('disabled');
            } else {
                if (chute > numeroSecreto) {
                    exibirTextoNaTela('p', 'O número secreto é menor');
                } else {
                    exibirTextoNaTela('p', 'O número secreto é maior');
                }
                tentativas++;
                limparCampo();
            }
        }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
