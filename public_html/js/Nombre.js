/** 
 * @description Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @version 1.0
 * Date de la dernière modification : 09/04/2013
 * @author Alassane KANE
 */
/**
 * @description Cette classe servira à manipuler les opérandes des opérations.
 * @param {type} valeur
 * @returns {Nombre}
 */
function Nombre(valeur) {

    var valeur = valeur;
    if (isInt(valeur)) {
        var partieEntiere = convertionStringEnTableau(String(valeur));
        var partieDecimale = [];

    } else {
        var partieEntiere = convertionStringEnTableau(String(valeur).split(".")[0]);
        var partieDecimale = convertionStringEnTableau(String(valeur).split(".")[1]);

    }
    ;

    var longueurValeur = partieEntiere.length + partieDecimale.length;

    /**
     * 
     * @returns {Boolean}
     */
    this.isEmpty = function isEmpty() {
        if (valeur === null || valeur === "" || valeur === "undefined") {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 
     * @returns {float or int}
     */
    this.getValeur = function getValeur() {
        return valeur;
    };
    /**
     * 
     * @returns {Array|tableau}
     */
    this.getPartieEntiere = function getPartieEntiere() {
        return partieEntiere;
    };
    /**
     * 
     * @param {type} indice
     * @returns {Number}
     */
    this.getPartieEntiereByIndice = function getPartieEntiereByIndice(indice) {
        if (partieEntiere[indice]) {
            return partieEntiere[indice];
        } else {
            return parseInt(0);
        }
    };
    /**
     * 
     * @returns {Array|tableau}
     */
    this.getPartieDecimale = function getPartieDecimale() {
        return partieDecimale;
    };
    /**
     * 
     * @param {type} indice
     * @returns {Number}
     */
    this.getPartieDecimaleByIndice = function getPartieDecimaleByIndice(indice) {
        if (partieDecimale[indice]) {
            return partieDecimale[indice];
        } else {
            return parseInt(0);
        }

    };
    this.setPartieEntiere = function setPartieEntiere(valeur) {
        partieEntiere.push(valeur);
    }
    this.setPartieEntiereByIndice = function setPartieEntiereByIndice(indice, valeur) {
        if (partieEntiere[indice]) {
            partieEntiere[indice] = valeur;
        } else {
            partieEntiere[indice] = parseInt(valeur)
        }

    }

    this.setPartieDecimale = function setPartieDecimale(valeur) {
        partieDecimale.push(valeur);

    }
    this.setPartieDecimaleByIndice = function setPartieDecimaleByIndice(indice, valeur) {
        if (partieDecimale[indice]) {
            partieDecimale[indice] = parseInt(valeur);

        } else {
            partieDecimale[indice] = parseInt(valeur)
        }
    }
    /**
     * 
     * @returns {int}
     */
    this.getLongueurValeur = function getLongueurValeur() {
        return longueurValeur;
    };

    this.infos = function infos() {
        return "valeur : " + valeur + "<br>" +
                "partieEntiere : " + partieEntiere + "<br>" +
                "partieDecimal : " + partieDecimale + "<br>" +
                "longueur : " + longueurValeur + "<br>";

    };

}
/**
 * @description Convertie une chaine de caractère en tableur
 * @param {type} valeur
 * @returns {Array}
 */
function convertionStringEnTableau(valeur) {

    var tableau = [];
    var i;
    for (i = 0; i < valeur.length; i++) {
        tableau.push(parseInt(valeur[i]));
    }

    return tableau;
}
;
/**
 * @description Vérifie que le nombre est un entier
 * @param {type} nombre
 * @returns {Boolean}
 */
function isInt(nombre) {
    if ((parseFloat(nombre) === parseInt(nombre)) && !isNaN(nombre)) {
        return true;
    } else {
        return false;
    }
}
;




