const portugues = ['coisa','casa','tempo','dia','ano','vez','homem','senhor','moça', 'bom', 'grande','melhor','pior','certo','último','próprio','ser','ir','estar','ter','haver','fazer','dar','ficar','poder','ver','não','mais','muito','já','quando','mesmo','depois','ainda','um','dois','primeiro','cem','mil','a','o','um','uma','de','em','para','por','com','até','e','mas','ou','também','se','assim','como','porque','que','eu','você','ele','este','esse','isso','sua','teste','digitar','João','Pedro','Marcos','Lucas','Mateus']
let tamanho = portugues.length
let randomiza = (tam) => Math.floor(Math.random() * tam)
const selecionaLeitura = document.querySelector('.leitura') // Cria variavel que recebe o elemento pai
let tagNumInit = 0
let readWordBox
let inputedWord = ''
let nextTagNum =''
let bsCounter = Number('0')
let qtdCaracteresDigitados = Number('0')

let cxTagDig = document.getElementById('digitacao')
let txtDig
let txtLid
let carDig
let carLid
let indice = 0

const tagTempo = document.querySelector('.timer')
let timer
let maxTime = 60
let remainingTime = maxTime
let isTyping = false

const tagResultados = document.querySelector('.resultado')
const tagPPM = document.querySelector('.corretas')
const tagCPM = document.querySelector('.incorretas')
const tagAcuracidade = document.querySelector('.acuracidade')
let numPalavrasCorretas
let numPalavrasIncorretas
let acuracidade

document.onload = colocaPalavra()

document.addEventListener("keydown", () => cxTagDig.focus())

cxTagDig.addEventListener('keyup', verificaTecla)

function verificaTecla (evento) {
    //------------------ Verifica o envento "espaço pressionado", compara as palavras (digitada e lida) e define a classe (correta, incorreta)
    if (evento.code === 'Space') {
        if(readWordBox != null) {
            inputedWord = cxTagDig.value
            inputedWord == `${readWordBox.innerText} ` ? readWordBox.classList.add('correto') : readWordBox.classList.add('incorreto')
            readWordBox.classList.remove('ativo')
            //----------------- Define novos valores e atributos para variaveis e objetos
            nextTagNum ++
            proTag = `palLer${nextTagNum}`
            readWordBox = document.getElementById(proTag)
            readWordBox.scrollIntoView({behavior: "smooth", block:"center"})
            cxTagDig.value = '' 
            indice = 0
            //--------------------- Atribui classe 'ativo' para a próxima palavra caso exista
            if (readWordBox != null) {
            readWordBox.classList.add('ativo')}
            //------------------
        } else {
            window.alert('Acabaram as palavras')
            cxTagDig.value = ''    
            }
    } else
    
    if (evento.code === 'Backspace') {
        qtdCaracteresDigitados --
        indice--
        readWordBox.classList.remove('incorreto')
        readWordBox.classList.add('ativo')
    } else if (evento.key != 'Dead' && evento.key != 'Shift') { 
            txtDig = document.querySelector('.digitacao')
            carDig = txtDig.value.split('')[indice]
            carLid = readWordBox.innerText.split('')[indice]
            if (carDig != carLid) {
                readWordBox.classList.add('incorreto')
            }
            indice++
            qtdCaracteresDigitados ++
        }
    
    isTyping == false ? timer = setInterval(iniTimer, 1000) : null
    isTyping = true
}

function colocaPalavra(){
    while (tagNumInit <= 200) {
        let colocaSpan = document.createElement('span')// Cria variavel que recebe o tipo de tag a ser criada, na verdade cria o elemento
        colocaSpan.innerText = `${portugues[randomiza(tamanho)]}` // Configura o texto (aqui a palavra) da tag que será criada
        colocaSpan.id = `palLer${tagNumInit}` // Configura o id da tag que será criada
        selecionaLeitura.insertAdjacentElement('beforeend',colocaSpan) // Cria de fato a tag levando em conta o pai (definido na variável) e adiciona-a
        selecionaLeitura.insertAdjacentText('beforeend',' ')
        tagNumInit++
    }
    
    //----------
    readWordBox = document.getElementById('palLer0')
    readWordBox.classList.add('ativo')
    readWordBox.scrollIntoView(false)
    nextTagNum = ''
    //------------
}

function atualizaLeitor() {
    
    tagResultados.style.display = 'none'

    //--------- Limpa a caixa de leitura
    tagNumInit = Number('0')
    while (selecionaLeitura.firstChild){
        selecionaLeitura.removeChild(selecionaLeitura.firstChild)
    }
    //------ Define e/ ou redefine valores nas variáveis
    cxTagDig.value = ''
    indice = 0
    isTyping = false
    remainingTime = 60
    //--------------- Limpa o intervalo de tempo e chama o método para colocar as palavras novamente
    clearInterval(timer)
    tagTempo.innerText = remainingTime
    colocaPalavra()
}

function iniTimer(){
    if (remainingTime > 0){
        remainingTime--
        tagTempo.innerText = remainingTime
    } else {
        computaValores()
        clearInterval(timer)
    }
}

function computaValores() {
    let multiple = 60/maxTime
    numPalavrasCorretas = document.getElementsByClassName('correto').length * multiple
    numPalavrasIncorretas = document.getElementsByClassName('incorreto').length * multiple
    acuracidade = (numPalavrasCorretas*100)/(numPalavrasCorretas+numPalavrasIncorretas)
    mostraResultados()
}

function mostraResultados() {
    
    tagResultados.style.display = 'flex'
    tagPPM.innerText = numPalavrasCorretas+numPalavrasIncorretas
    tagCPM.innerText = qtdCaracteresDigitados
    tagAcuracidade.innerText = `${acuracidade.toFixed(2)} %`
    
}
 
function getTimeValue (seconds) {
maxTime = seconds
}