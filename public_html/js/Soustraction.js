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
function Soustraction() {
    /**
     * 
     * @type arguments
     */
    var listArgument = arguments;
    /**
     * @private
     * @type Nombre
     */
    var operandeSuperieur;
    /**
     * @private
     * @type Nombre
     */
    var operandeInferieur;
    /**
     * @private
     * @type Array
     */
    var retenues = {superieures: [], inferieures: []};
    /**
     * @private
     * @type Nombre
     */
    var resultat = new Nombre(0);

    var lgMaxPartieEntiere = 0;
    var lgMaxPartieDecimale = 0;


    /**
     * @private
     * @description Vérifie que le nombre d'argument passé en paramètre est compris entre 2 et 10
     * @returns {Boolean}
     */
    function verifieNombreArgument() {
        if (listArgument.length == 2) {
            return true;
        } else {
            alert("Le nombre d'opérande doit étre égal à 2");
            return false;
        }
    }


    /**
     * @private
     * @description Crèe des types Nombres et les mets dans l'atribut operande
     */
    function remplissageOperande() {
        if (verifieNombreArgument()) {
            var operande1 = new Nombre(listArgument[0]);
            var operande2 = new Nombre(listArgument[1]);

            if (operande1.getValeur() > operande2.getValeur()) {
                operandeSuperieur = operande1;
                operandeInferieur = operande2;
            } else {
                operandeSuperieur = operande2;
                operandeInferieur = operande1;
            }
        }
    }
    ;
    remplissageOperande();


    function realignementRetenueDesOperandes() {
        tailleSuperieur = operandeSuperieur.getPartieDecimale().length;
        tailleInferieur = operandeInferieur.getPartieDecimale().length;
        if (tailleSuperieur != 0 || tailleInferieur != 0) {
            if (tailleSuperieur < tailleInferieur) {
                for (i = 0; i < (tailleInferieur - tailleSuperieur); i++) {
                    operandeSuperieur.setPartieDecimale(0);
                }
            }
        }
    }
    realignementRetenueDesOperandes();

    /**
     * @private
     * @description Verifie que chaque argument est compris entre 1 et 18 chiffre
     * @returns {Boolean}
     */
    function verifieLongueurDeChaqueArgument() {
        var i = 0;
        var reponse = true;
        if (operandeSuperieur.getLongueurValeur() > 15 || operandeInferieur.getLongueurValeur() < 1) {
            reponse = false;
            alert("L'un des arguments est supérieur à 15 caractères!");
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
            if (operandeSuperieur.getPartieEntiere().length > operandeInferieur.getPartieEntiere().length) {
                longueurMax = operandeSuperieur.getPartieEntiere().length;
            }
            else {
                longueurMax = operandeInferieur.getPartieEntiere().length;
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
            if (operandeSuperieur.getPartieDecimale().length > operandeInferieur.getPartieDecimale().length) {
                longueurMax = operandeSuperieur.getPartieDecimale().length;
            }
            else {
                longueurMax = operandeInferieur.getPartieDecimale().length;
            }
        }
        lgMaxPartieDecimale = longueurMax;
        return longueurMax;
    }


    if (verifieLongueurDeChaqueArgument()) {

        this.isEmpty = function isEmpty() {

        };


        /**
         * @public
         * @description text 
         * @requires operande
         */


        // TODO
        this.resoudreSoustraction = function resoudreSoustraction() {
            var resultatTemp = new Array;

            longueurMaxPartieDecimale();
            longueurMaxPartieEntiere();

            var longueurEntiereSup = operandeSuperieur.getPartieEntiere().length;
            var longueurEntiereInf = operandeInferieur.getPartieEntiere().length;


            retenues.inferieures.unshift(0);

            var i = 0;
            for (i = 0; i < lgMaxPartieDecimale; i++) {
                if (operandeSuperieur.getPartieDecimaleByIndice(lgMaxPartieDecimale - i - 1) >= (operandeInferieur.getPartieDecimaleByIndice(lgMaxPartieDecimale - i - 1) + retenues.inferieures[retenues.inferieures.length - i - 1])) {
                    resultatTemp.unshift(operandeSuperieur.getPartieDecimaleByIndice(lgMaxPartieDecimale - i - 1) - operandeInferieur.getPartieDecimaleByIndice(lgMaxPartieDecimale - i - 1) - retenues.inferieures[retenues.inferieures.length - i - 1]);
                    retenues.superieures.unshift(0);
                    if (i == lgMaxPartieDecimale - 1) {
                        retenues.superieures.unshift(" ");
                        retenues.inferieures.unshift(" ");
                    }
                    retenues.inferieures.unshift(0);
                } else {
                    retenues.superieures.unshift(1);
                    if (i == lgMaxPartieDecimale - 1) {
                        retenues.superieures.unshift(" ");
                        retenues.inferieures.unshift(" ");
                    }
                    retenues.inferieures.unshift(1);
                    resultatTemp.unshift(operandeSuperieur.getPartieDecimaleByIndice(lgMaxPartieDecimale - i - 1) - operandeInferieur.getPartieDecimaleByIndice(lgMaxPartieDecimale - i - 1) - retenues.inferieures[retenues.inferieures.length - i - 1] + 10);
                }
            }
            resultatTemp.unshift(".");

            var shift = (lgMaxPartieDecimale == 0) ? 0 : 1;//Pour le décalage lié à l'espace dans le tableau des retenues

            for (i = 0; i < lgMaxPartieEntiere; i++) {
                if (operandeSuperieur.getPartieEntiereByIndice(longueurEntiereSup - i - 1) >= (operandeInferieur.getPartieEntiereByIndice(longueurEntiereInf - i - 1) + retenues.inferieures[retenues.inferieures.length - i - 1 - shift - lgMaxPartieDecimale])) {
                    resultatTemp.unshift(operandeSuperieur.getPartieEntiereByIndice(longueurEntiereSup - i - 1) - operandeInferieur.getPartieEntiereByIndice(longueurEntiereInf - i - 1) - retenues.inferieures[retenues.inferieures.length - i - 1 - shift - lgMaxPartieDecimale]);
                    if (i != lgMaxPartieEntiere - 1) {
                        retenues.inferieures.unshift(0);
                    }
                    retenues.superieures.unshift(0);
                } else {
                    if (i != lgMaxPartieEntiere - 1) {
                        retenues.inferieures.unshift(1);
                    }
                    retenues.superieures.unshift(1);
                    resultatTemp.unshift(operandeSuperieur.getPartieEntiereByIndice(longueurEntiereSup - i - 1) - retenues.inferieures[retenues.inferieures.length - i - 1 - shift - lgMaxPartieDecimale] - operandeInferieur.getPartieEntiereByIndice(longueurEntiereInf - i - 1) + 10);
                }
            }

            var resultatString = "";
            for (i = 0; i < resultatTemp.length; i++) {
                resultatString += resultatTemp[i];
            }
            resultat = new Nombre(parseFloat(resultatString));

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
            return [operandeSuperieur, operandeInferieur];
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