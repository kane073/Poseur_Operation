/** 
 * @fileOverview Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @version 1.0
 * @author Alassane KANE
 */
/**
 * @class  Cette classe servira à manipuler les opérandes des opérations.
 * @constructor 
 * @argument {float} valeur c'est la valeur passer en paramêtre
 * @returns {Nombre}
 */
function Nombre(valeur) {
    /**
     * @private
     * @type float
     */
    var valeur = valeur;

    if (isInt(valeur)) {
        /**
         * @private
         * @description text
         * @type Array
         */
        var partieEntiere = convertionStringEnTableau(String(valeur));
        /**
         * @private
         * @description text
         * @type Array
         */
        var partieDecimale = [];
        console.log(String(valeur).split(".")[0]);
    } else {
        var partieEntiere = convertionStringEnTableau(String(valeur).split(".")[0]);
        var partieDecimale = convertionStringEnTableau(String(valeur).split(".")[1]);
        
    }
    ;
    /**
     * @private
     * @description text
     * @type {integer}
     */
    var longueurValeur = partieEntiere.length + partieDecimale.length;

    /**
     * @public
     * @description text
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
     * @public
     * @description text
     * @returns {float or int}
     */
    this.getValeur = function getValeur() {
        return valeur;
    };
    /**
     * @public
     * @description text
     * @returns {Array|tableau}
     */
    this.getPartieEntiere = function getPartieEntiere() {
        return partieEntiere;
    };
    /**
     * @public
     * @description text
     * @param {integer} indice
     * @returns {Array}
     */
    this.getPartieEntiereByIndice = function getPartieEntiereByIndice(indice) {
        if (partieEntiere[indice]) {
            return partieEntiere[indice];
        } else {
            return parseInt(0);
        }
    };
    /**
     * @public
     * @description text
     * @returns {Array}
     */
    this.getPartieDecimale = function getPartieDecimale() {
        return partieDecimale;
    };
    /**
     * @public
     * @description text
     * @param {integer} indice
     * @returns {Number}
     */
    this.getPartieDecimaleByIndice = function getPartieDecimaleByIndice(indice) {
        if (partieDecimale[indice]) {
            return partieDecimale[indice];
        } else {
            return parseInt(0);
        }

    };
    /**
     * @public
     * @description text
     * @param {integer} valeur
     * @returns {undefined}
     */
    this.setPartieEntiere = function setPartieEntiere(valeur) {
        partieEntiere.push(valeur);
    }
    /**
     * @public
     * @description text
     * @param {integer} indice
     * @param {integer} valeur
     * @returns {undefined}
     */
    this.setPartieEntiereByIndice = function setPartieEntiereByIndice(indice, valeur) {
        if (partieEntiere[indice]) {
            partieEntiere[indice] = valeur;
        } else {
            partieEntiere[indice] = parseInt(valeur);
        }

    };
    /**
     * @public
     * @description text
     * @param {type} valeur
     * @returns {undefined}
     */
    this.setPartieDecimale = function setPartieDecimale(valeur) {
        partieDecimale.push(valeur);

    };
    /**
     * @public
     * @description text
     * @param {type} indice
     * @param {type} valeur
     * @returns {undefined}
     */
    this.setPartieDecimaleByIndice = function setPartieDecimaleByIndice(indice, valeur) {
        if (partieDecimale[indice]) {
            partieDecimale[indice] = parseInt(valeur);

        } else {
            partieDecimale[indice] = parseInt(valeur);
        }
    };
    /**
     * 
     * @returns {int}
     */
    this.getLongueurValeur = function getLongueurValeur() {
        return longueurValeur;
    };

    /**
     * @public
     * @description text
     * @returns {String}
     */
    this.infos = function infos() {
        return "valeur : " + valeur + "<br>" +
                "partieEntiere : " + partieEntiere + "<br>" +
                "partieDecimal : " + partieDecimale + "<br>" +
                "longueur : " + longueurValeur + "<br>";

    };

}
/**
 * @description Convertie une chaine de caractère en tableur
 * @static
 * @param {integer} valeur
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
 * @static
 * @param {integer,float,string} nombre
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




