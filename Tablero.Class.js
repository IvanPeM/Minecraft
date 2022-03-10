"use strcit";

const Bloque = require("./Bloque.class");

class Tablero {

    constructor(numero) {
        this._tablero = [];

        for (let x = 0; x < numero; x++) {
            this._tablero.push([]);
            for (let y = 0; y < numero; y++) {
                let anterior = null;
                let superior = null;
                let diagonal_derecha = null;
                let diagonal_izquierda = null;

                if (x > 0 && y < numero - 1) {
                    diagonal_derecha = this._tablero[x - 1][y + 1].terreno;
                }
                if (x < 0 && y < numero + 1) {
                    diagonal_izquierda = this._tablero[x - 1][y + 1].terreno;
                }
                if (x > 0) {
                    superior = this._tablero[x - 1][y].terreno;
                }
                if (y > 0) {
                    anterior = this._tablero[x][y - 1].terreno;
                }
                let bioma = new Bloque(anterior, superior, diagonal_derecha, diagonal_izquierda);
                this._tablero[x].push(bioma);
            }
        }
    }

    impresora() {
        let nu = this._tablero[0].length;
        let barraHorizontal = "";
        for (let i = 0; i < nu; i++) {
            barraHorizontal += " ___"
        }
        console.log(barraHorizontal);
        for (let i = 0; i < nu; i++) {
            let linea = "|";
            for (let y = 0; y < nu; y++) {
                switch (this._tablero[i][y].terreno) {
                    case "tierra":
                        if (this._tablero[i][y].personaje != null) {
                            linea += " a ";
                        } else {
                            linea += "   ";
                        }
                        break;
                    case "mar":
                        if (this._tablero[i][y].personaje != null) {
                            linea += " a ";
                        } else {
                            linea += " M ";
                        }
                        break;
                    case "camino":
                        if (this._tablero[i][y].personaje != null) {
                            linea += " a ";
                        } else {
                            linea += " = ";
                        }
                        break;
                    default:
                        if (this._tablero[i][y].personaje != null) {
                            linea += " a ";
                        } else {
                            linea += "  ";
                        }
                        break;
                }
                linea += "|";
            }
            console.log(linea);
        }
    }

}

module.exports = Tablero;