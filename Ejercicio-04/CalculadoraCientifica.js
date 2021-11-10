"use strict"

class CalculadoraBasica {

    constructor () {
        this.n1 = '';
        this.n2 = '';
        this.operator = '';

        this.pantalla = '';

        this.isPressed = false;
        this.memoria = new Number('0');

        // Manejamos los distintos eventos de pulsado de teclas
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (Number.isInteger(Number(key)))
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
                    this.igual();
            }
        });
    }

    // +------------------+
    // | -*- PANTALLA -*- |
    // +------------------+

    // Escribimos en pantalla la operación que está ejecutándose
    actualizaPantalla() {
        this.pantalla = this.n1 + this.operator + this.n2;
        this.#refresca();
    }

    // Refrescamos el documento para que se muestre el valor deseado
    #refresca() {
        document.getElementById('result').value = this.pantalla;
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
        if (this.operator === '') // if no operator --> first operand
            this.n1 += caracter;
        else // else --> second operand
            this.n2 += caracter;
        
        this.actualizaPantalla();
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
        this.operator = operador;
        this.actualizaPantalla();
    }

    /** Igual: evalua los operandos y operador que hemos indicado. Y maneja las 
     *  excepciones que puedan surgir:
     *      A) Si no hemos indicando el primer operando --> ERROR
     *      B) Si no hemos indicando el segundo operando --> ERROR
     *      C) Si falla la evaluación --> ERROR
     * 
     *  Si todo sale bien...
     *      --> Reestablece todo y muestra en pantalla el valor computado.
     *      --> NOTA: si quieres seguir trabajando con ese valor computado, deberás
     *          utilizar las teclas de memoria (para eso están).
     */
     igual() {
        try{
            if (this.n1 === '')
            throw 'SYNTAX ERROR';
            if (this.n2 === '')
                throw 'SYNTAX ERROR';
                
            this.pantalla = eval(Number(this.n1) + this.operator + Number(this.n2));

            // if something went wrong...
            if (this.pantalla === undefined)
                throw 'SYNTAX ERROR';
        } catch(err) {
            this.pantalla = err;
        }
        
        this.#refresca();
        this.#reinicia();
    }

    // +---------------+
    // | -*- misc. -*- |
    // +---------------+

    // C: Reestablece la calculadora a un estado inicial.
    borrar() {
        this.#reinicia();
        this.actualizaPantalla();
    }

    #reinicia() {
        this.n1 = '';
        this.operator = '';
        this.n2 = '';
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
            this.#reinicia();
            this.memoria = ''; // we clear the memory
            this.actualizaPantalla();
        }else { // if its the first time (RECALL)
            this.isPressed = true; // we have pressed once
            this.#reinicia();
            this.n1 = this.memoria;
            this.actualizaPantalla();
        }
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
        if (this.operator === '') { // if in the screen there's ONLY ONE number
            this.isPressed = false;
            this.memoria = eval(Number(this.memoria) + operador + Number(this.pantalla));
        }else { // you cannot add stuff like 'something OPERATOR something' to memory
            this.isPressed = false;
            this.pantalla = 'SYNTAX ERROR';
            this.#refresca();
            this.#reinicia();
        }
    }

}

class CalculadoraCientifica extends CalculadoraBasica {

    constructor() {
        super();
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

    potencia2() {
        this.#unaryOperation(x => Math.pow(2, x));
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
    
    // +-------------------+
    // | -*- FACTORIAL -*- |
    // +-------------------+

    factorial() {
        // TODO
    }

    // +-----------------------+
    // | -*- TRIGONOMETRÍA -*- |
    // +-----------------------+

    seno() {
        this.#unaryOperation(x => Math.sin(x));
    }

    coseno() {
        this.#unaryOperation(x => Math.cos(x));
    }

    tangente() {
        this.#unaryOperation(x => Math.tan(x));
    }
    
    #unaryOperation(func) {
        if (this.operator === '')
            this.n1 = func(this.n1);
        this.actualizaPantalla();
    }    

}

let calc = new CalculadoraCientifica();