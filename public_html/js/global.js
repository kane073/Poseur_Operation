/** 
 * @fileOverview Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @version 1.0
 * @author Alassane KANE
 */

/**
 * 
 * @returns {XMLHttpRequest}
 */
function getXMLHttpRequest() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}
/**
 * 
 * @type data
 */
var configuration;
/**
 * 
 * @param {type} callback
 * @returns {undefined}
 */
function getFileConfig(callback) {
    var xhr = getXMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "./config/config.json", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}
/**
 * 
 * @param {type} data
 * @returns {undefined}
 */
function LireConfig(data) {
    if (data) {
        configuration = JSON.parse(data);
        if (configuration) {
            var grille = new Grillage("operation",configuration);
            var addition = new Addition(940, 14, 199);
            addition.resoudreAddition();
            console.log(addition.getRetenues());
            console.log(addition.getResultat().getPartieEntiere(), addition.getResultat().getPartieDecimale());
            var textEnonce = "Résoudre l'addition en spécifiant les retenues";

            grille.poserOparationAddition(addition,textEnonce);
        }
    }
}

/**
 * 
 */
getFileConfig(LireConfig);




