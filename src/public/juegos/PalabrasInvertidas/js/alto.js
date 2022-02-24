var intentos = 3;
var cadena = 'habia un gatito que decia miu miu';


function invertir(){
   

    var cadena = "habia un gatito que decia miu miu";
    var cadenarevertida = "";
       
    //Itero la cadena de manera inversa
    for(var i = cadena.length-1; i>=0; i--)
    {
      //Voy concatenando el valor a la cadena resultado
      cadenarevertida += cadena[i];
    }
    console.log(cadenarevertida);
    document.getElementById('el-resultado').innerHTML = cadenarevertida;
}

function comprobar(){
    if (intentos == 0) {
        alert("Tus intrentos se han agotado")
        return false;
    }

    var palabra_a_comprobar = document.getElementById('palabra_1');
    if (palabra_a_comprobar.value == cadena){
        alert("Felicidades \n Lo lograste en " + ((3 - intentos)+1) + " intento(s).");
        window.location.reload();
    } else {
        
        alert("no le atinaste, vuelve a intentar");
    }
    palabra_a_comprobar.value = '';
    intentos--;
    document.getElementById('intentos').innerHTML = intentos;
}