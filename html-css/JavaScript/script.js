/* Pega o conteúdo da div que contém a classe .lista e coloca em um array. 
As palavras estão separadas por |, então usa o split para separar as palavras no | */
let arrayDePalavras = document.querySelector(".lista").innerHTML.split("|");

//Defino e inicializo um array para armazenar as linhas das palavras
const arrayDeLinhas = [];

/*Defino quantas linhas precisam ser criadas pegando o total de palavras e dividindo por 10, ou seja,
10 palavras por linha */
const totalLinhas = Math.ceil(arrayDePalavras.length / 10);

/*Seleciono a caixa com as palavras, estão estáticas em uma div com a classe .palavras, mas depois
pegaremos estas palavras de alguma API externa */
let boxPalavras = document.querySelector(".palavras");

//Seleciono o input onde o usuário irá digitar as palavras e armazeno na constante input
const input = document.querySelector("[name='palavra']");

//Seleciono a div que contém o timer e armazeno na constante cronometro
const cronometro = document.querySelector(".timer");

//Seleciomo o botão para reiniciar e armazeno na constante btnReload
const btnReload = document.querySelector(".btn-reload");

//Inicializo a váriavel timerId que será usada no cronômetro
let timerId = 0;

//Inicializo a variável que vai armazenar a contagem das teclas pressionadas
let teclasPressionadas = 0;

//Inicializo a variável que vai armazenar a contagem das palavras digitadas corretamente
let palavrasCorretas = 0;

//Inicializo a variável que vai armazenar a contagem das palavras digitadas erradas
let palavrasErradas = 0;

//Inicializo com 60 (segundos) a variável que contém o tempo para o usuário digitar, que será usada no timer
let tempoDigitacao = 60; 

//Crio uma flag para identificar se o teste foi iniciado ou não
let flagIniciado = false;

//Crio um índice para saber qual a palavra da vez
let indexPalavra = 0;

//Crio um índice para saber qual a linha da vez
let indexLinha = 0;

/*
	Função criaLinhas
	Crio um laço de repetição for para ir de 0 até o total de linhas
*/
function criaLinhas(){
	for (let i = 0; i < totalLinhas; i++) {
		/** Para cada vez que entra no laço, eu adiciono no array de linhas na posição i
		 * 10 palavras do array de palavras usando o splice
		 */
		arrayDeLinhas[i] = arrayDePalavras.splice(i, 10);

		/** Para cada vez que entra no laço, eu crio uma div e armazeno na variável linha*/
		let linha = document.createElement("div");

		// Adiciona a classe css "linha" na div criada
		linha.classList.add("linha");

		//Seto o atributo id da div linha com o valor de i
		linha.setAttribute("id", i);

		/** Para cada linha criada, eu percorro seus elementos (as 10 palavras) usando o forEach
		 * A função retorna a palavra armazenada em cada posição do array (p) e o índice da palavra(index) 
		 */
		arrayDeLinhas[i].forEach(function (p, index) {
			// Para cada palavra, crio um span e armazeno na variável palavra
			let palavra = document.createElement("span");

			// Adiciono no span o texto da palavra (p) atual
			palavra.textContent = p;

			//Adiciono a classe css "palavra" ao span
			palavra.setAttribute("class", "palavra");

			/* Seto o atributo idPalavra de cada span com o valor "linha(i)(index)"
				sendo o primeiro número o índice da linha e o segundo número o índice da palavra.
				Ex: <span idPalavra='linha00'>Palavra 1 </span> Será a primeira palavra da primeira linha
					<span idPalavra='linha01'>Palavra 2 </span> Será a segunda palavra da segunda linha (arrays começam em 0)
					<span idPalavra='linha150'>Palavra 1 </span> Será a primeira palavra da linha 15
			*/
			palavra.setAttribute("idPalavra", `linha${i}${index}`);

			// Adiciono o span com a palavra na linha atual
			linha.append(palavra);
		});

		/** Efetuo um teste para verificar se a linha atual possui índice maior que 1
		 *  Caso verdadeiro seto o atributo css display com o valor none, para ocultar as linhas
		 *  e exibir inicialmente somente 2 linhas de palavras para o usuário
		 */
		if (i > 1) {
			linha.style.display = "none";
		}

		// Adiciono na div de palavras cada linha com suas 10 palavras
		boxPalavras.append(linha);
	}
}

