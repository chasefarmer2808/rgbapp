import RPi.GPIO as GPIO

from flask import Flask, render_template

GPIO.setmode(GPIO.BOARD)
app = Flask(__name__)

R = 33
G = 31
B = 29
PINS = [R, G, B]
FREQ = 1000

GPIO.setup(PINS, GPIO.OUT, initial=0)
rp = GPIO.PWM(R, FREQ)
gp = GPIO.PWM(G, FREQ)
bp = GPIO.PWM(B, FREQ)


def scale_shift(val):
    return ((int(val)/255)) * 100

@app.route('/')
def test():
    return render_template('index.html')

@app.route('/gpio')
def init():
    rp.start(100)
    gp.start(100)
    bp.start(100)
    
    return 'GPIO Ready!'

@app.route('/gpio/reset')
def reset():
    GPIO.cleanup()
    return 'GPIO Reset!'    

@app.route('/gpio/<int:r>/<int:g>/<int:b>')
def set_rgb(r, g, b):
    rp.ChangeDutyCycle(scale_shift(r))
    gp.ChangeDutyCycle(scale_shift(g))
    bp.ChangeDutyCycle(scale_shift(b))
    
    return 'Set rgb to {},{},{}'.format(r, g, b)

if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0')
    finally:
        GPIO.cleanup()