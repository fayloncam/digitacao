const portugues = ['coisa','casa','tempo','dia','ano','vez','homem','senhor','moça', 'bom', 'grande','melhor','pior','certo','último','próprio','ser','ir','estar','ter','haver','fazer','dar','ficar','poder','ver','não','mais','muito','já','quando','mesmo','depois','ainda','um','dois','primeiro','cem','mil','a','o','um','uma','de','em','para','por','com','até','e','mas','ou','também','se','assim','como','porque','que','eu','você','ele','este','esse','isso','sua','teste','digitar','João','Pedro','Marcos','Lucas','Mateus']
let tamanho = portugues.length
let randomiza = (tam) => Math.round (Math.random() * tam)
const selecionaLeitura = document.querySelector('.leitura') // Cria variavel que recebe o elemento pai
let numTagInicio = 0
let cxPalLid
let palDig = ''
let proTagNum =''
let bsCounter = Number('0')
let cxTagDig = document.getElementById('digitacao')
let txtDig
let txtLid
let carDig
let carLid
let indice = 0
const tagTempo = document.querySelector('.timer')
let timer
let temMax = 11
let temRes = temMax
let estDig = false

const tagPalavrasCorretas = document.querySelector('.corretas')
const tagPalavrasIncorretas = document.querySelector('.incorretas')
const tagAcuracidade = document.querySelector('.acuracidade')
let numPalavrasCorretas = Number()
let numPalavrasIncorretas = Number()
let acuracidade = Number.parseFloat()

document.addEventListener("keydown", () => cxTagDig.focus())

cxTagDig.addEventListener('keyup',
   
    //--------------- chama funçaõ anônima (um dia será identificada)
    function (evento) {
        //------------------ Verifica o envento "espaço pressionado", compara as palavras (digitada e lida) e define a classe (correta, incorreta)
        if (evento.code === 'Space') {
            if(cxPalLid != null) {
                palDig = cxTagDig.value
                palDig == `${cxPalLid.innerText} ` ? cxPalLid.classList.add('correto') : cxPalLid.classList.add('incorreto')
                cxPalLid.classList.remove('ativo')
                //----------------- Define novos valores e atributos para variaveis e objetos
                proTagNum ++
                proTag = `palLer${proTagNum}`
                cxPalLid = document.getElementById(proTag)
                cxPalLid.scrollIntoView({behavior: "smooth", block:"center"})
                //palDig = ''// Atribuição de valor inutil (até o momento)
                cxTagDig.value = '' 
                indice = 0
                //--------------------- Atribui classe 'ativo' para a próxima palavra caso exista
                if (cxPalLid != null) {
                cxPalLid.classList.add('ativo')}
                //------------------
            } else {
                window.alert('Acabaram as palavras')
                cxTagDig.value = ''    
              }
        } else
        
        if (evento.code === 'Backspace') {
            bsCounter ++
            indice--
            cxPalLid.classList.remove('incorreto')
            cxPalLid.classList.add('ativo')
        } else if (evento.key != 'Dead' && evento.key != 'Shift') { 
                txtDig = document.querySelector('.digitacao')
                carDig = txtDig.value.split('')[indice]
                carLid = cxPalLid.innerText.split('')[indice]
                if (carDig != carLid) {
                    cxPalLid.classList.add('incorreto')
                }
                indice++ 
            }
        
        estDig == false ? timer = setInterval(iniTimer, 1000) : null
        estDig = true
    }
)

function colocaPalavra(){
    while (numTagInicio <= 200) {
        let colocaSpan = document.createElement('span')// Cria variavel que recebe o tipo de tag a ser criada, na verdade cria o elemento
        colocaSpan.innerText = `${portugues[randomiza(tamanho)]}` // Configura o texto (aqui a palavra) da tag que será criada
        colocaSpan.id = `palLer${numTagInicio}` // Configura o id da tag que será criada
        selecionaLeitura.insertAdjacentElement('beforeend',colocaSpan) // Cria de fato a tag levando em conta o pai (definido na variável) e adiciona-a
        selecionaLeitura.insertAdjacentText('beforeend',' ')
        numTagInicio++
    }
    
    //----------
    cxPalLid = document.getElementById('palLer0')
    cxPalLid.classList.add('ativo')
    cxPalLid.scrollIntoView(false)
    proTagNum = ''
    //------------
}

function atualizar() {
    
    //--------- Limpa a caixa de leitura
    numTagInicio = Number('0')
    while (selecionaLeitura.firstChild){
        selecionaLeitura.removeChild(selecionaLeitura.firstChild)
    }
    //------ Define e/ ou redefine valores nas variáveis
    cxTagDig.value = ''
    indice = 0
    estDig = false
    temRes = 60
    //--------------- Limpa o intervalo e chama o método para colocar as palavras novamente
    clearInterval(timer)
    tagTempo.innerText = temRes
    colocaPalavra()
}

function iniTimer(){
    if (temRes > 0){
        temRes--
        tagTempo.innerText = temRes
    } else {
        mostraResultados()
        clearInterval(timer)
    }
}

function mostraResultados() {
    numPalavrasCorretas = document.getElementsByClassName('correto').length
    numPalavrasIncorretas = document.getElementsByClassName('incorreto').length
    acuracidade = Number.parseFloat(Math.round((numPalavrasCorretas*100)/(numPalavrasCorretas+numPalavrasIncorretas), -2))
    tagPalavrasCorretas.innerText = numPalavrasCorretas
    tagPalavrasIncorretas.innerText = numPalavrasIncorretas
    tagAcuracidade.innerText = `${acuracidade} %`
    

}
 
