"use strict";
// ! La funcion Math. y sus variables.
// let aleatorio = Math.random(); // Numero aleatorio entre 0 y 1 pero 1 no puesto.

// console.log(Math.round(aleatorio * 100) + "%") //roud redondea a numero entero y *100 lo multiplica
// if (aleatorio < 0.25) {
//     console.log("Estoy en el 25%")
// } else {
//     console.log("Estoy en el 75%")
// }

/**
 *! Funciones Mapa 
 *  crearTablero(num) crea un tablero lo grande que quieras
 *  crearBioma() crea el tipo de bioma de cada bloque
 *  impresora(tablero) imprime bonito el tablero
 *  colocarPersonaje(x, y, elemento) indicas en que posicion y te pone el personaje
 *  coordenadas() pone coordenadas aleatorias
 *  moverPersonaje(x, y, wasd) mueve el personaje de una coordenada
 */


/**
 *! Funcion para hacer una lista en 2D
 * @param {Num} num La dimension del tablero
 * @returns {[*]} El tablero
 */
function crearTablero(num) {
    let tablero = [];
    for (let i = 0; i < num; i++) {
        tablero.push([]);
        for (let x = 0; x < num; x++) {
            let anterior = null;
            let superior = null;
            let diagonal_derecha = null;
            let diagonal_izquierda = null;
            //indicar el valor de las variables de ubicacion
            if (i > 0 && x < num - 1) {
                diagonal_derecha = tablero[i - 1][x + 1].terreno;
            }
            if (i < 0 && x < num + 1) {
                diagonal_izquierda = tablero[i - 1][x + 1].terreno;
            }
            if (i > 0) {
                superior = tablero[i - 1][x].terreno;
            }
            if (x > 0) {
                anterior = tablero[i][x - 1].terreno;
            }
            let bioma = crearBioma(anterior, superior, diagonal_derecha, diagonal_izquierda);
            tablero[i].push(bioma);
        }
    }
    return tablero;
}
let numero = 20; //TODO Modificas como de grande es el tablero
const tabla = crearTablero(numero);

/**
 *! Funcion que crea los bloques que se añaden al bioma
 * @returns {{*}} un bloque del mapa
 */
function crearBioma(anterior, superior, diagonal_derecha, diagonal_izquierda) {
    let terreno = ["tierra", "mar", "camino"];
    let porcentaje = Math.round(Math.random() * 100);
    // let aleatorio = Math.round(Math.random() * terreno.length);
    let bloque = { "terreno": "", "personaje": null };

    //arriba camino y diagonal derecha no tiene camino 100 camino (valores principales)
    if (superior == "camino" && diagonal_derecha != "camino") {
        if (diagonal_derecha == null) {
            bloque.terreno = "tierra";
        } else {
            if (porcentaje < 90) {
                bloque.terreno = "camino";
            } else {
                bloque.terreno = "tierra";
            }
        }
    } else if (superior == "camino" && diagonal_derecha == "camino") {
        bloque.terreno = "tierra";
    } else if (superior == "tierra" && diagonal_derecha == "camino") {
        bloque.terreno = "tierra";
    } else if (diagonal_izquierda == "camino" && superior != "camino") {
        bloque.terreno = "camino";
    } else if (anterior != null && anterior != "tierra") {
        switch (anterior) {
            case "mar":
                //70 agua y 30 de tierra (valores principales)
                if (porcentaje < 60) {
                    bloque.terreno = "mar";
                } else {
                    bloque.terreno = "tierra";
                }
                break;

            case "camino":
                //70 camino y 30 de tierra; (valores principales)
                if (porcentaje < 65) {
                    bloque.terreno = "camino";
                } else {
                    bloque.terreno = "tierra";
                }
                break;
        }

        //arriba agua 70 agua y 30 tierra
    } else if (superior == "mar") {
        if (porcentaje < 60) {
            bloque.terreno = "mar";
        } else {
            bloque.terreno = "tierra";
        }
    } else {
        if (porcentaje < 80) {
            bloque.terreno = "tierra";
        } else if (porcentaje > 80 && porcentaje < 95) {
            bloque.terreno = "mar";
        } else {
            bloque.terreno = "camino";
        }
    }
    return bloque;
}

/**
 *! Funcion para que muestre el tablero bonito
 * @param {[[*]]} tablero  
 */
function impresora(tablero) {
    let nu = tablero[0].length;
    let text = "";
    for (let i = 0; i < nu; i++) {
        text += " ___"
    }
    console.log(text);
    for (let i = 0; i < nu; i++) {
        let x = "|";
        for (let y = 0; y < nu; y++) {
            switch (tabla[i][y].terreno) {
                case "tierra":
                    if (tabla[i][y].personaje != null) {
                        x += " a ";
                    } else {
                        x += "   ";
                    }
                    break;
                case "mar":
                    if (tabla[i][y].personaje != null) {
                        x += " a ";
                    } else {
                        x += " M ";
                    }
                    break;
                case "camino":
                    if (tabla[i][y].personaje != null) {
                        x += " a ";
                    } else {
                        x += " = ";
                    }
                    break;
                default:
                    if (tabla[i][y].personaje != null) {
                        x += " a ";
                    } else {
                        x += "  ";
                    }
                    break;
            }
            x += "|";
        }
        console.log(x);
    }
}
impresora(tabla);

/**
 *! Funcion para colocar el personaje en una coordenada
 * @param {Number} x coordenada x
 * @param {Number} y coordenada y
 * @param {String} elemento escribir el jugador
 */
function colocarPersonaje(x, y, elemento) {
    for (let xx = 0; xx < tabla.length; xx++) {
        for (let yy = 0; yy < tabla[xx].length; yy++) {
            if (x == xx && y == yy) {
                tabla[xx][yy].personaje = elemento;
            }
        }
    }
}
/**
 *! Funcion que te indica la coordenada x o y
 * @returns {Number} la coordenada x o y
 */
function coordenadas() {
    let x = tabla.length;
    let aleatorio = Math.round(Math.random() * x);
    return aleatorio;
}
colocarPersonaje(1, 1, " a  ");
impresora(tabla);

/**
 *! Funcion para que se mueva un personaje de una coordenada a wasd
 * @param {Number} x coordenada x
 * @param {Number} y coordenada y
 * @param {String} wasd moverlo hacia una opcion
 */
function moverPersonaje(x, y, wasd) {
    let personaje;
    for (let xx = 0; xx < tabla.length; xx++) {
        for (let yy = 0; yy < tabla[xx].length; yy++) {
            if (tabla[xx][yy] == tabla[x][y]) {
                personaje = tabla[xx][yy];
                switch (wasd) {
                    case "w":
                        if (xx != 0) {
                            tabla[(xx) - 1][yy].personaje = personaje;
                            tabla[xx][yy].personaje = null;
                        }
                        break;
                    case "a":
                        if (yy != 0) {
                            tabla[xx][(yy) - 1].personaje = personaje;
                            tabla[xx][yy].personaje = null;
                        }
                        break;
                    case "s":
                        if (xx != tabla.length) {
                            tabla[(xx) - 1][yy].personaje = personaje;
                            tabla[xx][yy].personaje = null;
                        }
                        break;
                    case "d":
                        if (yy != tabla.length) {
                            tabla[xx][(yy) + 1].personaje = personaje;
                            tabla[xx][yy].personaje = null;
                        }
                        break;
                }

            }
        }
    }
}
moverPersonaje(1, 1, "a");
impresora(tabla);
