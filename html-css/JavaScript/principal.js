var palDig = ''
var cxTagDig = document.getElementById('digitacao')
var cxPalLid = document.getElementById('palLer')
var palLid = cxPalLid.innerText
var proTagNum =''


cxTagDig.addEventListener('keyup', function (e) {
        //palDig += e.key
        var codTecla = e.code
        //console.log(`${codTecla}`)
        if (codTecla == 'Space') {
            palDig = cxTagDig.value
            compPalavra()
            //console.log(`${cxTagDig.innerText}`)
            //console.log(`${palLid}`)
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