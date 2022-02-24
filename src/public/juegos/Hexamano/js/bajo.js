/** 
    script.js
    Script principal para el funcionamiento del juego.
    @author Dráfty
    @license Mozilla Public License Version 2.0
*/
'use strict'
/**
    Clase controlador que llamará a la vista y el modelo. Es la que permite que el juego funcione.
    @param {Class} vista — Instancia la clase vista.
    @param {Class} modelo — Instancia la clase modelo. 
 */

  
class Juego{
    constructor(){
        this.vista=new Vista();
        this.modelo=new Modelo();
        this.generador=null;
        this.animador=null;
        this.maincontainer=null;
        window.onload=this.iniciar.bind(this);
    }
    iniciar(){
        console.log("Juego iniciado");
        this.maincontainer=document.getElementById("maincontainer");
        this.vista.palabra=this.maincontainer;
        this.generador=window.setInterval(this.generarPalabra.bind(this),1500); /*mas palabras juntas*/
        this.animador=window.setInterval(this.vista.moverPalabra.bind(this.vista), 100); /*la rapides de la spalabras */
        window.onkeypress=this.pulsar.bind(this);
    }
    generarPalabra(){
        let palabraEnviada=this.modelo.crearPalabra();
        this.vista.dibujar(palabraEnviada);
    }
    pulsar(e){
        let letra=e.key;
        let palabras=this.maincontainer.querySelectorAll(".palabra");
        for(let palabra of palabras){
            let span=palabra.children.item(0);
            let nodoTexto=palabra.childNodes[1];
            let texto=nodoTexto.nodeValue;
            let caracterTexto=texto.charAt(0)
            if(letra==caracterTexto){
                span.textContent+=letra;
                nodoTexto.nodeValue=texto.substring(1);
            }else{
                nodoTexto.nodeValue=span.innerHTML+texto;
                span.textContent="";
            }
            if(nodoTexto.nodeValue.length==0){
                palabra.remove();
                this.modelo.sumarPuntuacion();
                this.modelo.mostrarPuntuacion();
            }
        }
    }
}
class Vista{
    constructor(){
        this.palabra=null;
    }
    dibujar(palabraEnviada){
        let palabra=document.createElement("div");
        let span=document.createElement("span");
        maincontainer.appendChild(palabra);
        palabra.classList.add("palabra");
        palabra.style.top="0px";
        palabra.style.left=Math.floor(Math.random()*600)+"px";
        palabra.appendChild(span);
        palabra.appendChild(document.createTextNode(palabraEnviada));
    }
    moverPalabra(){
        let palabras=maincontainer.querySelectorAll(".palabra");
        for(let palabra of palabras){
            let top=parseInt(palabra.style.top);
            top+=2;
            palabra.style.top=top+"px";
            if(top>700){
                palabra.remove();
                this.modelo.quitarVida();
                if(this.modelo.vidas=0)
                    alert("FIN DE LA PARTIDA");
            }
        }
    }
}
class Modelo{
    constructor(){
        this.palabras=["l", "a", "p", "b", 
        "c", "d", "e", "f", "g", "h", "h",
        "i", "j", "k", "l", "m"];
        this.puntuacion=0;
        this.vidas=3;
    }
    crearPalabra(){
        return this.palabras[Math.floor(Math.random()*this.palabras.length)];
    }
    sumarPuntuacion(){
        this.puntuacion++;
    }
    mostrarPuntuacion(){
        console.log(this.puntuacion);
    }
    quitarVida(){
        this.vidas--;
    }
}
let juego=new Juego();