let contacto = document.getElementById("contacto"); //div de contacto
let cuerpo = document.getElementById("cuerpo");
window.addEventListener("load",inicio)

let btnContacto = document.getElementById("btn-contacto"); //boton/link del header
let btnCuerpo = document.getElementById("btn-cuerpo");
btnContacto.addEventListener("click",mostrarContacto);
btnCuerpo.addEventListener("click",mostrarCuerpo);

let controlContacto = false
let controlNosotros = true

function inicio(){
 contacto.style.display = "none"
}

function mostrarContacto(){
    contacto.style.display = "grid";
    cuerpo.style.display = "none";
    controlContacto = true
    controlNosotros = false
}
 function mostrarCuerpo(){
    contacto.style.display = "none";
    cuerpo.style.display = "block";
    controlContacto = false
    controlNosotros = true
 }