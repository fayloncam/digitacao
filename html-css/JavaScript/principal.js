var palDig = ''
var cxTagDig = document.getElementById('digitacao')
var cxPalLid = document.getElementById('palLer')
var palLid = cxPalLid.innerText
var proTagNum =''
var bsCounter = Number('0')

/*Variavel que seta o estilo caso seja digitado alguma letra seja pressionada errada

cxTagDig.addEventListener('keypress', function(f) {
    var codTeclaPress = f.key
    if (codTeclaPress != palLid.charAt(0)){
        console.log('diferente')
    }
    //console.log(`foi digitado ${codTeclaPress}`)
})

*/


cxTagDig.addEventListener('keyup', function (e) {
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
    
    console.log(`${palDig}`)
    palDig == `${cxPalLid.innerText} ` ? cxPalLid.style.color = 'green' : cxPalLid.style.color = 'red'
    palDig = ''
    cxTagDig.value = ''
    proTagNum ++
    var proTag = `palLer${proTagNum}`
    cxPalLid = document.getElementById(proTag)
    //console.log(`${proTag}`)
    //console.log(`${proTagNum}`)
}