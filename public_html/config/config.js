$(document).ready(function() {


    chargementContenuePage();
    //
    var divSelect = $("#divChoixCouleur").children("div#A");
    var svgDuDivSelect = divSelect.children("svg#listeCouleurSVG");
    var couleurSelectionne = svgDuDivSelect.children("rect#active");

    couleurSelectionne.attr("id", "active");
    couleurSelectionne.attr("stroke-opacity", "5");
    couleurSelectionne.attr("stroke-width", "2");
    if (couleurSelectionne.attr("fill") == "#000000") {
        couleurSelectionne.attr("stroke", "red");
    } else {
        couleurSelectionne.attr("stroke", "black");
    }
    var codeHex = couleurSelectionne.attr("fill").replace("#", "");
    var codeRgb = hex2Rgb(codeHex);
    divSelect.children("p").children("span#codeRGBA").html("rgb(" + codeRgb.r + "," + codeRgb.g + "," + codeRgb.b + ")");
    divSelect.children("p").children("span#codeHTML").html(codeHex);
    $("#CouleurSelectionne").attr("fill", "#" + codeHex);

    //
    $("#choixCouleur").children("li").children("a").on("click", function() {
        var iDdivSelect = $(this).attr("href");
        divSelect = $("#divChoixCouleur").children("div" + iDdivSelect);
        svgDuDivSelect = divSelect.children("svg#listeCouleurSVG");

        var couleurSelectionne = svgDuDivSelect.children("rect#active");
        couleurSelectionne.attr("id", "active");
        couleurSelectionne.attr("stroke-opacity", "5");
        couleurSelectionne.attr("stroke-width", "2");
        if (couleurSelectionne.attr("fill") == "#000000") {
            couleurSelectionne.attr("stroke", "red");
        } else {
            couleurSelectionne.attr("stroke", "black");
        }
        var codeHex = couleurSelectionne.attr("fill").replace("#", "");
        var codeRgb = hex2Rgb(codeHex);
        divSelect.children("p").children("span#codeRGBA").html("rgb(" + codeRgb.r + "," + codeRgb.g + "," + codeRgb.b + ")");
        divSelect.children("p").children("span#codeHTML").html(codeHex);
        $("#CouleurSelectionne").attr("fill", "#" + codeHex);

        svgDuDivSelect.children("rect").on("click", function() {

            svgDuDivSelect.children("rect").each(function() {
                $(this).removeAttr("stroke");
                $(this).removeAttr("stroke-width");
                $(this).removeAttr("stroke-opacity");
                $(this).removeAttr("id");
            });
            $(this).attr("id", "active");
            $(this).attr("stroke-opacity", "5");
            $(this).attr("stroke-width", "2");
            $(this).attr("stroke", "black");
            if ($(this).attr("fill") == "#000000") {
                $(this).attr("stroke", "red");
            } else {
                $(this).attr("stroke", "black");
            }
            var codeHex = $(this).attr("fill").replace("#", "");
            var codeRgb = hex2Rgb(codeHex);
            divSelect.children("p").children("span#codeRGBA").html("rgb(" + codeRgb.r + "," + codeRgb.g + "," + codeRgb.b + ")");
            divSelect.children("p").children("span#codeHTML").html(codeHex);
            $("#CouleurSelectionne").attr("fill", "#" + codeHex);
        });

    });

    //
    svgDuDivSelect.children("rect").on("click", function() {

        svgDuDivSelect.children("rect").each(function() {
            $(this).removeAttr("stroke");
            $(this).removeAttr("stroke-width");
            $(this).removeAttr("stroke-opacity");
            $(this).removeAttr("id");
        });
        $(this).attr("id", "active");
        $(this).attr("stroke-opacity", "5");
        $(this).attr("stroke-width", "1.5");
        $(this).attr("stroke", "black");
        var codeHex = $(this).attr("fill").replace("#", "");
        var codeRgb = hex2Rgb(codeHex);
        divSelect.children("p").children("span#codeRGBA").html("rgb(" + codeRgb.r + "," + codeRgb.g + "," + codeRgb.b + ")");
        divSelect.children("p").children("span#codeHTML").html(codeHex);
        $("#CouleurSelectionne").attr("fill", "#" + codeHex);
    });

    //
    $("#enregistrerCouleur").on("click", function() {
        enregistrementConfiguration("couleur");
    });
    $("#enregistrerTaille").on("click", function() {
        enregistrementConfiguration("taille");
    });
    $("#enregistrerRetenueObligatoire").on("click", function() {
        enregistrementConfiguration("retenueObligatoire");
    });
});
/**
 * @type Array
 */
