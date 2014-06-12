// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    startWatch();
}

// Start watching the acceleration
//
function startWatch() {

    // Update acceleration every 3 seconds
    var options = { frequency: 3000 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}


// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
                        'Acceleration Y: ' + acceleration.y         + '<br />' +
                        'Acceleration Z: ' + acceleration.z         + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';

}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}
