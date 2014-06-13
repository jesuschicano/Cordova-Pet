document.addEventListener("deviceready", onDeviceReady, false);

var mas = null;

var n = 0;
var x = 0;
var nombres = new Array("AIKO","ANEKO","AYAME","CHIKA","CHIKO","CHO","DAI","ERIKO","GIN","HARUKO","HOSHI","HOSHIKO","KAEDE","KAMEKO","KAMI");
    
    // Crea la tabla si no exite
    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS PETS (id unique,nombre,salud numeric,hambre numeric,diversion numeric,sucio numeric,caca numeric,ncaca numeric,muerto numeric)');
    }
    
    // NUEVA FILA
    function insertar(tx){
        x = Math.floor((Math.random() * 14));
        c = Math.floor((Math.random() * 99));
        n++;
    	tx.executeSql('INSERT INTO PETS (id, nombre, salud, hambre, diversion, sucio, caca, ncaca,muerto) VALUES ('+n+',"'+nombres[x].concat(c)+'",100,0,10,0,0,0,0)');
    }

    // CONSULTAS
    // Misma consulta pero cambian las funciones callback
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM PETS WHERE PETS.MUERTO = 0', [], querySuccess, errorCB);
    }

    function queryDB2(tx) {
        tx.executeSql('SELECT * FROM PETS WHERE PETS.MUERTO = 0', [], nuevaMascota, errorCB);
    }

    // Query the success callback
    // FUNCIONES DE RESULTADO - MUESTRA CAMPOS
    function querySuccess(tx, results) {
        n = results.rows.length;

        if (n==0){
            var db2 = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
            db2.transaction(insertar, errorCB, successCB2);
        }
        else if (n > 0){
            navigator.notification.alert("Mascota existente");
            for (var i=0; i<n; i++){
                //navigator.notification.alert(results.rows.item(i).id+" | "+results.rows.item(i).nombre+" | "+results.rows.item(i).salud+" | "+results.rows.item(i).hambre+" | "+results.rows.item(i).diversion+" | "+results.rows.item(i).sucio+" | "+results.rows.item(i).caca+" | "+results.rows.item(i).muerto);
                //mas = new Mascota(results.rows.item(i).nombre,results.rows.item(i).salud,results.rows.item(i).hambre,results.rows.item(i).diversion,results.rows.item(i).sucio,results.rows.item(i).caca,results.rows.item(i).ncaca,results.rows.item(i).muerto);
                mas = new Mascota(results.rows.item(i).id,results.rows.item(i).nombre,results.rows.item(i).salud,results.rows.item(i).hambre,results.rows.item(i).diversion,results.rows.item(i).sucio,results.rows.item(i).caca,results.rows.item(i).ncaca,results.rows.item(i).muerto);
                //navigator.notification.alert(mas.nombre);
                inGame(mas);
            }
        }
    }

    function nuevaMascota(tx, results){
        alert("Nueva mascota creada!!");
        var len = results.rows.length;
        for (var i=0; i<len; i++){
            //navigator.notification.alert(results.rows.item(i).id+" | "+results.rows.item(i).nombre+" | "+results.rows.item(i).salud+" | "+results.rows.item(i).hambre+" | "+results.rows.item(i).diversion+" | "+results.rows.item(i).sucio+" | "+results.rows.item(i).caca+" | "+results.rows.item(i).muerto);
            //mas = new Mascota(results.rows.item(i).nombre,results.rows.item(i).salud,results.rows.item(i).hambre,results.rows.item(i).diversion,results.rows.item(i).sucio,results.rows.item(i).caca,results.rows.item(i).ncaca,results.rows.item(i).muerto);
            mas = new Mascota(results.rows.item(i).id,results.rows.item(i).nombre,100,0,10,0,0,0,0);
            //navigator.notification.alert(mas.nombre);
            inGame(mas);
        }
    }

    // Transaction error callback
    //
    function errorCB(err) {
        alert("Error processing SQL: "+err.message);
    }

    // FUNCION CALLBACK EXITO DE LA CONSULTA SQL
    // Cambian los callback
    function successCB() {
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(queryDB, errorCB);
    }

    function successCB2() {
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(queryDB2, errorCB);
    }

    
    // deviceready
    function onDeviceReady() {
    	
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(populateDB, errorCB, successCB);
    }