/** Função reiniciar é acionada quando usuário clica no botão de reiniciar na página 
 *  Ainda precisa ser aprimorada para recarregar as palavras ou gerar novas
*/
function reiniciar() {

	/* Aqui eu adiciono no botao uma função para o evento click*/
	btnReload.addEventListener("click", function (e) {
		// Zero a quantidade de teclas pressionadas
		teclasPressionadas = 0;

		// Zero as palavras corretas
		palavrasCorretas = 0;

		// Zero as palavras erradas
		palavrasErradas = 0;

		// seto 60 segundos novamente no timer
		tempoDigitacao = 60;

		// Limpo o timer do sistema
		window.clearTimeout(timerId);

		// Retiro o atributo "disabled" do input para que o usuário possa digitar
		input.removeAttribute("disabled");

		// Seto o foco do cursor para o input
		input.focus();

		// Defino que o teste foi iniciado
		flagIniciado = true;

		/** Adiciono na variável timer um objeto do tipo Timer com a função abaixo
		 *  A cada 1000 milisegundos (1 segundo) é rodado essa função
		 *  Ela serve para decrescer o timer de 60 para 59, 58, e assim por diante
		 *  É passado para o construtor da classe (objeto) uma função de callback e
		 *  o tempo em milisegundos que o ciclo deve se repetir
		 */
		var timer = new Timer(function () {
			/** Divido o tempo de digitação que está em milisegundos por mil para termos 60 segundos
			 	Este tempo é setado em milisegundos dentro da classe Timer que será explicada mais a frente
			 */
			let tempo = tempoDigitacao / 1000;
			/** Aqui faço uma condicional ternária 
			 * 	É um IF/Else encurtado
			 * 	Na div com o cronometro que está armazenada na variavel cronometro eu seto o texto dela como
			 * 	00:(tempo é menor que 10? então concateno "0" + o tempo se não concateno somente o tempo )
			 *  Essa condicional abaixo serve para que no cronômetro apareço no formato 00:00, quando
			 *  os segundos estão menores que 10, sem a condicional seria exibido assim: 00:5,
			 *  com a condicional é exibido assim: 00:05 
			*/

			cronometro.textContent = "00:"+(tempo < 10 ? "0"+ tempo : tempo);
		  }, 1000);
		// Chamo a função resume do objeto timer para iniciar o cronômetro
		timer.resume();
	})
}

/** Classe Timer
 *  Recebe uma função de callback e o tempo para repetir a ação
 */
class Timer {
	constructor(callback, delay) {
		// Multiplico o tempo do teste (60 segundos) por mil,
		// pois a função setTimeout precisa que seja passado em milissegundos
		tempoDigitacao = tempoDigitacao * 1000;

		// Adiciono na variável resume a função abaixo
		var resume = function () {

			/** A função setTimeout retorna um id do seu timer
			 *  Este id serve para identificar os timers, e se necessário realizar a sua manipulação
			 *  Geralmente quando utilizado com funções de pause e continue, usa-se o id para guardar
			 *  As informações do timer  
			 */
			timerId = window.setTimeout(function () {
				// Para cada ciclo do setTimeout (1 segundo), 
				// eu reduzo 1 segundo (1000 milissegundos) do nosso tempo do teste
				tempoDigitacao = tempoDigitacao - 1000;
				// Chamo a própria função para repetir o ciclo
				resume();

				// Chamo a função de callback, aquela explicada acima
				callback();

				// Aqui verifico se o tempo chegou em 0, caso sim, chamo a função parar e 
				// zero o tempo da função setTimeout usando o clearTimeout passando o id do
				// setTimeout que havíamos guardados anteriormente
				if (tempoDigitacao == 0) {
					window.clearTimeout(timerId);
					parar();
				}
			}, delay);
		};

		// Aqui defino que a variável resume do objeto (classe) Timer recebe 
		// a função que havíamos armazenado na variável resume 
		this.resume = resume;
	}
}
  
