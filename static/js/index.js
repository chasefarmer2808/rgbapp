$(document).ready(function() {
    startup();
})

var colorWell, onBtn, offBtn;

var BASE_URL = 'http://192.168.0.106:5000';

function hexToRGBArray(hex) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);

    return [r, g, b]
}

function startup() {
    colorWell = document.querySelector('#color-picker');
    onBtn = document.querySelector('#on-button');
    offBtn = document.querySelector('#off-button');
    
    colorWell.addEventListener('input', updateRGB, false);
    onBtn.addEventListener('click', rgbOn, false);
    offBtn.addEventListener('click', rgbOff, false);
}

function rgbOn() {
    console.log('on');
    var url = `${BASE_URL}/gpio`;

    $.get(url)
        .done(function() {
            console.log('on')
        })
        .fail(function() {
            console.log('err init gpio')
        });
}

function rgbOff() {
    var url = `${BASE_URL}/gpio/reset`;

    $.get(url)
        .done(function() {
            console.log('off');
        })
        .fail(function() {
            console.log('err off gpio')
        });
}

function updateRGB(event) {
    var rgb = hexToRGBArray(event.target.value);
    console.log(rgb);

    var url = `http://192.168.0.106:5000/gpio/${rgb[0]}/${rgb[1]}/${rgb[2]}`;
    console.log(url)

    $.get(url, function(data, status) {
        console.log(data);
        console.log(status);
    });
}



