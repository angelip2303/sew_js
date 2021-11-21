"use strict";

class CalculadoraRPN {
    
    constructor() {
        // Establecemos los valores de las pantallas
        this.pantalla = '';
        this.pantallaPila = '';

        // Creamos una pila para poder hacer las operaciones
        this.pila = new Pila();

        // Verificamos el tipo de funciones con las que estamos trabajando
        this.isInverseFunction = false;

        // Establecemos los eventos de teclado
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (key !== ' ') { // no aceptamos el espacio
                if (Number.isInteger(Number(key)) || key === '.')
                    this.digitos(key);
                else {
                    if (key === '+')
                        this.suma();
                    else if (key === '-')
                        this.resta();
                    else if (key === '*')
                        this.multiplicacion();
                    else if (key === '/')
                        this.division();
                    else if (key.toUpperCase() === 'C')
                        this.borrar();
                    else if (key === 'Enter')
                        this.push();
                }
            }
        });
    }

    push() {
        this.pila.push(Number(this.pantalla));
        this.refresca();
    }

    refresca() {
        this.limpiarPantalla();
        this.actualizaPantalla();
        this.actualizaPantallaPila();
    }

    // Refrescamos el documento para que se muestre el valor deseado
    actualizaPantalla() {        
        document.getElementById('result').value = this.pantalla;
    }

    // Refrescamos el documento para que se muestre el valor deseado
    actualizaPantallaPila() {
        this.pantallaPila = ''; // reseteamos la pantalla de la pila
        for (let i = 0; i < this.pila.len(); i++)
            this.pantallaPila += this.pila.get(i).toString() + '\n';
        
        document.querySelector('textarea').value = this.pantallaPila;
    }

    digitos(value) {
        this.pantalla += value;
        this.actualizaPantalla();
    }

    suma() {
        this.#binaryOperation((a, b) => a + b);
    }

    resta() {
        this.#binaryOperation((a, b) => a - b);
    }

    multiplicacion() {
        this.#binaryOperation((a, b) => a * b);
    }

    division() {
        this.#binaryOperation((a, b) => a / b);
    }

    raizCuadrada() {
        this.unaryOperation(a => Math.sqrt(a));
    }

    cuadrado() {
        this.unaryOperation(a => Math.pow(a, 2));
    }

    logaritmo() {
        this.unaryOperation(a => Math.log(a));
    }

    seno() {
        if (this.isInverseFunction) // if we are working with inverse functions: arcsin
            this.unaryOperation(x => Math.asin(this.#angulo(x)));
        else // we are working with usual trigonometric identities
            this.unaryOperation(x => Math.sin(this.#angulo(x)));
    }

    coseno() {
        if (this.isInverseFunction) // if we are working with inverse functions: arccos
            this.unaryOperation(x => Math.acos(this.#angulo(x)));
        else // we are working with usual trigonometric identities
            this.unaryOperation(x => Math.cos(this.#angulo(x)));
    }

    tangente() {
        if (this.isInverseFunction)  // if we are working with inverse functions: arctan
            this.unaryOperation(x => Math.atan(this.#angulo(x)));
        else // we are working with usual trigonometric identities
            this.unaryOperation(x => Math.tan(this.#angulo(x)));
    }

    #binaryOperation(f) {
        let operand2 = this.pila.pop(); // no todas las operaciones soportan la propiedad conmutativa
        let operand1 = this.pila.pop(); // extraemos un valor de la pila
        let result = f(operand1, operand2);
        this.pantalla = result;
        this.push();
    }

    unaryOperation(f) {
        let operand = this.pila.pop(); // extraemos un valor de la pila
        let result = f(operand);
        this.pantalla = result;
        this.push();
    }

    #angulo(x) {
        return x * (Math.PI / 180.0);
    }

    limpiarPantalla() {
        this.pantalla = '';
    }

    borrar() {
        this.pila = new Pila();
        this.refresca();
    }

    shift() {
        this.isInverseFunction = !this.isInverseFunction;
        
        // we change one set of operators by the other
        if (this.isInverseFunction) { // we are gonna work with circular functions
            document.getElementById('sin').value = 'asin';
            document.getElementById('cos').value = 'acos';
            document.getElementById('tan').value = 'atan';
        } else { // we are working with usual trigonometric functions
            document.getElementById('sin').value = 'sin';
            document.getElementById('cos').value = 'cos';
            document.getElementById('tan').value = 'tan';
        }
    }

}

class CalculadoraRPNEspecifica extends CalculadoraRPN {

    constructor() {
        super();
        this.isSistemaInternacional;
    }

    legua() {
        const leguaAKilometro = 4.828032;
        if (this.isSistemaInternacional) // we want to convert from SI to SA
            this.unaryOperation(x => x / leguaAKilometro);
        else // // we want to convert from SA to SI
            this.unaryOperation(x => x * leguaAKilometro);
    }

    milla() {
        const millaAKilometro = 1.609344;
        if (this.isSistemaInternacional) // we want to convert from SI to SA
            this.unaryOperation(x => x / millaAKilometro);
        else // // we want to convert from SA to SI
            this.unaryOperation(x => x * millaAKilometro);
    }

    yarda() {
        const yardaAMetro = 0.9144;
        if (this.isSistemaInternacional) // we want to convert from SI to SA
            this.unaryOperation(x => x / yardaAMetro);
        else // // we want to convert from SA to SI
            this.unaryOperation(x => x * yardaAMetro);
    }

    pie() {
        const pieAMetro = 30.48;
            if (this.isSistemaInternacional) // we want to convert from SI to SA
            this.unaryOperation(x => x / pieAMetro);
        else // // we want to convert from SA to SI
            this.unaryOperation(x => x * pieAMetro);
    }

    pulgada() {
        const pulgadaACentimetro = 2.54;
            if (this.isSistemaInternacional) // we want to convert from SI to SA
            this.unaryOperation(x => x / pulgadaACentimetro);
        else // // we want to convert from SA to SI
            this.unaryOperation(x => x * pulgadaACentimetro);
    }

    braza() {
        const brazaToMeter = 1.8288;
            if (this.isSistemaInternacional) // we want to convert from SI to SA
            this.unaryOperation(x => x / brazaToMeter);
        else // // we want to convert from SA to SI
            this.unaryOperation(x => x * brazaToMeter);
    }

    shift() {
        super.shift();
        this.isSistemaInternacional = !this.isSistemaInternacional;
        
        // we change one set of operators by the other
        if (this.isSistemaInternacional) { // we are working with the international measurement system
            document.getElementById('legua').value = 'KM a LEGUA';
            document.getElementById('milla').value = 'KM a MILLA';
            document.getElementById('yarda').value = 'M a YARDA';
            document.getElementById('pie').value = 'CM a PIE';
            document.getElementById('pulgada').value = 'CM a PULGADA';
            document.getElementById('braza').value = 'M a BRAZA';
        } else { // we are working with the american measurement system
            document.getElementById('legua').value = 'LEGUA a KM';
            document.getElementById('milla').value = 'MILLA a KM';
            document.getElementById('yarda').value = 'YARDA a M';
            document.getElementById('pie').value = 'PIE a CM';
            document.getElementById('pulgada').value = 'PULGADA a CM';
            document.getElementById('braza').value = 'BRAZA a M';
        }
    }

}

class Pila {

    constructor() {
        this.pila = new Array();
    }

    push(valor) {
        this.pila.push(valor);
    }

    pop() {
        return (this.pila.pop());
    }

    get(index) {
        return this.pila[index];
    }

    len() {
        return this.pila.length;
    }

}

let calc = new CalculadoraRPNEspecifica();