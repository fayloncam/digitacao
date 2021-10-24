var palDig = ''
var cxTagDig = document.getElementById('digitacao')
var cxPalLid = document.getElementById('palLer')
var palLid = cxPalLid.innerText

cxTagDig.addEventListener('keydown', function (e) {
        palDig += e.key
        var codTecla = e.code
        console.log(`${codTecla}`)
        if (codTecla == 'Space') {
            compPalavra()
            console.log(`${palDig}`)
            console.log(`${palLid}`)
        }
    })

function compPalavra(){
    palDig == `${palLer.innerText} ` ? cxPalLid.style.color = 'green' : cxPalLid.style.color = 'red'
}