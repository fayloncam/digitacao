
    
const portugues = ['coisa','casa','tempo','dia','ano','vez','homem','senhor','moça', 'bom', 'grande','melhor','pior','certo','último','próprio','ser','ir','estar','ter','haver','fazer','dar','ficar','poder','ver','não','mais','muito','já','quando','mesmo','depois','ainda','um','dois','primeiro','cem','mil','a','o','um','uma','de','em','para','por','com','até','e','mas','ou','também','se','assim','como','porque','que','eu','você','ele','este','esse','isso','sua','teste','digitar','João','Pedro','Marcos','Lucas','Mateus']
let tamanho = portugues.length
let randomiza = (tam) => Math.floor (Math.random() * tam)
var selecionaLeitura = document.querySelector('.leitura') // Cria variavel que recebe o elemento pai
var numTagInicio = 0
while (numTagInicio <= 10) {
    let colocaSpan = document.createElement('span')// Cria variavel que recebe o tipo de tag a ser criada, na verdade cria o elemento
    colocaSpan.innerText = `${portugues[randomiza(tamanho)]}` // Configura o texto (aqui a palavra) da tag que será criada
    colocaSpan.id = `palLer${numTagInicio}` // Configura o id da tag que será criada
    selecionaLeitura.insertAdjacentElement('beforeend',colocaSpan) // Cria de fato a tag levando em conta o pai (definido na variável) e adiciona-a
    selecionaLeitura.insertAdjacentText('beforeend',' ')
    numTagInicio++    
}
var cxPalLid = document.getElementById('palLer0')  
var palDig = ''
var proTagNum =''
var bsCounter = Number('0')
var cxTagDig = document.getElementById('digitacao')

cxTagDig.focus()

cxTagDig.addEventListener('keyup',

    function (e) {
        
        if (e.code == 'Space') {
            if(cxPalLid != null){
            palDig = cxTagDig.value
            palDig == `${cxPalLid.innerText} ` ? cxPalLid.style.color = 'green' : cxPalLid.style.color = 'red'
            proTagNum ++
            proTag = `palLer${proTagNum}`
            cxPalLid = document.getElementById(proTag)
            palDig = ''
            cxTagDig.value = '' 
            } else {
                window.alert('Acabaram as palavras')
                cxTagDig.value = ''    
            }
        } else if (e.code == 'Backspace') {
            bsCounter ++
        } 
    }
)
 
