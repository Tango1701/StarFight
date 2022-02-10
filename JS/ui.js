
function recarregar(){
  
    document.getElementById("opcoes").style.display = "none"
    document.getElementById("pausa").style.display = "none"

    LimparCena()
    createScene()

    document.getElementById("life").value = 30
    document.getElementById("bullets").value = 0

    end = false 
    paused = false
    dead = 0
}

function jogar(){
    document.location.href = "jogo.html"
}

function sair(){
    document.location.href = "index.html"
}

function MenuPausa(){
    if(paused)
       document.getElementById("pausa").style.display = "flex"
    else
       document.getElementById("pausa").style.display = "none"
 }