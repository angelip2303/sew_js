"use strict";

class CalculadoraBasica {

    constructor () {
        this.operands = new Array();
        this.n1 = '';

        this.pantalla = '';

        this.isPressed = false;
        this.memoria = new Number('0');

        // We set the main keydown events
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (key !== ' ') { // we don't accept whitespaces
                if (Number.isInteger(Number(key)))
                    this.digitos(key);
                else {
                    if (key === '.')
                        this.punto();
                    else if (key === '+')
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
                        this.igual();
                }
            }
        });
    }

    // +------------------+
    // | -*- PANTALLA -*- |
    // +------------------+

    // Refrescamos el documento para que se muestre el valor deseado
    actualizaPantalla() {
        document.getElementById('result').value = this.pantalla + this.n1;
    }

    // +-----------------+
    // | -*- DÍGITOS -*- |
    // +-----------------+

    digitos(digito) {
        this.#caracter(digito);
    }

    punto() {
        this.#caracter('.');
    }

    // ALGORITMO encargado de saber con qué operando estamos trabajando
    #caracter(caracter) {
        this.n1 += caracter;
        this.actualizaPantalla();
    }

    #guardaNumero() {
        // We add the operand the user has written to the operands array
        //      NOTE: (an operand starts and ends when an operator is written)
        this.operands.push(this.n1);
        this.pantalla += this.n1;
        this.n1 = ''; // reset the actual operand
    }

    // +--------------------+
    // | -*- OPERADORES -*- |
    // +--------------------+

    suma() {
        this.operador('+');
    }

    resta() {
        this.operador('-');
    }

    multiplicacion() {
        this.operador('*');
    }

    division() {
        this.operador('/');
    }

    // ALGORITMO común a todos los operadores
    operador(operador) {
        this.#guardaNumero();

        // We add the operator to the operators array
        this.operands.push(operador);

        // We update the screen
        this.pantalla += operador;
        this.actualizaPantalla();
    }

    /** Igual: evalua los operandos y operador que hemos indicado. Y maneja las 
     *  excepciones que puedan surgir:
     *      A) Si no hemos indicado bien algún operando --> ERROR
     *      B) Si no hemos indicado bien algún operador --> ERROR
     *      C) Si falla la evaluación --> ERROR
     * 
     *  Si todo sale bien...
     *      --> Reestablece todo y muestra en pantalla el valor computado.
     *      --> NOTA: si quieres seguir trabajando con ese valor computado, deberás
     *          utilizar las teclas de memoria (para eso están).
     */
     igual() {
        try{
            // Prepare for equality
            this.#guardaNumero(); // equality is some kind of operator
            this.pantalla = ''; // we reset the screen

            // The idea is to check if we are working with a number or not:
            //     1) If it is a number --> convert it to a number and operate with it as a number.
            //     2) Else --> it is an operator so deal with it as an operator.
            for (let element of this.operands)
                this.pantalla += Number.isFinite(element) ? Number(element) : element;

            // Operate over the screen...
            this.pantalla = eval(this.pantalla);

            // if something went wrong...
            if (this.pantalla === undefined || Number.isNaN(this.pantalla))
                throw err;
        } catch(err) {
            this.pantalla = 'SYNTAX ERROR';
        }
        
        this.reinicia();
        this.actualizaPantalla();
        this.pantalla = ''; // reset the screen for later operations
    }

    // +---------------+
    // | -*- misc. -*- |
    // +---------------+

    // C: Reestablece la calculadora a un estado inicial.
    borrar() {
        this.reinicia();
        this.pantalla = '';
        this.actualizaPantalla();
    }

    reinicia() {
        this.operands = new Array();
        this.operands = new Array();
        this.n1 = '';
    }

    // +-----------------+
    // | -*- MEMORIA -*- |
    // +-----------------+

    /** MRC: El funcionamiento de esta tecla es el siguiente:
     *      A) La primera vez que pulsas (RECALL) --> escribe en pantalla el valor
     *      guardado en memoria.
     * 
     *      B) La segunda vez que pulsas la tecla (CLEAR) --> limpia el valor que
     *      está almacenado en memoria.
     */
    mrc() {
        if (this.isPressed) { // if its the second time we press the button (CLEAR)
            this.isPressed = false; // we have pressed twice
            this.reinicia();
            this.memoria = ''; // we clear the memory
        }else { // if its the first time (RECALL)
            this.isPressed = true; // we have pressed once
            this.reinicia();
            this.n1 = this.memoria;
        }

        // We update the memory
        this.pantalla = this.n1;
        this.actualizaPantalla();
    }

    // M-: Resta el valor que está guardado en memoria con el que aparece en pantalla
    mMenos() {
        this.#operaEnMemoria('-');
    }

    // M+: Suma el valor que está guardado en memoria con el que aparece en pantalla
    mMas() {
        this.#operaEnMemoria('+');
    }

    #operaEnMemoria(operador) {
        if (this.operands.length == 0) { // if in the screen there's ONLY ONE number
            this.isPressed = false;
            this.memoria = eval(Number(this.memoria) + operador + Number(this.n1));
            this.actualizaPantalla();
        }else { // you cannot add stuff like 'something OPERATOR something' to memory
            this.isPressed = false;
            this.pantalla = 'SYNTAX ERROR';
            this.borrar();
        }
    }

}

