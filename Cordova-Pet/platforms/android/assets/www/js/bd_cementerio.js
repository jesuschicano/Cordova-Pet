document.addEventListener("deviceready", onDeviceReady, false);

// Crea la tabla si no exite
    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS PETS (id unique,nombre,salud numeric,hambre numeric,diversion numeric,sucio numeric,caca numeric,ncaca numeric,muerto numeric)');
        
    }

    function queryDB(tx) {
        tx.executeSql('SELECT * FROM PETS WHERE PETS.MUERTO = 1', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results){
        var len = results.rows.length;

        if(len > 0){
        	for (var i=0; i<len; i++){
            //navigator.notification.alert(results.rows.item(i).nombre);
            document.getElementById("datos").innerHTML += '<tr><td><img src="img/icono_cementerio.png"/></td><td>'+results.rows.item(i).nombre+'</td></tr>';
            //results.rows.item(i).id+" | "+results.rows.item(i).nombre+" | "+results.rows.item(i).salud+" | "+results.rows.item(i).hambre+" | "+results.rows.item(i).diversion+" | "+results.rows.item(i).sucio+" | "+results.rows.item(i).caca+" | "+results.rows.item(i).muerto);
        	}
        }
        else{
        	document.getElementById("datos").innerHTML += "<tr><td>#</td><td>SIN DATOS</td></tr>";
        }
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.message);
    }

    function successCB() {
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(queryDB, errorCB);
    }

    function onDeviceReady() {
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }