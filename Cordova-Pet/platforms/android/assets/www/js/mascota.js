var Mascota = function(nombre,salud,hambre,diversion,sucio,caca,ncaca,muerto){

	this.nombre = nombre;
	this.salud = salud;//0-100
	this.hambre = hambre;//0-10
	this.diversion = diversion;//0-10
	this.sucio = sucio;//0-5
	this.caca = caca;//0-3
	this.ncaca = ncaca;//0-5 cuenta las veces hasta que haces caca
	this.muerto = muerto;//0 o 1

	var cantidadSumaVida = $("div.health-bar").width();
    cantidadSumaVida = (cantidadSumaVida / 100) * 10;

	// Funcion para dar de comer a la mascota
	//
	this.comer = function(){
		//estado de barra
        var barra = $("div.health-bar").width();
        //porcentaje de vida que se va a restar
        var qGanaVida = (barra / 100) * 10;

		if(this.hambre > 0){
			this.hambre--;
			$("#infoHambre").html(this.hambre);
			this.ncaca++;
			if(this.salud <= 90){
				this.salud += 10;
				$("div.health-bar-quantity").width($("div.health-bar-quantity").width() + qGanaVida);
			}
			if(this.salud == 95){
				this.salud = 100;
				$("div.health-bar-quantity").width($("div.health-bar").width());
			}
		}
	}

	// Funcion que limpia a la mascota y cacas
	//
	this.limpiar = function(){
		//quita cacas
		$("#caca1").attr("src", "img/white.png");
		this.caca = 0;
		//limpia queco
		$("#queco").attr("src", "img/cordova_pet_stable.png");
		this.sucio = 0;
	}

	this.jugar = function(){
		document.addEventListener("deviceready",onDeviceReady, false);
		var watchID = null;
		var x, y, z;

		// APIs cargadas
		//
		function onDeviceReady(){
			//mostrar un mensaje de confirmacion
			navigator.notification.confirm('Cuando confirmes, sacude tu dispositivo durante unos segundos para jugar con tu mascota.', empiezaShack, "Jugar", ["Ok", "Salir"]);
		}

		// Aumenta suciedad y lanza los sensores
		//
		function empiezaShack(buttonIndex){
			if(buttonIndex == 1){
				var options = { frequency: 500 };
				watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
			}	
		}

		// onSuccess: Captura la aceleracion actual
        //
        function onSuccess(acceleration) {
        	if( (acceleration.x >= 2 && acceleration.x <= 8) || (acceleration.y >= 2 && acceleration.y <= 8) || (acceleration.z >= 2 && acceleration.z <= 8)){
        		navigator.accelerometer.clearWatch(watchID);
                //watchID = null;
                //aumento de suciedad
				if(this.sucio < 5){this.sucio++;}
				//aumenta la diversion
				if(this.diversion < 10){this.diversion = 10;}
				//aumento de salud
				if(this.salud <= 90){this.salud+=10;}
				else{this.salud+=5;}
        	}
        }

        // onError: Al fallar el captor
        //
        function onError() {
            alert("ERROR!");
        }
	}// /this.jugar
}