class CalculadoraCientifica extends CalculadoraBasica {

    constructor() {
        super(); // we call the parent constructor

        this.angleUnit = 'deg';
        this.isScientifcNotation = false;
        this.isCircularFunction = false; // AT THE BEGINNING: we are working with usual trigonometric identities

        // We add the new keydown events
        document.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key !== ' ') {  // we don't accept whitespaces
                if (key === '(')
                    this.operador(key);
                else if (key === ')')
                    this.operador(key);
                else if (key === '%')
                    this.modulo();
                else if (key === '!')
                    this.factorial();
                else if (key === 'Backspace')
                    this.backspace();
                else if (key === 'Shift')
                    this.shift();
            }
        });
    }

    // +------------------------+
    // | -*- UNARY OPERATOR -*- |
    // +------------------------+
    
    #unaryOperation(func) {
        if (this.operands.length > 0) // we are trying to operate over more than a number
            this.pantalla = 'SYNTAX ERROR'
        else {
            // We operate over the number on screen
            this.n1 = func(Number(this.n1));

            // we set the value of the screen to the value computed
            this.pantalla = this.n1;
        }

        // Same process as in method IGUAL of basic calculator
        this.reinicia();
        this.actualizaPantalla();
        this.pantalla = ''; // reset the screen for later operations
    } 

    // +-------------------+
    // | -*- POTENCIAS -*- |
    // +-------------------+

    cuadrado() {
        this.#unaryOperation(x => Math.pow(x, 2));
    }

    potencia() {
        this.operador('**');
    }

    raizCuadrada() {
        this.#unaryOperation(x => Math.sqrt(x));
    }

    potencia10() {
        this.#unaryOperation(x => Math.pow(10, x));
    }

    // +--------------------+
    // | -*- LOGARITMOS -*- |
    // +--------------------+

    log() {
        this.#unaryOperation(x => Math.log10(x));
    }

    ln() {
        this.#unaryOperation(x => Math.log(x));
    }

    // +--------------------+
    // | -*- OPERADORES -*- |
    // +--------------------+

    modulo() {
        this.operador('%');
    }

    masMenos() {
        this.n1 = Number(this.n1) * Number(-1);
        this.actualizaPantalla();
    }
    
    // +-------------------+
    // | -*- FACTORIAL -*- |
    // +-------------------+

    factorial() {
        this.#unaryOperation(function factorial(x) {
                                        if (x <= 1)
                                            return 1;
                                        return x * factorial(x-1);
                                    });
    }

    // +-----------------------+
    // | -*- TRIGONOMETRÍA -*- |
    // +-----------------------+

    seno() {
        if (this.isCircularFunction) // if we are working with circular functions: sinh
            this.#unaryOperation(x => Math.sinh(this.angulo(x)));
        else // we are working with usual trigonometric identitiess
            this.#unaryOperation(x => Math.sin(this.angulo(x)));
    }

    coseno() {
        if (this.isCircularFunction) // if we are working with circular functions: cosh
            this.#unaryOperation(x => Math.cosh(this.angulo(x)));
        else // we are working with usual trigonometric identities
            this.#unaryOperation(x => Math.cos(this.angulo(x)));
    }

    tangente() {
        if (this.isCircularFunction)  // if we are working with circular functions: tanh
            this.#unaryOperation(x => Math.tanh(this.angulo(x)));
        else // we are working with usual trigonometric identities
            this.#unaryOperation(x => Math.tan(this.angulo(x)));
    }

    // +------------------------------+
    // | -*- MANEJO de CARACTERES -*- |
    // +------------------------------+

    // No eliminamos operadores (la calculadora de W10 tampoco lo hace)
    backspace() {
        this.n1 = this.n1.substr(0, this.n1.length-1);
        this.actualizaPantalla();
    }

    // +-----------------+
    // | -*- MEMORIA -*- |
    // +-----------------+

    // Básicamente guarda el último valor que hemos introducido
    guardarEnMemoria() {
        this.memoria = this.n1;
    }

    // Para estos dos operadores vamos a usar básicamete la misma lógica que existía...
    mc() {
        this.isPressed = true;
        this.mrc();
    }

    mr() {
        this.isPressed = false;
        this.mrc();
    }

    // +------------------+
    // | -*- misc. -*- |
    // +------------------+

    cambiaUnidadAngulos() {
        this.angleUnit = this.angleUnit === 'deg' ? 'rad' : 'deg';
        document.getElementById('angleUnit').value = this.angleUnit.toUpperCase();
    }

    // Nota que esta conversión tiene una precisión determinada por el navegador/motor de JS
    angulo (x) {
        return this.angleUnit === 'deg' ? (x * (Math.PI / 180.0)) : x;
    }

    shift() {
        this.isCircularFunction = !this.isCircularFunction;
        
        // we change one set of operators by the other
        if (this.isCircularFunction) { // we are gonna work with circular functions
            document.getElementById('sin').value = 'sinh';
            document.getElementById('cos').value = 'cosh';
            document.getElementById('tan').value = 'tanh';
        } else { // we are working with usual trigonometric functions
            document.getElementById('sin').value = 'sin';
            document.getElementById('cos').value = 'cos';
            document.getElementById('tan').value = 'tan';
        }
    }

}

let calc = new CalculadoraCientifica();