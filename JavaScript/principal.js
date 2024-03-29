import {portuguese} from "./language.js"
import {english} from "./language.js"


let tamanho = portuguese.length
let randomiza = (tam) => Math.floor(Math.random() * tam)

const selecionaLeitura = document.querySelector('.leitura') // Cria variavel que recebe o elemento pai
let tagNumInit = 0
let readWordBox
let inputedWord = ''
let nextTagNum =''
let qtdCaracteresDigitados = Number('0')

let cxTagDig = document.getElementById('digitacao')
let txtDig
let carDig
let carLid
let indice = 0

const tagTempo = document.querySelector('.timer')
let timer
let maxTime = 30
let remainingTime = maxTime
let isTyping = false

const tagResultados = document.querySelector('.resultado')
const tagPPM = document.querySelector('.corretas')
const tagCPM = document.querySelector('.incorretas')
const tagAcuracidade = document.querySelector('.acuracidade')
let numPalavrasCorretas
let numPalavrasIncorretas
let acuracidade

const tagInteraction = document.querySelector('.interacao')

const tagReload = document.querySelector('.reloadReaderBtn')

let tagLanguage = document.querySelector('.language')

// let language = tagLanguage.

document.onload = colocaPalavra()

document.addEventListener("keydown", () => cxTagDig.focus())

cxTagDig.addEventListener('keyup', verificaTecla)

tagReload.addEventListener('click', reloadReader)

function verificaTecla (event) {

    let pressed = {
        name: event.code,
        sign: event.key
    }
    
    //------------------ Verifica o envento "espaço pressionado", compara as palavras (digitada e lida) e define a classe (correta, incorreta)
    if (pressed.name == 'Space') {
        if(readWordBox != null) {
            inputedWord = cxTagDig.value
            inputedWord == `${readWordBox.innerText} ` ? readWordBox.classList.add('correto') : readWordBox.classList.add('incorreto')
            readWordBox.classList.remove('ativo')
            //----------------- Define novos valores e atributos para variaveis e objetos
            nextTagNum ++
            let proTag = `palLer${nextTagNum}`
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
    } else if (pressed.name == 'Backspace') {
        qtdCaracteresDigitados--
        indice--
        readWordBox.classList.remove('incorreto')
        readWordBox.classList.add('ativo')
        } else if (pressed.sign != 'Dead' && pressed.sign != 'Shift') { 
            txtDig = document.querySelector('.digitacao')
            carDig = txtDig.value.split('')[indice]
            carLid = readWordBox.innerText.split('')[indice]
            if (carDig != carLid) {
                readWordBox.classList.add('incorreto')
            }
            indice++
            qtdCaracteresDigitados ++
            }
    
    isTyping == false ? timer = setInterval(iniTimer, 999) : null
    isTyping = true
}

function colocaPalavra(){
    while (tagNumInit <= 200) {
        let colocaSpan = document.createElement('span')// Cria variavel que recebe o tipo de tag a ser criada, na verdade cria o elemento
        colocaSpan.innerText = `${portuguese[randomiza(tamanho)]}` // Configura o texto (aqui a palavra) da tag que será criada
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
    tagTempo.innerText = remainingTime
    //------------
}

function reloadReader() {
    
    tagResultados.style.display = 'none'
    tagInteraction.style.display = 'flex'

    //--------- Limpa a caixa de leitura
    tagNumInit = Number('0')
    while (selecionaLeitura.firstChild){
        selecionaLeitura.removeChild(selecionaLeitura.firstChild)
    }
    //------ Define e/ ou redefine valores nas variáveis
    cxTagDig.value = ''
    indice = 0
    isTyping = false
    remainingTime = maxTime
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
        mostraResultados()
        clearInterval(timer)
        
    }
}

function computaValores() {
    let multiple = 60/maxTime
    numPalavrasCorretas = document.getElementsByClassName('correto').length * multiple
    numPalavrasIncorretas = document.getElementsByClassName('incorreto').length * multiple
    acuracidade = (numPalavrasCorretas*100)/(numPalavrasCorretas+numPalavrasIncorretas)
    
}

function mostraResultados() {
    
    tagInteraction.style.display = 'none'
    window.screen.width > 700 ? tagResultados.style.display = 'flex': tagResultados.style.display = 'block'
    tagPPM.innerText = numPalavrasCorretas+numPalavrasIncorretas
    tagCPM.innerText = qtdCaracteresDigitados
    tagAcuracidade.innerText = `${acuracidade.toFixed(2)} %`
    
}


let secondsSetValue = document.querySelectorAll(".sec-button")

function getTimeValue (element) {
    maxTime = element.getAttribute("value")
    if (isTyping == false) {
        remainingTime = maxTime
        tagTempo.innerText = maxTime
    }

}


secondsSetValue.forEach(element => {
    
    element.addEventListener('click', () => {
        getTimeValue(element)
        secondsSetValue.forEach(element => {element.classList.remove('setTime')})
        element.classList.add('setTime')
        })
    }
)