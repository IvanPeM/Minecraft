"use strcit";

class Bloque {

    constructor(anterior, superior, diagonal_derecha, diagonal_izquierda) {
        this._terreno;
        this._personaje;

        let porcentaje = Math.round(Math.random() * 100);

        if (superior == "camino" && diagonal_derecha != "camino") {
            if (diagonal_derecha == null) {
                this._terreno = "tierra";
            } else {
                if (porcentaje < 90) {
                    this._terreno = "camino";
                } else {
                    this._terreno = "tierra";
                }
            }
        } else if (superior == "camino" && diagonal_derecha == "camino") {
            this._terreno = "tierra";
        } else if (superior == "tierra" && diagonal_derecha == "camino") {
            this._terreno = "tierra";
        } else if (diagonal_izquierda == "camino" && superior != "camino") {
            this._terreno = "camino";
        } else if (anterior != null && anterior != "tierra") {
            switch (anterior) {
                case "mar":
                    if (porcentaje < 60) {
                        this._terreno = "mar";
                    } else {
                        this._terreno = "tierra";
                    }
                    break;

                case "camino":
                    if (porcentaje < 65) {
                        this._terreno = "camino";
                    } else {
                        this._terreno = "tierra";
                    }
                    break;
            }

        } else if (superior == "mar") {
            if (porcentaje < 60) {
                this._terreno = "mar";
            } else {
                this._terreno = "tierra";
            }
        } else {
            if (porcentaje < 80) {
                this._terreno = "tierra";
            } else if (porcentaje > 80 && porcentaje < 95) {
                this._terreno = "mar";
            } else {
                this._terreno = "camino";
            }
        }
    }

    get terreno(){
        return this._terreno;
    }

    get personaje(){
        return this._personaje;
    }

}

module.exports = Bloque;