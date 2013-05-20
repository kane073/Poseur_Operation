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
         * @description Contient la partie entière du nombre
         * @type Array
         */
        var partieEntiere = convertionStringEnTableau(String(valeur));
        /**
         * @private
         * @description Contient la partie décimal du nombre
         * @type Array
         */
        var partieDecimale = [];
       
    } else {
        var partieEntiere = convertionStringEnTableau(String(valeur).split(".")[0]);
        var partieDecimale = convertionStringEnTableau(String(valeur).split(".")[1]);
        
    }
    ;
    /**
     * @private
     * @description La longueur du nombre (sans la virgule)
     * @type {integer}
     */
    var longueurValeur = partieEntiere.length + partieDecimale.length;

    /**
     * @public
     * @description Vérifie si le nombre est vide
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
     * @description Renvoie la valeur du nombre
     * @returns {float or int}
     */
    this.getValeur = function getValeur() {
        return valeur;
    };
    /**
     * @public
     * @description Renvoie la partie entière
     * @returns {Array|tableau}
     */
    this.getPartieEntiere = function getPartieEntiere() {
        return partieEntiere;
    };
    /**
     * @public
     * @description Renvoie le chiffre de la partie entière à l'indice donné
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
     * @description Renvoie a partie décimale
     * @returns {Array}
     */
    this.getPartieDecimale = function getPartieDecimale() {
        return partieDecimale;
    };
    /**
     * @public
     * @description Renvoie le chiffre de la partie décimale à l'indice donné
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
     * @description Modifie la valeur de la partie entière
     * @param {integer} valeur
     * @returns {undefined}
     */
    this.setPartieEntiere = function setPartieEntiere(valeur) {
        partieEntiere.push(valeur);
    }
    /**
     * @public
     * @description Modifie le chiffre de la partie entière à l'indice donné
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
     * @description Modifie la valeur de la partie décimale
     * @param {type} valeur
     * @returns {undefined}
     */
    this.setPartieDecimale = function setPartieDecimale(valeur) {
        partieDecimale.push(valeur);

    };
    /**
     * @public
     * @description Midifie le chiffre de la partie décimale à l'indice donné
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
     * @description Renvoie la taille du nombre
     * @returns {int}
     */
    this.getLongueurValeur = function getLongueurValeur() {
        return longueurValeur;
    };

    /**
     * @public
     * @description Renvoie une description du nombre
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
 * @description Convertit une chaine de caractère en tableau
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




