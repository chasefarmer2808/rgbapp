$(document).ready(function() {
    startup();
})

var r_input, b_input, g_input,
    r_slider, b_slider, g_slider,
    onBtn, offBtn, submitBtn;

var BASE_URL = 'http://192.168.0.106:5000';

var rVal = 255, 
    gVal = 255,
    bVal = 255;

var powerStatus = false;

function hexToRGBArray(hex) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);

    return [r, g, b]
}

function startup() {
    r_input = document.querySelector('#red-val');
    g_input = document.querySelector('#green-val');
    b_input = document.querySelector('#blue-val');
    
    r_slider = document.querySelector('#red-range');
    g_slider = document.querySelector('#green-range');
    b_slider = document.querySelector('#blue-range');
    
    powerBtn = document.querySelector('#toggle-button');
    submitBtn = document.querySelector('#submit-button');

    r_input.addEventListener('input', updateRGBValuesFromInput, false);
    g_input.addEventListener('input', updateRGBValuesFromInput, false);
    b_input.addEventListener('input', updateRGBValuesFromInput, false);
    r_slider.addEventListener('input', updateRGBValuesFromSlider, false);
    g_slider.addEventListener('input', updateRGBValuesFromSlider, false);
    b_slider.addEventListener('input', updateRGBValuesFromSlider, false);
    
    powerBtn.addEventListener('click', toggleLEDPower, false);
    submitBtn.addEventListener('click', updateRGB, false);

    setRGBInputs();
}

function toggleLEDPower() {
    if (powerStatus) {
        rgbOff();
    } else {
        rgbOn();
    }

    powerStatus = !powerStatus;
}

function updateRGBValuesFromInput() {
    rVal = r_input.value;
    bVal = b_input.value;
    gVal = g_input.value;

    setRGBInputs();
}

function updateRGBValuesFromSlider() {
    rVal = r_slider.value;
    gVal = g_slider.value;
    bVal = b_slider.value;

    setRGBInputs();
}

function setRGBInputs() {
    r_input.value = rVal;
    r_slider.value = rVal;
    g_input.value = gVal;
    g_slider.value = gVal;
    b_input.value = bVal;
    b_slider.value = bVal;
    updateStatusBackground();
}

function updateStatusBackground() {
    submitBtn.style.backgroundColor = `rgb(${rVal},${gVal},${bVal})`;
}

function updateRGB() {
    var url = `${BASE_URL}/gpio/${rVal}/${gVal}/${bVal}`;
    console.log(url)

    $.get(url, function(data, status) {
        console.log(data);
        console.log(status);
    });
}

function rgbOn() {
    var url = `${BASE_URL}/gpio`;

    $.get(url)
        .done(function() {
            console.log('on')
            setRGBInputs(rVal, gVal, bVal);
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



