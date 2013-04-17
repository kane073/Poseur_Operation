/** 
 * @description Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @version 1.0
 * Date de la dernière modification : 09/04/2013
 * @author Alassane KANE, Tenfei Zhai
 */
/**
 * @description Cette classe servira à créer des opérations de type addition
 * @returns {Addition}
 */
function Addition() {
    var listArgument = arguments;
    var operande = [];
    var retenues = [0];
    var resultat = new Nombre(0);

    /**
     * Crèe des types Nombres et les mets dans l'atribut operande
     * @returns {nothing}
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
     * Vérifie que le nombre d'argument passé en paramètre est compris entre 2 et 10
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
     * Verifie que chaque argument est compris entre 1 et 18 chiffre
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

    function longueurMaxPartieEntiere() {
        var longueurMax = 0;
        if (listArgument.length > 0) {
            for (i = 0; i < operande.length; i++) {
                if (operande[i].getPartieEntiere().length > longueurMax) {
                    longueurMax = operande[i].getPartieEntiere().length;
                }
            }
        }
        return longueurMax;
    }
    function longueurMaxPartieDecimale() {
        var longueurMax = 0;
        if (listArgument.length > 0) {
            for (i = 0; i < operande.length; i++) {
                if (operande[i].getPartieDecimale().length >= longueurMax) {
                    longueurMax = operande[i].getPartieDecimale().length;
                }
            }
        }
        return longueurMax;
    }
    if (verifieLongueurDeChaqueArgument() && verifieNumbreArgument()) {
        this.isEmpty = function isEmpty() {

        };

        this.addition = function addition() {

        };

        this.resoudreAddition = function resoudreAddition() {
            var MaxPartieEntiere = longueurMaxPartieEntiere();
            var MaxPartieDecimale = longueurMaxPartieDecimale();
            var matriceOprerande = [];

            for (i = 0; i < operande.length; i++) {
                var tmpPartieDecimal = [];
                if (operande[i].getPartieDecimale().length < MaxPartieDecimale) {
                    for (j = 0; j < MaxPartieDecimale; j++) {
                        if (j < operande[i].getPartieDecimale().length) {
                            tmpPartieDecimal.push(parseInt(operande[i].getPartieDecimale()[j]));
                        } else {
                            tmpPartieDecimal.push(0);
                        }
                    }
                }
                else {
                    tmpPartieDecimal = operande[i].getPartieDecimale();
                }
                var tmpPartieEntiere = [];
                if (operande[i].getPartieEntiere().length < MaxPartieEntiere) {
                    for (j = 0; j < MaxPartieEntiere; j++) {
                        if (j < operande[i].getPartieEntiere().length) {
                            tmpPartieEntiere.push(parseInt(operande[i].getPartieEntiere()[j]));
                        } else {
                            tmpPartieEntiere.unshift(0);
                        }
                    }
                } else {
                    tmpPartieEntiere = operande[i].getPartieEntiere();
                }
                matriceOprerande.push({entiere: tmpPartieEntiere, decimal: tmpPartieDecimal});
            }

            var tmpSomme = [];
            var tmp = 0;
            for (j = MaxPartieDecimale - 1; j >= 0; j--) {
                tmp = 0;
                for (i = 0; i < matriceOprerande.length; i++) {
                    tmp = tmp + matriceOprerande[i].decimal[j];
                }
                tmpSomme.unshift(tmp);
            }
            var taille;
            var p;
            var f;
            var diff = 0;
            for (i = tmpSomme.length - 1; i >= 0; i--) {
                taille = String(tmpSomme[i]).length;
                if (taille > 1) {
                    p = String(tmpSomme[i])[taille - 1];
                    f = String(tmpSomme[i]).substring(0, taille - 1);
                    tmpSomme[i] = parseInt(p);
                    if (i <= 0) {
                        retenues.unshift("");
                        tmpSomme.unshift(".");
                        tmpSomme.unshift(parseInt(f));
                        retenues.unshift(parseInt(f));
                    } else {
                        tmpSomme[i - 1] = tmpSomme[i - 1] + parseInt(f);
                        retenues.unshift(parseInt(f));
                    }
                } else {
                    retenues.unshift(0);
                }
            }
            if (tmpSomme.length > 0) {
                diff = tmpSomme.length - 1;
            } else {
                diff;
            }
            
            var retenueDepart = 0;
            if (retenues[0]) {
                retenueDepart = retenues[0];
            }

            for (j = MaxPartieEntiere - 1; j >= 0; j--) {
                tmp = 0;
                for (i = 0; i < matriceOprerande.length; i++) {
                    tmp = tmp + matriceOprerande[i].entiere[j];
                }
                if (j === MaxPartieEntiere - 1) {
                    if (tmpSomme[0]) {
                        tmpSomme[0] = tmp + retenueDepart;
                    } else {
                        tmpSomme.unshift(tmp + retenueDepart);
                    }
                } else {
                    tmpSomme.unshift(tmp);
                }
            }
            
            for (i = tmpSomme.length - diff - 1; i >= 0; i--) {
                taille = String(tmpSomme[i]).length;
                if (taille > 1) {
                    p = String(tmpSomme[i])[taille - 1];
                    f = String(tmpSomme[i]).substring(0, taille - 1);
                    tmpSomme[i] = parseInt(p);
                    if (f.length <= 1) {
                        if (i <= 0) {
                            tmpSomme.unshift(parseInt(f));
                            retenues.unshift(parseInt(f));
                        } else {
                            tmpSomme[i - 1] = tmpSomme[i - 1] + parseInt(f);
                            retenues.unshift(parseInt(f));
                        }
                    } else {
                        sf = f.substring(0, f.length - 1);
                        if (i <= 0) {
                            tmpSomme.unshift(parseInt(f));
                            retenues.unshift(parseInt(f));
                            if (f.length > 1) {
                                for (z = 0; z < f.length; z++) {
                                    if (tmpSomme[i]) {
                                        tmpSomme[i] = parseInt(f[z + f.length - 1]);
                                    } else {
                                        tmpSomme.unshift(parseInt(f[f.length - z - 1]));
                                        retenues.unshift(parseInt(f[f.length - z - 1]));
                                    }
                                }
                            }
                        } else {
                            tmpSomme[i - 1] = tmpSomme[i - 1] + parseInt(f);
                            retenues.unshift(parseInt(f));
                        }
                    }
                } else {
                    if (i !== 0) {
                        retenues.unshift(0);
                    }
                }
            }
            
            var valCreateResultat="";
            for(i=0;i<tmpSomme.length;i++){
                valCreateResultat+=String(tmpSomme[i]);
            }
            resultat = new Nombre(parseFloat(valCreateResultat));

        };

        /**
         * 
         * @returns {Nombre}
         */
        this.getResultat = function getResultat() {
            return resultat;
        };
        this.getRetenues = function getRetenues() {
            return retenues;
        };
        /**
         * 
         * @returns {Array}
         */
        this.getOperande = function getOperande() {
            return operande;
        };

    }
}



