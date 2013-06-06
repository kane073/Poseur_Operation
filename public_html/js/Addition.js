/** 
 * @fileOverview Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @version 1.0
 * @author Alassane KANE, Tenfei Zhai, Corto Carde
 */
/**
 * @class  Cette classe servira à créer des opérations de type addition
 * @constructor 
 * @argument [Nombre,Nombre,...,Nombre] Elle prend en paramètre une liste d'élement type Nombre
 * @returns {Addition}
 */
function Addition() {
    /**
     * 
     * @type arguments
     */
    var listArgument = arguments;
    /**
     * @private
     * @type Array
     */
    var operande = [];
    /**
     * @private
     * @type Array
     */
    var retenues = [0];
    /**
     * @private
     * @type Nombre
     */
    var resultat = new Nombre(0);

    var lgMaxPartieEntiere = 0;
    var lgMaxPartieDecimale = 0;

    /**
     * @private
     * @description Crèe des types Nombres et les mets dans l'atribut operande
     */
    function remplissageOperande() {
        if (listArgument.length > 0) {
            var i = 0;
            for (i = 0; i < listArgument.length; i++) {
                operande.push(new Nombre(listArgument[i]));
            }
        } else {
            alert("Erreur, il n'y a pas d'argument!");
        }
    }
    ;
    remplissageOperande();

    /**
     * @private
     * @description Vérifie que le nombre d'argument passé en paramètre est compris entre 2 et 10
     * @returns {Boolean}
     */
    function verifieNumbreArgument() {
        if (listArgument.length >= 2 && listArgument.length <= 7) {
            return true;
        } else {
            alert("Le nombre d'opérande doit étre compris entre 2 et 10.");
            return false;
        }
    }
    ;
    /**
     * @private
     * @description Verifie que chaque argument est compris entre 1 et 18 chiffre
     * @returns {Boolean}
     */
    function verifieLongueurDeChaqueArgument() {
        var i = 0;
        var reponse = true;
        while (i < listArgument.length && reponse === true) {
            if (operande[i].getLongueurValeur() > 15 || operande[i].getLongueurValeur() < 1) {
                reponse = false;
                alert("L'un des arguments est supérieur à 15 caractères!");
            }
            i++;
        }
        return reponse;
    }
    ;
    /**
     * @private
     * @description 
     * @requires listArgument, operande
     * @returns {integer}
     */
    function longueurMaxPartieEntiere() {
        var longueurMax = 0;
        if (listArgument.length > 0) {
            for (var i = 0; i < operande.length; i++) {
                if (operande[i].getPartieEntiere().length > longueurMax) {
                    longueurMax = operande[i].getPartieEntiere().length;
                }
            }
        }
        lgMaxPartieEntiere = longueurMax;
        return longueurMax;
    }
    /**
     * @private
     * @description 
     * @requires listArgument, operande
     * @returns {integer}
     */
    function longueurMaxPartieDecimale() {
        var longueurMax = 0;
        if (listArgument.length > 0) {
            for (i = 0; i < operande.length; i++) {
                if (operande[i].getPartieDecimale().length >= longueurMax) {
                    longueurMax = operande[i].getPartieDecimale().length;
                }
            }
        }
        lgMaxPartieDecimale = longueurMax;
        return longueurMax;
    }
    if (verifieLongueurDeChaqueArgument() && verifieNumbreArgument()) {

        this.isEmpty = function isEmpty() {

        };
        /**
         * @public
         * @description text 
         * @requires operande
         */
        this.resoudreAddition = function resoudreAddition() {

            var somme = 0;
            for (var i = 0; i < operande.length; i++) {
                somme = operande[i].getValeur() + somme;
            }
            resultat = new Nombre(somme);

            var maxPartieDecimale = longueurMaxPartieDecimale();
            var positionVirgule = maxPartieDecimale;
            var tabOperande = [];
            var tabTemporaire = [];
            var tabOperandeString = [];
            for (var key in operande) {
                tabTemporaire.push(operande[key].getValeur());
            }
            tabTemporaire.sort();
            for (var key in tabTemporaire) {
                tabOperande.push(new Nombre(tabTemporaire[key]));
                var tailleNombre = tabOperande[key].getPartieDecimale().length;
                if (maxPartieDecimale > tailleNombre) {
                    for (var i = 0; i < (maxPartieDecimale - tailleNombre); i++) {
                        tabOperande[key].setPartieDecimale(0);
                    }
                }
                tabOperandeString.push(String(tabOperande[key].getValeur()).split(".")[0]);
                if (maxPartieDecimale != 0) {
                    for (var key2 in tabOperande[key].getPartieDecimale()) {
                        tabOperandeString[key] = tabOperandeString[key] + tabOperande[key].getPartieDecimale()[key2];
                    }
                }
            }
            var C = [];
            var indice = 0;
            var retenue = 0;
            var objRetenue = [];
            var sommeTmp = 0;
            while (indice < tabOperandeString[0].length) {
                for (var j = 0; j < tabOperandeString.length; j++) {
                    sommeTmp = parseInt((tabOperandeString[j][tabOperandeString[j].length - 1 - indice])) + sommeTmp;
                }
                C[indice] = sommeTmp + retenue;
                objRetenue[indice] = retenue;
                retenue = parseInt(C[indice] / 10);
                C[indice] = C[indice] % 10;
                indice++;
                sommeTmp = 0;
            }
            for (var i = 1; i < tabOperande.length; i++) {
                while (indice < tabOperandeString[i].length) {
                    for (var j = i; j < tabOperandeString.length; j++) {
                        sommeTmp = parseInt((tabOperandeString[j][tabOperandeString[j].length - 1 - indice])) + sommeTmp;
                    }
                    C[indice] = sommeTmp + retenue;
                    objRetenue[indice] = retenue;
                    retenue = parseInt(C[indice] / 10);
                    C[indice] = C[indice] % 10;
                    indice++;
                    sommeTmp = 0;
                }
            }
            if (retenue > 0) {
                C[indice] = retenue;
                objRetenue[indice] = retenue;
            }
            var tableauRetenue = [];
            for (var i = 0; i < objRetenue.length; i++) {
                if (i == positionVirgule - 1) {
                    tableauRetenue.push(objRetenue[i]);
                    tableauRetenue.push(" ");
                } else {
                    tableauRetenue.push(objRetenue[i]);
                }
            }

            retenues = tableauRetenue.reverse();
        };

        /**
         * @public
         * @description text
         * @returns {Nombre}
         */
        this.getResultat = function getResultat() {
            return resultat;
        };
        /**
         * @public
         * @description text
         * @returns {Array}
         */
        this.getRetenues = function getRetenues() {
            return retenues;
        };
        /**
         * @public
         * @description text
         * @returns {Array}
         */
        this.getOperande = function getOperande() {
            return operande;
        };
        /**
         * @public
         * @description text
         * @returns lgMaxPartieEntiere
         */
        this.getLgMaxPartieEntiere = function getLgMaxPartieEntiere() {
            return lgMaxPartieEntiere;
        };
        /**
         * @public
         * @description text
         * @returns lgMaxPartieDecimale
         */
        this.getLgMaxPartieDecimale = function getLgMaxPartieDecimale() {
            return lgMaxPartieDecimale;
        };
    }
}