var hexDigits = new Array
        ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
/**
 * 
 * @param {type} x
 * @returns {String|@exp;@call;isNaN}
 */
function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

/**
 * 
 * @param {type} hex
 * @returns {hex2Rgb.result}
 */
function hex2Rgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
/**
 * 
 * @param {type} rgb
 * @returns {String}
 */
function rgb2hex(rgb) {
    var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
/**
 * 
 * @param {type} r
 * @param {type} g
 * @param {type} b
 * @param {type} a
 * @returns {Number}
 */
function rgbaConvert(r, g, b, a) {
    if (r > 255 || g > 255 || b > 255 || a > 255)
        throw "Invalid color component";
    return ((r << 32) | (g << 16) | (b << 8) | a).toString(16);
}
/**
 * 
 * @param {type} rgba
 * @returns {Number}
 */
function rgba2hex(rgba) {
    var hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    rgba = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.\d+)\)$/);
    return rgbaConvert(rgba[0], rgba[1], rgba[2], rgba[3]);
}
/**
 * 
 * @param {type} hex
 * @param {type} opacity
 * @returns {String}
 */
function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return result;
}
/**
 * 
 * @type type
 */
var formaConfig = {
    "name": "config",
    "param": {
        "couleur": {
            "couleurMarge": "",
            "couleurAvantVirgule": "",
            "couleurApresVirgule": "",
            "couleurVirgule": "",
            "couleurRetenue": "",
            "couleurResultat": "",
            "couleurFondAfficherResultat": "",
            "couleurTextAfficherResultat": "",
            "couleurFondDesChampsDestineAuReponse": ""
        },
        "cellule": {
            "tailleCellule": "",
            "tailleContour": ""
        },
        "correction": {
            "retenueObligatoire": ""
        }
    }
};

/**
 * 
 * @returns {undefined}
 */
