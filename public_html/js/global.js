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
function getFileConfig() {
    var xhr = getXMLHttpRequest();
    var config;
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "./config/config.json", false);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            config = xhr.responseText;
        }
    };
    xhr.send(null);
    return JSON.parse(config)
}