/** Função parar */
function parar(){
	// Defino como disabled nosso input, para bloquear a digitação do usuárioo
	input.setAttribute("disabled", "true");
	// Seto o valor vazio para o input
	input.value = "";
	//Altero a flag iniciado para false
	flagIniciado = false;

	// Imprimo o resultado
	console.log("Palavras Corretas: " + palavrasCorretas)
	console.log("Palavras Erradas: " + palavrasErradas)
	console.log("Teclas Pressionadas: " + teclasPressionadas)
}
// Chamo a função reiniciar para deixar tudo preparado
reiniciar();

// Chamo a função contaTeclaPressionada para adicionar o eventListener no input
contaTeclaPressionada();

//Chamo a função criarLinhas para criar as linhas com as palavras
criaLinhas();

//** Função contaTeclaPressionada */
function contaTeclaPressionada(){
	//Adiciono ao input o eventLinstener para identificar quando uma tecla é pressionada
	input.addEventListener("keydown", function(e){

		/** Se flagIniciado for true 
		 *  e o código da tecla pressionada for diferente do código da tecla espaço
		 *  incrementa 1 na variável que armazena a contagem das teclas pressionadas
		*/ 
		if(flagIniciado){
			if(e.keyCode != 32){
				teclasPressionadas++;
				console.log(teclasPressionadas)
			}
		}
	});
}

// Condicional para adicionar a classe css destaque na primeira palavra da primeira linha
if(indexPalavra == 0){
	/** Seleciono o span que contém o atributo linha00 e adiciono a classe css destaque */
	document.querySelector(`[idpalavra='linha${indexLinha}${indexPalavra}']`).classList.add("destaque");
}

// Adiciono ao input e eventListener para identificar quando usuário "solta" a tecla
input.addEventListener("keyup", function(event){
	/** Condicional para identificar que a tecla "espaço" foi pressionada
	/*  Esta tecla que define que o usuário terminou de digitar a palavra
	/* e devemos passar para a próxima palavra */
	if(event.keyCode == 32){
		/** Seleciono a palavra atual pelo atributo idPalavra, passando o índice da linha
		 *  e o índice da palavra na linha.
		 */
		var palavra = document.querySelector(`[idpalavra='linha${indexLinha}${indexPalavra}']`);

		// Seleciono o valor digitado pelo usuário e removo os espaços em branco
		var digitado = input.value.trim().replace(/\s+/g, '');

		// Incremento +1 no índice de palavras
		indexPalavra++;

		/** Condicional para verificar se a palavra digitada é igual a palavra da vez */
		if(palavra.innerHTML == digitado){
			// Se condição verdadeira, acrescenta 1 na variável de contagem de palavras corretas
			palavrasCorretas++;

			// Adiciona a classe css "correta" ao span da palavra da vez caso esteja correta
			palavra.classList.add("correta");			
		}else{
			// Se condição falsa, acrescenta 1 na variável de contagem de palavras erradas
			palavrasErradas++;

			// Adiciona a classe css "errada" ao span da palavra da vez caso esteja errada
			palavra.classList.add("errada");
		}
		/** Condicional para identificar quando acaba as palavras da linha
		 *  Para evitar um erro ao tentar selecionar um elemento que não existe 
		 */
		if(indexPalavra > 9){
			// Seleciono a linha atual e armazeno na variável linha
			linha = document.querySelector(`[id='${indexLinha}']`);

			// Oculto a linha atual setando css style como none
			linha.style.display = "none";

			// Acrescento 1 na contagem de linhas
			indexLinha++;

			// Seleciono a nova linha e armazeno na variável novaLinha
			novaLinha = document.querySelector(`[id='${(indexLinha+1)}']`);

			// Seto o atributo css display para block para exibir a linha
			novaLinha.style.display = "block";

			// Zero o índice de palavras para que a primeira palavra da próxima linha seja selecionada
			indexPalavra = 0;
		}

		// Seto para vazio o valor do input
		input.value = "";

		// Removo a classe css destaque da palavra digitada
		palavra.classList.remove("destaque");

		// Seleciono a próxima palavra da linha
		proximaPalavra = document.querySelector(`[idpalavra='linha${indexLinha}${(indexPalavra)}']`)

		// Adiciono a classe css ao span da proxima palavra
		proximaPalavra.classList.add("destaque");
	}
})

//Adicionado o comentário
