document.addEventListener("deviceready", onDeviceReady, false);

var n = 0;
var x = 0;
var nombres = new Array("AIKO","ANEKO","AYAME","CHIKA","CHIKO","CHO","DAI","ERIKO","GIN","HARUKO","HOSHI","HOSHIKO","KAEDE","KAMEKO","KAMI");
    // Populate the database 
    //
    function populateDB(tx) {
    	//alert("populateDB");
        tx.executeSql('CREATE TABLE IF NOT EXISTS PETS (id unique,nombre,salud numeric,hambre numeric,diversion numeric,sucio numeric,caca numeric,ncaca numeric,muerto numeric)');
    }
    
    function insertar(tx){
        x = Math.floor((Math.random() * 14));
        c = Math.floor((Math.random() * 99));
        n++;
    	tx.executeSql('INSERT INTO PETS (id, nombre, salud, hambre, diversion, sucio, caca, ncaca,muerto) VALUES ('+n+',"'+nombres[x].concat(c)+'",100,5,5,0,0,0,0)');
    }

    // Query the database
    //
    function queryDB(tx) {
    //alert("queryDB(tx)");
        tx.executeSql('SELECT * FROM PETS WHERE PETS.MUERTO = 0', [], querySuccess, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
    //alert("querySuccess(tex, results)");
        var len = results.rows.length;
        n = results.rows.length;

        var db2 = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        
        if (n==0){
            db2.transaction(insertar, errorCB, nuevaMascota);
        }
        else if (n > 0){
            navigator.notification.alert("Mascota existente");
        }

       	for (var i=0; i<len; i++){
            navigator.notification.alert(results.rows.item(i).id+" | "+results.rows.item(i).nombre+" | "+results.rows.item(i).salud+" | "+results.rows.item(i).hambre+" | "+results.rows.item(i).diversion+" | "+results.rows.item(i).sucio+" | "+results.rows.item(i).caca+" | "+results.rows.item(i).muerto);
        }
    }

    // Transaction error callback
    //
    function errorCB(err) {
    //alert("errorCB");
        alert("Error processing SQL: "+err.message);
    }

    // Transaction success callback
    //
    function successCB() {
    //alert("successCB");
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(queryDB, errorCB);
    }
    
    function nuevaMascota(){
    	alert("Nueva mascota creada!!");
    }

    // Cordova is ready
    //
    function onDeviceReady() {
    	
        var db = window.openDatabase("Pets", "1.0", "Cordova Pet", 200000);
        db.transaction(populateDB, errorCB, successCB);
        
        
        
        
    }