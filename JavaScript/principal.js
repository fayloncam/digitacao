
    
    const portugues = ['coisa','casa','tempo','dia','ano','vez','homem','senhor','moça', 'bom', 'grande','melhor','pior','certo','último','próprio','ser','ir','estar','ter','haver','fazer','dar','ficar','poder','ver','não','mais','muito','já','quando','mesmo','depois','ainda','um','dois','primeiro','cem','mil','a','o','um','uma','de','em','para','por','com','até','e','mas','ou','também','se','assim','como','porque','que','eu','você','ele','este','esse','isso','sua','teste','digitar','João','Pedro','Marcos','Lucas','Mateus']
    let tamanho = portugues.length
    let randomiza = (tam) => Math.floor (Math.random() * tam)

    var selecionaLeitura = document.querySelector('.leitura') // Cria variavel que recebe o elemento pai
    var numTagInicio = 0
    while (numTagInicio <= 200) {
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


/*Variavel que seta o estilo caso seja digitado alguma letra seja pressionada errada

cxTagDig.addEventListener('keypress', function(f) {
    var codTeclaPress = f.key
    if (codTeclaPress != palLid.charAt(0)){
        console.log('diferente')
    }
    //console.log(`foi digitado ${codTeclaPress}`)
})

*/


addEventListener('keyup', function (e) {
        //palDig += e.key
        var codTecla = e.code
        
        console.log(`${codTecla}`)
        if (codTecla == 'Space') {
            palDig = cxTagDig.value
            compPalavra()
            //console.log(`${cxTagDig.innerText}`)
            //console.log(`${palLid}`)
        } else if (codTecla == 'Backspace') {
            bsCounter ++
            console.log(`${bsCounter}`)
        } 
    })


function compPalavra(){
    
    //console.log(`${palDig}`)
    palDig == `${cxPalLid.innerText} ` ? cxPalLid.style.color = 'green' : cxPalLid.style.color = 'red'
    palDig = ''
    cxTagDig.value = ''
    proTagNum ++
    var proTag = `palLer${proTagNum}`
    cxPalLid = document.getElementById(proTag)
    //console.log(`${proTag}`)
    //console.log(`${proTagNum}`)
}

/*function troca_palavra () {
    var coloca_palavra = document.getElementById('palLer')
    coloca_palavra.innerText = "trocado"
}*/
 