function chargementContenuePage() {
    $.ajax({
        type: 'GET', // Le type de ma requete
        url: './config/config2.js', // L'url vers laquelle la requete sera envoyee
        async: false,
        datatype: "script",
        success: function(data) {
			data = data.replace("var donnees_json = '","");
			data = data.replace(/\\/g,"");
			data = data.replace("';","");
			data = JSON.parse(data);
            formaConfig = data;
			
            for (key in data.param.couleur) {
                if (data.param.couleur[key][0] == "r") {
                    rbga = data.param.couleur[key];
                    selectionDivCouleur(String(key), "#" + rgba2hex(rbga));
                }
                if (data.param.couleur[key][0] == "#") {
                    selectionDivCouleur(String(key), data.param.couleur[key]);
                }
            }
            $("#tailleCellule_" + String(data.param.cellule.tailleCellule)).attr("checked", "checked");
            $("#tailleContour_" + String(data.param.cellule.tailleContour)).attr("checked", "checked");

            if (data.param.correction.retenueObligatoire) {
                $("#retenueObligatoire").attr("checked", "checked");
            } else {
                $("#retenueObligatoire").removeAttr("checked");
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Une erreur s'est produite lors de la requete
        }
    });
}
;
function selectionDivCouleur(div, couleur) {
    var choixCouleur = $("#choixCouleur");
    choixCouleur.children("li").each(function() {

        href = $(this).children("a").attr("href");
        id = $(this).children("a").attr("id");
        if (div == id) {
            div = $("#divChoixCouleur").children("div" + href);
            div.children("svg#listeCouleurSVG").children("rect").each(function() {
                if ($(this).attr("fill") == couleur) {
                    $(this).attr("id", "active");
                } else {
                    $(this).remove("id");
                }
            });
        }
    });
}
;

function enregistrementConfiguration(zone) {
    var zoneEnregister;
    var idZone;
    if (zone == "couleur") {
        zoneEnregister = "couleurs";
        idZone = "zoneCouleur";
        var divChoixVouleur = $("#divChoixCouleur");
        divChoixVouleur.children("div").each(function() {
            id = $(this).attr("id");
            paramCouleur = $("#choixCouleur").children("li#" + id + id).children("a").attr("id");
            couleurSelectEnHex = $(this).children("svg#listeCouleurSVG").children("rect#active").attr("fill");
            if (formaConfig.param.couleur[paramCouleur]) {
                if (formaConfig.param.couleur[paramCouleur][0] == "r") {
                    formaConfig.param.couleur[paramCouleur] = convertHex(couleurSelectEnHex, 20);
                }
                if (formaConfig.param.couleur[paramCouleur][0] == "#") {
                    formaConfig.param.couleur[paramCouleur] = couleurSelectEnHex;
                }
            }
        });

    }
    if (zone == "taille") {
        zoneEnregister = "tailles";
        idZone = "zoneTaille";
        var divChoixTailleCellule = $("#tailleCellule");
        tailleCellule = divChoixTailleCellule.find("input:checked").val();
        if (tailleCellule) {
            formaConfig.param.cellule.tailleCellule = parseInt(tailleCellule);
        }
        var divChoixTailleContour = $("#tailleContour");
        tailleContour = divChoixTailleContour.find("input:checked").val();
        if (tailleContour) {
            formaConfig.param.cellule.tailleContour = parseInt(tailleContour);
        }
    }
    if (zone == "retenueObligatoire") {
        idZone = "zoneCorrection";
        zoneEnregister = "paramètres de correction"
        var inputRetenueObligatoir = $("#retenueObligatoire");
        var retenueObligatoire;
        if (inputRetenueObligatoir.is(":checked")) {
            retenueObligatoire = true;
        } else {
            retenueObligatoire = false;
        }
        formaConfig.param.correction.retenueObligatoire = retenueObligatoire;
    }
	
    $.ajax({
        type: 'POST', // Le type de ma requete
        url: './config/config.php', // L'url vers laquelle la requete sera envoyee
        data: "configuration=" + JSON.stringify(formaConfig),
        success: function(data) {
			console.log("appel de php");
            if (data.reponse == "success") {
                var message = '<div class="alert alert-success">' +
                        '<button type="button" class="close" data-dismiss="alert">×</button>' +
                        '<strong>Succes!</strong> L\'enregistrement des .' + zoneEnregister + ' a été pris en compte!'+
                '</div>';
                $("#" + idZone).html(" ");
                $("#" + idZone).html(message);
            };
            if (data.reponse == "error") {
                var message = '<div class="alert alert-error">' +
                        '<button type="button" class="close" data-dismiss="alert">×</button>' +
                        '<strong>Erreur!</strong> L\'enregistrement des .' + zoneEnregister + ' n\'a pas été pris en compte!'+
                '</div>';
                $("#" + idZone).html(" ");
                $("#" + idZone).html(message);
            };
        },
        error: function(jqXHR, textStatus, errorThrown) {
			console.log('faute php');
            // Une erreur s'est produite lors de la requete
            var message = '<div class="alert alert-error">' +
                        '<button type="button" class="close" data-dismiss="alert">×</button>' +
                        '<strong>Erreur!</strong> jqXHR : '+jqXHR+', textStatus :'+textStatus+', errorThrown: '+errorThrown+
                '</div>';
                $("#" + idZone).html(" ");
                $("#" + idZone).html(message);
        }
    });
}



