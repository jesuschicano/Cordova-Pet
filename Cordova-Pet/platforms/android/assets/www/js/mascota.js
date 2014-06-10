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

		function onDeviceReady(){
			//mostrar un mensaje de confirmacion
			navigator.notification.confirm('Cuando confirmes, sacude tu dispositivo durante unos segundos para jugar con tu mascota.', empiezaShack, "Jugar", ["Ok", "Salir"]);
		}

		function empiezaShack(buttonIndex){
			if(buttonIndex == 1)
				alert(buttonIndex);//this.sucio++;
		}
	}
}