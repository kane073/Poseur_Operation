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
 * @param {type} callback
 * @returns {undefined}
 */
function getFileConfig() {
	
	var config;
	if(typeof JSON !='undefined'){
		config = JSON.parse(donnees_json);
	}else{
		config = eval('('+donnees_json+')');
	}	
    return config;
}




