$(function(){
    // carga de apis
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Librerias cargadas
    //
    function onDeviceReady(){
        //nada
    }

    // crear nueva mascota con los parametros:
    // nombre,salud(0-100,hambre,diversion,sucio,caca,ncaca,muerto
    //
    var mas =  new Mascota("Gamusino", 100, 0, 10, 0, 0, 0, 0);

    // mostrar los datos
    //
    $("#nombrePet").html(mas.nombre);
    $("#infoHambre").html(mas.hambre);
    $("#infoDiver").html(mas.diversion);
    $("#comerB").click(function(){mas.comer();});
    $("#jugarB").click(function(){mas.jugar();});
    $("#lavarB").click(function(){mas.limpiar();});
    /****************************************************/
    var nSubeHambreId = window.setInterval(subeHambre, 1000);
    //var nBajaDiverId = window.setInterval(bajaDiver, 300);
    var nRecargaId = window.setInterval(recarga, 100);

    function recarga(){
        var salud = mas.salud;
        var hambre = mas.hambre;
        var diversion = mas.diversion;
        var sucio = mas.sucio;
        var ncaca = mas.ncaca;

        // CONOCER si la salud es de 100-0
        if(salud > 0){
            //sigue vivo, diferenciar entre sucio y limpio

            //1º limpio
            //
            if(sucio != 5){
                //caso del hambre
                if(hambre < 5)
                    //ponemos imagen estable
                    $("#queco").attr('src','img/cordova_pet_stable.png');
                else if(hambre >= 5 && hambre < 8)
                    $("#queco").attr('src','img/cordova_pet_hungry.png');
                else
                    $("#queco").attr('src','img/cordova_pet_vhungry.png');
            }//end sucio!=5
            
            //2º sucio
            //
            if(sucio == 5){
                //caso del hambre
                if(hambre < 5)
                    //ponemos imagen estable
                    $("#queco").attr('src','img/cordova_pet_stable_d.png');
                else if(hambre >= 5 && hambre < 8)
                    $("#queco").attr('src','img/cordova_pet_hungry_d.png');
                else
                    $("#queco").attr('src','img/cordova_pet_vhungry_d.png');
            }

            // CONTROL DE CACAS
            //
            if(ncaca == 5){
                //esta al max entonces dibuja caca
                mas.caca++;//hace caca
                mas.ncaca = 0;//resetea el contador
                if(mas.caca == 1)
                    $("#caca1").attr('src', 'img/poop1.png');
                else if(mas.caca == 2)
                    $("#caca1").attr('src', 'img/poop2.png');
                else if(mas.caca == 3)
                    $("#caca1").attr('src', 'img/poop3.png');
            }
        }//end if vivo
        else{
            //esta muerto se cambia
            //navigator.notification.dialog("Ha muerto");
        }//end if muerto
    }//end funcion recarga

    // Funcion que sube el hambre y disminuye la salud al llegar al limite
    //
    function subeHambre(){
        //estado de barra
        var barra = $("div.health-bar").width();
        //porcentaje de vida que se va a restar
        var qPierdeVida = (barra / 100) * 5;

        //el hambre esta al maximo, por lo que pierde salud
        if(mas.hambre == 10){
            mas.salud -= 5;
            $("div.health-bar-quantity").width($("div.health-bar-quantity").width() - qPierdeVida);
        }
        else if(mas.hambre >= 0)
            mas.hambre++;
        //recargamos el html
        $("#infoHambre").html(mas.hambre);
    }// /subeHambre


    function bajaDiver(){
        //la diversion esta al minimo, por lo que pierde salud
        if(mas.diversion == 0){
            mas.salud -= 5;
            $("div.health-bar-quantity").width($("div.health-bar-quantity").width() - qPierdeVida);
        }
        else if(mas.diversion <= 10)
            mas.diversion--;
        //recargamos html
        $("#infoDiver").html(mas.diversion);
    }// /bajaDiver
});