$(document).ready(function() {
    startup();
})

var colorWell;

function hexToRGBArray(hex) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);

    return [r, g, b]
}

function startup() {
    colorWell = document.querySelector('#color-picker');
    colorWell.addEventListener('input', updateRGB, false);
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



