/****************************************************************************************************** 
 * @description Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @version 1.0
 * Date de la dernière modification : 14/04/2013
 * @author Alassane KANE
 *******************************************************************************************************/
/********************************************************************************************************
 * @description Cette classe affiche la grille et grère aussi toute les actions faite dans la grille.
 *              Elle servira à afficher les differentes opérations et à les résoudres aussi.
 * 
 * @argument {type} idDiv est le id de l'element div qui va contenir la grille.             
 * @returns {Grillage}
 */
function Grillage(idDiv) {


    /***************************************************************************
     * @description On applique un style au contenaire principal, 
     * @type @exp;document@call;getElementById
     */
    var content = document.getElementById(idDiv);
    var styleContent = "border: 2px solid #000;width: 810px; height: 600px; border:dashed 5px #5cbeff;\n\
                        -moz-border-radius-topleft: 6px;-moz-border-radius-topright:5px;\n\
                        -moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;\n\
                        -webkit-border-top-left-radius:6px;-webkit-border-top-right-radius:5px;\n\
                        -webkit-border-bottom-left-radius:5px;-webkit-border-bottom-right-radius:5px;\n\
                        border-top-left-radius:6px;border-top-right-radius:5px;\n\
                        border-bottom-left-radius:5px;border-bottom-right-radius:5px;";
    content.setAttribute("style", styleContent);

    /*****************************************************************************
     * @description Création du button "Enoncé" qui servira à afficher l'énoncé d'un exercice. 
     * @type @exp;document@call;createElement
     */
    var buttonAfficherResultat = document.createElement("button");
    var styleButtonEnonce = "";
    buttonAfficherResultat.setAttribute("id", "buttonEnonce");
    buttonAfficherResultat.setAttribute("class", "buttonPoseurOperation");
    buttonAfficherResultat.setAttribute("style", styleButtonEnonce);
    buttonAfficherResultat.innerHTML = "Correction";
    content.appendChild(buttonAfficherResultat);

    buttonAfficherResultat.addEventListener('click', function(e) {
        if(!suiviEnCours){
            lancerCorrectionSimple();
        }
    }, false);

    var enonce = document.createElement("div");
    var stylePostie = 'position: absolute; margin-left: -1px; margin-top: 42px;z-index:1';
    enonce.setAttribute("style", stylePostie);
    enonce.setAttribute("id", "enonceAffice");
    content.appendChild(enonce);

    var canvasPosti = document.createElement("canvas");
    canvasPosti.setAttribute("width", 200);
    canvasPosti.setAttribute("height", 200);
    canvasPosti.setAttribute("id", "canvasElementPosti");
    enonce.appendChild(canvasPosti);

    function afficherEnonce(contenuEnonce) {
        var contextPosti = canvasPosti.getContext('2d');
        var imagePosti = new Image(180, 180);
        imagePosti.src = './img/PostIt.svg';
        imagePosti.onload = function() {
            contextPosti.drawImage(imagePosti, 0, 0, imagePosti.width, imagePosti.height);
            contextPosti.lineWidth = 2;
//            contextPosti.strokeStyle = "rgba(35, 70, 237, .8)";
            contextPosti.shadowColor = "rgb(190, 190, 190)";
            contextPosti.shadowOffsetX = 1;
            contextPosti.shadowOffsetY = 1;
            contextPosti.font = "10.5pt sans-serif";
            contextPosti.rotate(-0.05);
            j = 0;
            for (i = 0; i < contenuEnonce.length; i++) {
                textCouper = contenuEnonce.substring(i, i + 23);
                contextPosti.fillText(textCouper, 12, 70 + j);
                i = i + 22;
                j = j + 20;
            }
        };
    }

    var simpleActive = false;
    var suiviActive = false;

    var groupeRadio = document.createElement("p");
    groupeRadio.setAttribute("style", "position: absolute;margin-left: 175px;margin-top: -28px;display:none;");
    groupeRadio.setAttribute("class", "radio-group-choixTypeDeCorrection");
    groupeRadio.setAttribute("id", "choixTypeDeCorrection");
    var simple = document.createElement("input");
    simple.setAttribute("type", "radio");
    simple.setAttribute("name", "typeCorrection");
    simple.setAttribute("value", "correctionSimple");
    simple.setAttribute("id", "correctionSimple");
    var labelSimple = document.createElement("label");
    labelSimple.setAttribute("for", "correctionSimple");
    labelSimple.innerHTML = "Simple";
    var suivi = document.createElement("input");
    suivi.setAttribute("type", "radio");
    suivi.setAttribute("name", "typeCorrection");
    suivi.setAttribute("value", "correctionSuivi");
    suivi.setAttribute("id", "correctionSuivi");
    var labelSuivi = document.createElement("label");
    labelSuivi.setAttribute("for", "correctionSuivi");
    labelSuivi.innerHTML = "Suivi";
    groupeRadio.appendChild(simple);
    groupeRadio.appendChild(labelSimple);
    groupeRadio.appendChild(suivi);
    groupeRadio.appendChild(labelSuivi);
    content.appendChild(groupeRadio);

    var divAffichageTypeCorrection = document.createElement("button");
    var styleAffichageTypeCorrection = 'position: fixed;width: 150px;height: 70px;margin-left: 300px;margin-top: -33px; display:none;';
    divAffichageTypeCorrection.setAttribute("style", styleAffichageTypeCorrection);
    divAffichageTypeCorrection.setAttribute("id", "affichageypeCorrection");

    content.appendChild(divAffichageTypeCorrection);

    suivi.addEventListener('click', function(e) {
        if (suiviActive) {
            simple.checked = false;
        } else {
            suiviActive = true;
            simpleActive = false;
            typeDeCorrection = "Suivi";
            divAffichageTypeCorrection.innerHTML = "Correction: " + typeDeCorrection;
            document.getElementById(idDiv).querySelector("#buttonCorriger").style.display = "none";
            document.getElementById(idDiv).querySelector("#affichageypeCorrection").style.display = "run-in";
            groupeRadio.style.display = "none";
        }
    }, false);

    simple.addEventListener('click', function(e) {
        if (simpleActive) {

        } else {
            suiviActive = false;
            simpleActive = true;
            typeDeCorrection = "Simple";
            divAffichageTypeCorrection.innerHTML = "Correction: " + typeDeCorrection;
            document.getElementById(idDiv).querySelector("#buttonCorriger").style.display = "run-in";
            document.getElementById(idDiv).querySelector("#affichageypeCorrection").style.display = "run-in";
            groupeRadio.style.display = "none";
        }
    }, false);


    /*****************************************************************************
     * @description Création du button "Corriger" qui servira à afficher le Corriger. 
     * @type @exp;document@call;createElement
     */
    var buttonCorrectionSuivi = document.createElement("button");
    var styleButtonCorrectionSuivi = "";
    buttonCorrectionSuivi.setAttribute("id", "buttonCorrectionSuivi");
    buttonCorrectionSuivi.setAttribute("class", "buttonPoseurOperation");
    buttonCorrectionSuivi.setAttribute("style", styleButtonCorrectionSuivi);
    buttonCorrectionSuivi.innerHTML = "Correction suivi";
    content.appendChild(buttonCorrectionSuivi);
    var mySuiviCorrection;
    var suiviEnCours = false;
    buttonCorrectionSuivi.addEventListener('click', function(e) {
        if (!suiviEnCours) {
            buttonCorrectionSuivi.innerHTML = "Lancement...";
        }
        switch (typeOperation) {
            case "addition":
                if (!suiviEnCours) {
                    mySuiviCorrection = setInterval(function() {
                        suiviCorrectionAddition();
                    }, 1000);

                } else {
                    suiviEnCours = false;
                    stropSuiviCorrectionAddition(mySuiviCorrection);
                    buttonCorrectionSuivi.innerHTML = "Correction suivi";
                }
                break;
        }
    }, false);


    /**
     * @description Le div qui contient la bare d'outils cotament les chiffres et les opérateurs
     * @type @exp;document@call;createElement
     */
    var divoutil = document.createElement("div");
    var styleMenu = 'border:inset 5px #5cbeff;-moz-border-radius: 5px;-webkit-border-radius: 5px;\n\
                    border-radius: 5px;z-index: 5;margin-left: 495px;margin-top: -32px;\n\
                    position: absolute;width: 300px;height: 70px;cursor: pointer;';
    divoutil.setAttribute("style", styleMenu);
    divoutil.setAttribute("id", "barreOutil");

    var canvasOutil = document.createElement("canvas");
    canvasOutil.setAttribute("width", "300");
    canvasOutil.setAttribute("height", "70");
    canvasOutil.setAttribute("id", "canvasElementOutil");

    var contextOutils = canvasOutil.getContext('2d');
    var imageOutils = new Image(300, 70);
    imageOutils.src = './img/bareOutil.svg';
    imageOutils.onload = function() {
        contextOutils.drawImage(imageOutils, 0, 0, imageOutils.width, imageOutils.height);
    };

    divoutil.appendChild(canvasOutil);
    content.appendChild(divoutil);

    canvasOutil.onmousedown = function(event) {
        var positionSourcie = getSourisPositionMenuOutils(event);
        var positionBontton = getCoordonneButtonOutils(positionSourcie.x, positionSourcie.y);
        console.log(positionBontton);
        if (coordonneGrilleCourant) {
            if (operationEnCours) {
                switch (positionBontton.type) {
                    case "chiffre":
                        if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {
                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, "black");
                        } else {
                            var message = '<img style="position: absolute;margin-left: -16px;margin-top: -8px;" src=\"./img/icone_erreur.png\"/>\n\
                                            <em style="margin-left: 15px;">Erreur : Vous ne pouvez pas ecrire dans cette zone.<br> Veuillez\n\
                                            ecrire dans les zone autorisé.</em>';
                            var bgcolor = "#FF332F";
                            var textcolor = "#FFFCFB";
                            afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                            dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                            listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                        }

                        break;
                    case "action":
                        if (positionBontton.val === "del") {
                            effacerEcritureUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                        }
                        if (positionBontton.val === "equal") {

                            afficherResultatOperation(typeOperation);
                        }
                        break;
                }
            } else {
                switch (positionBontton.type) {
                    case "chiffre":
                        ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, "black");
                        break;
                    case "action":
                        if (positionBontton.val === "del") {
                            effacerEcritureUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                        }
                        break;

                }
            }
        } else {
            alert("Veuillez selectionner d'abort une cellule");
        }

    };
    /**
     * @description Function pour obtenir les coordonnées dans le div du bare d'outils
     * @param {type} x
     * @param {type} y
     * @returns {Grillage.getCoordonneButtonOutils.Objct(x,y)}
     */
    function getCoordonneButtonOutils(x, y) {
        contextOutils.globalAlpha = 0.5;

        if (y >= 0 && y < 35) {
            if (x >= 0 && x <= 37) {
                //contextOutils.fillRect(0, 0, 37, 35);
                return {x: 0, y: 0, val: "1", type: "chiffre"};
            }
            if (x >= 38 && x <= 74) {
                // contextOutils.fillRect(38, 0, 37, 35);
                return {x: 38, y: 0, val: "2", type: "chiffre"};
            }
            if (x >= 75 && x <= 111) {
                // contextOutils.fillRect(75, 0, 37, 35);
                return {x: 75, y: 0, val: "3", type: "chiffre"};
            }
            if (x >= 112 && x <= 148) {
                //contextOutils.fillRect(112, 0, 37, 35);
                return {x: 112, y: 0, val: "4", type: "chiffre"};
            }
            if (x >= 149 && x <= 186) {
                // contextOutils.fillRect(150, 0, 37, 35);
                return {x: 150, y: 0, val: "5", type: "chiffre"};
            }
            if (x >= 187 && x <= 222) {
                // contextOutils.fillRect(187, 0, 37, 35);
                return {x: 187, y: 0, val: "+", type: "operateur"};
            }
            if (x >= 223 && x <= 259) {
                //contextOutils.fillRect(224, 0, 37, 35);
                return {x: 224, y: 0, val: "*", type: "operateur"};
            }
            if (x >= 260 && x <= 296) {
                // contextOutils.fillRect(261, 0, 37, 35);
                return {x: 261, y: 0, val: "del", type: "action"};
            }
        }
        if (y >= 36 && y <= 72) {
            if (x >= 0 && x <= 37) {
                // contextOutils.fillRect(0, 35, 37, 35);
                return {x: 0, y: 35, val: "6", type: "chiffre"};
            }
            if (x >= 38 && x <= 74) {
                // contextOutils.fillRect(38, 35, 37, 35);
                return {x: 38, y: 35, val: "7", type: "chiffre"};
            }
            if (x >= 75 && x <= 111) {
                // contextOutils.fillRect(75, 35, 37, 35);
                return {x: 75, y: 35, val: "8", type: "chiffre"};
            }
            if (x >= 112 && x <= 148) {
                //  contextOutils.fillRect(112, 35, 37, 35);
                return {x: 112, y: 35, val: "9", type: "chiffre"};
            }
            if (x >= 149 && x <= 186) {
                //contextOutils.fillRect(150, 35, 37, 35);
                return {x: 150, y: 35, val: "0", type: "chiffre"};
            }
            if (x >= 187 && x <= 222) {
                // contextOutils.fillRect(187, 35, 37, 35);
                return {x: 187, y: 35, val: "-", type: "operateur"};
            }
            if (x >= 223 && x <= 259) {
                // contextOutils.fillRect(224, 35, 37, 35);
                return {x: 224, y: 35, val: "/", type: "operateur"};
            }
            if (x >= 260 && x <= 296) {
                // contextOutils.fillRect(261, 35, 37, 35);
                return {x: 261, y: 35, val: "equal", type: "action"};
            }
        }
    }
    function effaceOpaciteMenuOutil(x, y) {
        contextOutils.globalAlpha = 1;
        contextOutils.fillRect(x, y, 37, 35);
    }

    /**
     * @description Obtenir les coordonnées par rapport à l'interieur du div des menu
     * @param {type} event
     * @returns {Grillage.getSourisPositionMenuOutils.Anonym$16}
     */
    function getSourisPositionMenuOutils(event) {
        var elementCanvas = canvasOutil;
        var ox = elementCanvas.scrollLeft - elementCanvas.offsetLeft;
        var oy = elementCanvas.scrollTop - elementCanvas.offsetTop;
        while (elementCanvas = elementCanvas.offsetParent) {
            ox += elementCanvas.scrollLeft - elementCanvas.offsetLeft;
            oy += elementCanvas.scrollTop - elementCanvas.offsetTop;
        }
        return {x: event.clientX + ox, y: event.clientY + oy};
    }
    /*****************************************************************************
     * @description Création du div "grille" qui contiendra la grille
     * @type @exp;document@call;createElement
     */
    var grille = document.createElement("div");
    var styleGrille = "position: relative;background-color: #CCBEBE;border: 2px solid #CCBEBE;width: 798px;height: 512px;bottom: -50px;margin-left: auto;margin-right: auto;"
    grille.setAttribute("id", "grille");
    grille.setAttribute("style", styleGrille);

    /*****************************************************************************
     * @description Création d'un élément canvas, dans la quel sera déssiné la grille.
     * @type @exp;document@call;createElement
     */
    var canvasGrille = document.createElement("canvas");
    var widthCanvas = 800;
    var heightCanvas = 510;
    var styleCanvasGrille = "position: absolute;";
    canvasGrille.setAttribute("width", widthCanvas);
    canvasGrille.setAttribute("height", heightCanvas);
    canvasGrille.setAttribute("id", "canvasGrille");
    canvasGrille.setAttribute("style", styleCanvasGrille);
    grille.appendChild(canvasGrille);

    /*****************************************************************************
     * @description Appelle de la méthode getContext qui récupéré pour savoir dans 
     * quel contexte de dessin (2D ou 3D) le script va pouvoir agir, et de quelles 
     * fonctions il pourra disposer. Le contexte sera l'élément 
     * central de gestion de Canvas.
     * @type @exp;canvasGrille@call;getContext
     */
    var contextCanvasGrille = canvasGrille.getContext('2d');
    /**
     * 
     * @type Number est la longueur et largueur d'une cellule de la grille
     */
    var tailleCase = 30;
    /**
     * 
     * @type Array Contient les coordonnées de chaque cellule de la grille
     */
    var tableauDeGille = [];

    /**
     * 
     * @type type Coordonnée de la dernière cellule selectionné dans la grille
     */
    var dernierCelluleSelectionne = {x: 0, y: 0};

    /**
     * 
     * @type cellule contient un élément canvas sélectionné
     */
    var canvasCelluleSelectionne;

    /**
     * 
     * @type Array
     */
    var listeErreurSimple = [];

    /**
     * 
     * @type Array Ce tableau contient les valeurs de chaque cellule à tout moment
     */
    var listeDonneeDeChaqueCellule = {};

    var typeDeCorrection;

    /*******************************************************************************
     * Ici nous dessinons la grille et on stocke dans tableauDeGille les coordonnées 
     * de chaque cellule
     */
    contextCanvasGrille.fillStyle = "#fff";
    for (var i = 0; i < parseInt(widthCanvas / tailleCase); i++) {
        for (var j = 0; j < parseInt(heightCanvas / tailleCase); j++) {
            contextCanvasGrille.fillRect(i * 32, j * 32, 30, 30);
            tableauDeGille.push({x: i * 32, y: j * 32});
            listeDonneeDeChaqueCellule[String(i * 32) + "_" + String(j * 32)] = "";
        }
    }

    /**
     *@description Cette function dessine la marge
     */
    function dessinerMarge() {
        contextCanvasGrille.fillStyle = "red";
        contextCanvasGrille.fillRect(126, 0, 2, 512);
    }
    /*On dessine la marge*/
    dessinerMarge();
    /*******************************************************************************
     * On insert la div.grille dans le div.content 
     */
    content.appendChild(grille);

    /**
     * @description Cette funtion nous retourne la valeur d'une cellule en lui passant en paramètre son coordonnée
     * @param {type} x
     * @param {type} y
     * @returns {int}
     */
    function getValeurUneCellule(x, y) {
        return listeDonneeDeChaqueCellule[String(x) + "_" + String(y)];
    }

    /***
     * @description Cette function enregistre la valeur d'une 
     * @param {type} x
     * @param {type} y
     * @param {type} val
     */
    function setValeurUneCellule(x, y, val) {
        listeDonneeDeChaqueCellule[String(x) + "_" + String(y)] = String(val);
    }


    /*******************************************************************************
     * @description Cette fonction nous donnes la position de la sourcie par rapport 
     * à l'élement canvas.canvasGrille.
     * Le point de référence (0,0) est situé en haut à gauche
     * L'axe horizontal (x) est défini par la première coordonée
     * L'axe vertical (y) est défini par la seconde coordonnée
     * Ces valeurs correspondent à la grille entourant les pixels, et non pas aux pixels eux-mêmes
     * 
     * @param {type} event
     * @returns {Grillage.getSourisPosition.Object(possitionX,possitionY)} coordonnée de la sourcis
     */
    function getSourisPosition(event) {
        var elementCanvas = canvasGrille;
        var ox = elementCanvas.scrollLeft - elementCanvas.offsetLeft;
        var oy = elementCanvas.scrollTop - elementCanvas.offsetTop;
        while (elementCanvas = elementCanvas.offsetParent) {
            ox += elementCanvas.scrollLeft - elementCanvas.offsetLeft;
            oy += elementCanvas.scrollTop - elementCanvas.offsetTop;
        }
        return {x: event.clientX + ox, y: event.clientY + oy};
    }

    /*******************************************************************************
     * @description Cette fonction prend en entrer les coordonnées de la sourcis 
     * par rapport au canvas.canvasGrille et retourne les coordonnées en X et Y 
     * de la cellule courante
     * @param {type} x
     * @param {type} y
     * @returns {Grillage.recupererCordonneeCaseCourant.Object(possitionX,possitionY)}
     */
    function recupererCordonneeCaseCourant(x, y) {
        var coordX = 0;
        var coordY = 0;
        for (i = 0; i < tableauDeGille.length - 1; i++) {

            if (x >= tableauDeGille[i].x && x <= tableauDeGille[i + 1].x) {
                coordX = tableauDeGille[i].x;
            }
            if (y >= tableauDeGille[i].y && y <= tableauDeGille[i + 1].y) {
                coordY = tableauDeGille[i].y;
            }

        }
        return {x: coordX, y: coordY};
    }

    /*******************************************************************************
     * @description Cette fonction prend en entrer les coordonnées d'une cellule 
     * et dessine un contour d'épaisseur 2px selon la couleur aussi passé en paramètre
     * @param {type} x
     * @param {type} y
     * @param {type} couleur couleur du contour
     * @returns {undefined}
     */
    function dessineContour(x, y, couleur) {
        //Nous tronçons coté par poté
        //L'épaisseur de la tracé
        contextCanvasGrille.lineWidth = 2;
        //Début de la tracé
        contextCanvasGrille.beginPath();
        //Le tracé part du point (x-1,y)
        contextCanvasGrille.moveTo(x - 1, y);
        //Un segment est ajouté vers (x - 1, y + tailleCase)
        contextCanvasGrille.lineTo(x - 1, y + tailleCase);
        //Choix de la coulour
        contextCanvasGrille.strokeStyle = couleur;
        //Fin de la tracé
        contextCanvasGrille.stroke();

        contextCanvasGrille.lineWidth = 2;
        contextCanvasGrille.beginPath();
        contextCanvasGrille.moveTo(x - 1 + tailleCase + 2, y);
        contextCanvasGrille.lineTo(x - 1 + tailleCase + 2, y + tailleCase);
        contextCanvasGrille.strokeStyle = couleur;
        contextCanvasGrille.stroke();

        contextCanvasGrille.lineWidth = 2;
        contextCanvasGrille.beginPath();
        contextCanvasGrille.moveTo(x, y - 1);
        contextCanvasGrille.lineTo(x + tailleCase, y - 1);
        contextCanvasGrille.strokeStyle = couleur;
        contextCanvasGrille.stroke();

        contextCanvasGrille.lineWidth = 2;
        contextCanvasGrille.beginPath();
        contextCanvasGrille.moveTo(x, y - 1 + tailleCase + 2);
        contextCanvasGrille.lineTo(x + tailleCase, y - 1 + tailleCase + 2);
        contextCanvasGrille.strokeStyle = couleur;
        contextCanvasGrille.stroke();

        dessinerMarge();
    }

    /**
     * @description Cette fonction prend en entrer les coordonnées d'une celle et efface son coutour de 2px.
     * 
     * @param {type} x
     * @param {type} y
     */
    function effacerContour(x, y) {
        contextCanvasGrille.clearRect(x - 2, y - 2, tailleCase + 2, 2);
        contextCanvasGrille.clearRect(x - 2, y - 2, 2, tailleCase + 2);
        contextCanvasGrille.clearRect(x - 2, y + tailleCase, tailleCase + 2, 2);
        contextCanvasGrille.clearRect(x + tailleCase, y - 2, 2, tailleCase + 2);

        dessinerMarge();
    }

    /**
     * @description Cette fonction prend les coordonnées d'une cellule, un caractère, une couleur et ecrit le carectère
     * dans la cellule avec une taille police 30px et de couleur celui passé en paramètre.
     * @param {type} x
     * @param {type} y
     * @param {type} caractere
     * @param {type} couleur
     */
    function ecrireDansUneCellule(x, y, caractere, couleur) {
        effacerLesDonneeCellule(x, y);
        contextCanvasGrille.fillStyle = couleur;
        contextCanvasGrille.textAlign = 'center';
        contextCanvasGrille.textBaseline = 'top';
        contextCanvasGrille.font = 'bold 25px sans-serif';
        contextCanvasGrille.fillText(caractere, x + 15, y);
        setValeurUneCellule(x, y, caractere);
    }
    /**
     * 
     * @param {type} x
     * @param {type} y
     * @param {type} caractere
     * @param {type} couleurText
     * @param {type} couleurTransparence
     */
    function ecrireDansUneCelluleAvecTransparance(x, y, caractere, couleurText, couleurTransparence) {
        effacerEcritureUneCelluleException(x, y, couleurTransparence)
        contextCanvasGrille.fillStyle = couleurText;
        contextCanvasGrille.textAlign = 'center';
        contextCanvasGrille.textBaseline = 'top';
        contextCanvasGrille.font = 'bold 25px sans-serif';
        contextCanvasGrille.fillText(caractere, x + 15, y);

        contextCanvasGrille.fillStyle = couleurTransparence;
        contextCanvasGrille.fillRect(x, y, 30, 30);
        setValeurUneCellule(x, y, caractere);
    }
    /**
     * @description Cette fonction prend les coordonnées d'une cellule et efface le caractère ecrit à l'intérieur.
     * @param {type} x
     * @param {type} y
     */
    function effacerEcritureUneCellule(x, y) {
        contextCanvasGrille.fillStyle = "#fff";
        contextCanvasGrille.fillRect(x, y, 30, 30);
        setValeurUneCellule(x, y, "");
    }
    function effacerEcritureUneCelluleException(x, y, couleur) {
        contextCanvasGrille.fillStyle = couleur;
        contextCanvasGrille.fillRect(x, y, 30, 30);
        setValeurUneCellule(x, y, "");
    }
    function effacerLesDonneeCellule(x, y) {

        contextCanvasGrille.clearRect(x, y, 30, 30);
        contextCanvasGrille.fillStyle = "#fff";
        contextCanvasGrille.fillRect(x, y, 30, 30);
        setValeurUneCellule(x, y, "");
    }
    function dessinerBaseOperation(x, y, couleur) {

        contextCanvasGrille.lineWidth = 4;
        contextCanvasGrille.beginPath();
        contextCanvasGrille.moveTo(x, y - 1 + 15);
        contextCanvasGrille.lineTo(x + tailleCase, y - 1 + 15);
        contextCanvasGrille.strokeStyle = couleur;
        contextCanvasGrille.stroke();
    }
    /**
     * @description Cette fonction prend les coordonnées d'une cellule et crèe un element canvas donc l'id est la syntaxte suivante:
     * cellule_x_y avec x et y les coordonnées respectives de la cellule.
     * Cet element canvas.cellule_x_y se trouvera au dessus de la cellule et on s'en servira pour notifier que la cellule.
     * Noté que nous avons crée un style particulier pour ces éléments : ils ont un fond (background) rouge et l'opacité 
     * de l'élément est de 0.7 donc transparent.
     * est selectionnée.
     * @param {type} x
     * @param {type} y
     */
    function creerCanvasCellule(x, y) {
        var canvasCellule = document.createElement("canvas");
        var canvasCelluleGrille = "position: absolute;z-index: 2;margin-left: " + x + "px;margin-top: " + y + "px;background: #FFBDBD;opacity: 0.7;";
        canvasCellule.setAttribute("width", tailleCase);
        canvasCellule.setAttribute("height", tailleCase);
        canvasCellule.setAttribute("id", "cellule_" + x + "_" + y);
        canvasCellule.setAttribute("style", canvasCelluleGrille);
        grille.appendChild(canvasCellule);
    }
    /**
     * @description Cette fonction prend les coordonnées d'une cellule et supprime element canvas.cellule_x_y qui se trouve superposé 
     * à la cellule.
     * 
     * @param {type} x
     * @param {type} y
     * @returns {undefined}
     */
    function supprimerCanvasCellule(x, y) {
        var id_cellule = "cellule_" + x + "_" + y;
        var cellule = grille.querySelector("#" + id_cellule);
        if (cellule) {
            grille.removeChild(cellule);
        }
    }

    /**
     * @description Cette fonction, selon le type de navigateur, retourne l'objet 'event' approprié.
     * @param {type} _event_
     * @returns {@exp;window@pro;event}
     */
    function checkEventObj(_event_) {
        // --- IE explorer
        if (window.event)
            return window.event;
        // --- Netscape and other explorers
        else
            return _event_;
    }
    /**
     * Cette fonction est appellé quand on click sur une touche du clavier.
     * Elle retourne une object avec Object(intKeyCode,intAltKey,intCtrlKey,val,type)
     * intKeyCode correstion au code ascii de la touche apuyé 
     * val c'est la valeur qui correspond à la touche donc on fait appelle à la methode String.fromCharCode(intKeyCode)
     * type est la catégorie, cette catégorisation est là pour determiner le type d'action à faire.
     * 
     * @param {type} event
     * @returns {Grillage.clavier.Object(intKeyCode,intAltKey,intCtrlKey,val,type)}
     */
    function clavier(event) {
        e = checkEventObj(event);
        var intKeyCode = e.keyCode;
        var intAltKey = e.altKey;
        var intCtrlKey = e.ctrlKey;
        caractere = String.fromCharCode(intKeyCode);
        expReg = /\d/;
        KEY_ENTER = 13;
        KEY_ESC = 27;
        KEY_DEL = 46;
        KEY_SUPPR = 8;
        if (intKeyCode === KEY_ENTER) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "entrer", "type": "action"};
        }
        if (intKeyCode === KEY_ESC) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "echap", "type": "action"};
        }
        if (intKeyCode === KEY_DEL) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "del", "type": "action"};
        }
        if (intKeyCode === KEY_SUPPR) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "del", "type": "action"};
        }
        if (expReg.test(caractere)) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": caractere, "type": "chiffre"};
        }
        if (caractere == "+" || caractere == "-" || caractere == "*" || caractere == "/" || caractere == ",") {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": caractere, "type": "operateur"};
        }
        if (intKeyCode >= 37 && intKeyCode <= 40) {
            switch (intKeyCode) {
                case 37:
                    return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "gauche", "type": "direction"};
                    break;
                case 38:
                    return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "haut", "type": "direction"};
                    break;
                case 39:
                    return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "droit", "type": "direction"};
                    break;
                case 40:
                    return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "bas", "type": "direction"};
                    break;
            }
        }
        //Touche tab
        if (intKeyCode == 09) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "droit", "type": "direction"};
        }

        if (intKeyCode >= 8 && intKeyCode <= 46) {
            return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": caractere, "type": "nonpriseencharge"};
        }
        return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": caractere, "type": "interdit"};


    }
    /**
     * 
     * @param {type} x
     * @param {type} y
     * @returns {Boolean}
     */
    function verifierQueLaCelluleEstActive(x, y) {

        var taille = 0;
        var active = false;
        while (taille < tableauDesCelluleAutorise.length && active === false) {
            if (tableauDesCelluleAutorise[taille].x === x && tableauDesCelluleAutorise[taille].y === y) {
                active = true;
            }
            taille++;

        }
        return active;
    }

    function effacerErreurTooltipSimple() {
        for (i = 0; i < listeErreurSimple.length; i++) {
            effacerDivForTooltip(listeErreurSimple[i].x, listeErreurSimple[i].y);
            //effacerContour(listeErreurSimple[i].x, listeErreurSimple[i].y);
        }
    }

    var coordonneGrilleCourant;

    function traiterEntreeClavier(event) {
        //On appelle la fonction clavier qui nous retourne un Object(intKeyCode,intAltKey,intCtrlKey,val,type)
        var donnekey = clavier(event);
        /**
         * Selon la categorie on realise des actions
         */
        if (operationEnCours) {
            switch (donnekey.type) {
                /**
                 * 
                 */
                case "chiffre":
                    if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {

                        switch (typeOperation) {
                            case 'addition':


                                ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, "#000");

                                break;
                        }
                        effacerDivForTooltip(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                        effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);

                    } else {
                        var message = '<img style="position: absolute;margin-left: -16px;margin-top: -8px;" src=\"./img/icone_erreur.png\"/>\n\
                                <em style="margin-left: 15px;">Erreur : Vous ne pouvez pas ecrire dans cette zone.<br> Veuillez\n\
                                ecrire dans les zone autorisé.</em>';
                        var bgcolor = "#FF332F";
                        var textcolor = "#FFFCFB";
                        afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                        dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                        listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                    }
                    break;
                    /**
                     * Dans cette categorie nous avons le touche Echap, Entrer et Delete
                     * 
                     */
                case "operateur":
                    switch (typeOperation) {
                        case 'addition':
                            switch (donnekey.val) {
                                case "equal":


                                    afficherResultatOperation("addition");

                                    break;
                                case ",":
                                    ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, "#000");

                            }
                            break;
                    }
                    effacerDivForTooltip(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                    effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                    break;
                case "action":
                    switch (donnekey.val) {
                        /**
                         * Delete efface l'ecriture d'une cellule selectionné
                         */
                        case "del":
                            if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {
                                effacerEcritureUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                ecrireDansUneCelluleAvecTransparance(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "", "white", "rgba(163, 209, 157, 0.3)");

                            } else {
                                var message = '<img style="position: absolute;margin-left: -16px;margin-top: -8px;" src=\"./img/icone_erreur.png\"/>\n\
                                <em style="margin-left: 15px;">Erreur : Vous ne pouvez pas ecrire dans cette zone.<br> Veuillez\n\
                                ecrire dans les zone autorisé.</em>';
                                var bgcolor = "#FF332F";
                                var textcolor = "#FFFCFB";
                                afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                                listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                            }
                            break;

                        case "echap":
                            effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            effacerContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            supprimerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            break;
                    }
                    break;
                    /**
                     * Cette actegorie nous permet de deplacer le selectionneur de cellule grace aux touche directionnel
                     * du clavier.
                     */
                case "direction":
                    switch (donnekey.val) {
                        case "droit":
                            if (coordonneGrilleCourant.x >= 0 && coordonneGrilleCourant.x < 768) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.x = coordonneGrilleCourant.x + tailleCase + 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                        case "gauche":
                            if (coordonneGrilleCourant.x > 0 && coordonneGrilleCourant.x <= 768) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.x = coordonneGrilleCourant.x - tailleCase - 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                        case "haut":
                            if (coordonneGrilleCourant.y > 0 && coordonneGrilleCourant.x <= 480) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.y = coordonneGrilleCourant.y - tailleCase - 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                        case "bas":
                            if (coordonneGrilleCourant.y >= 0 && coordonneGrilleCourant.y < 480) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.y = coordonneGrilleCourant.y + tailleCase + 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                    }
                    break;
                    /**
                     * Cette catégorie est la liste de touche intergie, à l'anclachement un message s'affiche dans la grille
                     * sous forme d'un tooltip qui signale à l'utilisateur d'utiliser les bonnes touche.
                     * Le contour de la cellule devient rouge
                     */
                case "interdit":
                    var message = '<img style="position: absolute;margin-left: -16px;margin-top: -8px;" src=\"./img/icone_erreur.png\"/>\n\
                <em style="margin-left: 15px;">Erreur : seul les caractères numerique sont permise <br> dans cette cellule. \n\
                Exemple : 0, 1, 2, 5 etc...</em>';
                    var bgcolor = "#FF332F";
                    var textcolor = "#FFFCFB";
                    afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                    listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                    break;
            }
        }
        else {
            switch (donnekey.type) {
                /**
                 * 
                 */
                case "chiffre":


                    ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, "#000");

                    effacerDivForTooltip(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                    effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                    listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                    break;

                case "operateur":


                    ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, "#00F");


                    effacerDivForTooltip(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                    effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                    listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                    break;
                    /**
                     * Dans cette categorie nous avons le touche Echap, Entrer et Delete
                     * 
                     */
                case "action":
                    switch (donnekey.val) {
                        /**
                         * Delete efface l'ecriture d'une cellule selectionné
                         */
                        case "del":
                            effacerEcritureUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                            break;

                        case "echap":
                            effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            effacerContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            supprimerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                            break;
                    }
                    break;
                    /**
                     * Cette actegorie nous permet de deplacer le selectionneur de cellule grace aux touche directionnel
                     * du clavier.
                     */
                case "direction":
                    switch (donnekey.val) {
                        case "droit":
                            if (coordonneGrilleCourant.x >= 0 && coordonneGrilleCourant.x < 768) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.x = coordonneGrilleCourant.x + tailleCase + 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                        case "gauche":
                            if (coordonneGrilleCourant.x > 0 && coordonneGrilleCourant.x <= 768) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.x = coordonneGrilleCourant.x - tailleCase - 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                        case "haut":
                            if (coordonneGrilleCourant.y > 0 && coordonneGrilleCourant.y <= 480) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.y = coordonneGrilleCourant.y - tailleCase - 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                        case "bas":
                            if (coordonneGrilleCourant.y >= 0 && coordonneGrilleCourant.y < 480) {
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                coordonneGrilleCourant.y = coordonneGrilleCourant.y + tailleCase + 2;
                                effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                            }
                            break;
                    }
                    break;
                    /**
                     * Cette catégorie est la liste de touche intergie, à l'anclachement un message s'affiche dans la grille
                     * sous forme d'un tooltip qui signale à l'utilisateur d'utiliser les bonnes touche.
                     * Le contour de la cellule devient rouge
                     */
                case "interdit":
                    var message = '<img style="position: absolute;margin-left: -16px;margin-top: -8px;" src=\"./img/icone_erreur.png\"/>\n\
                <em style="margin-left: 15px;">Erreur : seul les caractères numerique sont permise <br> dans cette cellule. \n\
                Exemple : 0, 1, 2, 5 etc...</em>';
                    var bgcolor = "#FF332F";
                    var textcolor = "#FFFCFB";
                    afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                    listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                    break;
            }
        }
    }
    /**
     * Cette methode correspond à l'évenement faite quand on click dans la grille
     * @param {type} event
     */
    canvasGrille.onmousedown = function(event) {

        /**
         * On appelle la @function getSourisPosition qui nous donne position de la sourie
         */
        var positionGrilleCanvas = getSourisPosition(event);
        /**
         * On appelle la @function recupererCordonneeCaseCourant pour recuperer les coordonnées de 
         * cellule la cellule selectionnée
         */
        coordonneGrilleCourant = recupererCordonneeCaseCourant(positionGrilleCanvas.x, positionGrilleCanvas.y);

        /**
         * On verifie qu'on n'a pas clické que la même cellule
         */
        if (dernierCelluleSelectionne.x !== coordonneGrilleCourant.x || dernierCelluleSelectionne.y !== coordonneGrilleCourant.y) {
            //On éfface le coutour de la cellule precedente
            effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
            //On efface aussi l'élement canvas que se trouve au-dessus de l'anciène cellule
            supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
            //On dessine le contour au nouveau 
            dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
            //On crèe un element canvas au dessus
            creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);

            effacerErreurTooltipSimple();

            //On verifie que la cellule selectionnée existe
            var id_cellule = "cellule_" + coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y;
            var cellule = grille.querySelector("#" + id_cellule);
            if (cellule) {
                //On affecte l'élément à l'atribut canvasCelluleSelectionne
                canvasCelluleSelectionne = cellule;

                //Si on click sur le clavier

                //Hack pour safari et chrome
                if (window.devicePixelRatio) {
                    document.onkeypress = function(eventClavier) {
                        traiterEntreeClavier(eventClavier);
                    }
                }
                //Hack pour firefox
                else {
                    document.onkeydown = function(eventClavier) {
                        traiterEntreeClavier(eventClavier);
                    }
                }
            }
            dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
            dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
        } else {
            dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
            dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
        }

    };



    /**
     * Variable global dans la qualle on stock les resultats attendu
     * @type @exp;tmp@pro;tableau|@exp;tmp@pro;tableau
     */
    var tableauDesValeursAttendu;
    /****************************************************************************************
     * Cette function verifie le champs remplit pendant la correction et aussi les champs déjà remplit.
     */
    function suiviCorrectionAddition() {
        if (tableauDesValeursAttendu) {
            
            if (suiviEnCours === false) {
                var tmp = getStructureResultatAvantComparaison(typeOperation, operation);
                tableauDesValeursAttendu = tmp.tableau;
                buttonCorrectionSuivi.innerHTML = "Suivi de la correction en cours...";
                var imagecargement = document.createElement("img");
                imagecargement.setAttribute("src", "./img/loadinfo.gif");
                imagecargement.setAttribute("style", "width: 20px;height: 14px");
                buttonCorrectionSuivi.appendChild(imagecargement);
                suiviEnCours = true;

            }
            var courant;
            var indicemax = 1;

            for (i = 1; i < tableauDesValeursAttendu.length; i++) {

                if (isInt(tableauDesValeursAttendu[i].val)) {
                    courant = parseInt(getValeurUneCellule(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y));
                } else {
                    courant = getValeurUneCellule(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y);
                }
                if (tableauDesValeursAttendu[i].val === courant) {
                    if (!tableauDesValeursAttendu[i].statu) {
                        tableauDesValeursAttendu[i].statu = true;
                        ecrireDansUneCelluleAvecTransparance(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y, String(courant), "black", "rgba(0, 102, 0, 0.4)");
                    }
                } else {
                    tableauDesValeursAttendu[i].statu = false;
                    //dessineContour(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y, "red");

                }
                if (courant) {
                    indicemax = i;
                }
            }
            
            if (indicemax) {
                for (v = 1; v <= indicemax; v++) {
                    if (tableauDesValeursAttendu[v].statu === false) {

                        dessineContour(tableauDesValeursAttendu[v].x, tableauDesValeursAttendu[v].y, "red");

                    }
                }
            }


        } else {
            //Appelle de la getStructureResultatAvantComparaison pour verifier les champs saisit par l'utilisateur
            var tmp = getStructureResultatAvantComparaison(typeOperation, operation);
            tableauDesValeursAttendu = tmp.tableau;
            //Changement du style bu button et chargement de l'image gif
            buttonCorrectionSuivi.innerHTML = "Suivi de la correction en cours...";
            var imagecargement = document.createElement("img");
            imagecargement.setAttribute("src", "./img/loadinfo.gif");
            imagecargement.setAttribute("style", "width: 20px;height: 14px");
            buttonCorrectionSuivi.appendChild(imagecargement);
            suiviEnCours = true;
        }

    }
    function stropSuiviCorrectionAddition()
    {
        clearInterval(mySuiviCorrection);
    }


    function afficherResultatOperation(typeoperation) {
        switch (typeoperation) {
            case "addition":
                var retenu = operation.getRetenues();
                var resultat = operation.getResultat();
                var caseRetenue = [];
                var caseResultat = [];
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === 1) {
                        caseRetenue.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y});
                    }
                    if (tableauDesCelluleReserver[j].ligne === (operation.getOperande().length + 3)) {
                        caseResultat.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y});

                    }

                }
                for (i = retenu.length - 1; i >= 0; i--) {
                    ecrireDansUneCelluleAvecTransparance(caseRetenue[caseRetenue.length - 1 - i].x, caseRetenue[caseRetenue.length - 1 - i].y, String(retenu[retenu.length - 1 - i]), "#C03000", "rgba(173, 207, 79, 0.3)");
                }

                tailleMax = resultat.getPartieEntiere().length + resultat.getPartieDecimale().length + 1;
                v = resultat.getPartieDecimale().length - 1;
                u = resultat.getPartieEntiere().length - 1;
                for (i = caseResultat.length - 1; i >= 0; i--) {
                    if (v >= 0) {
                        ecrireDansUneCelluleAvecTransparance(caseResultat[i].x, caseResultat[i].y, String(resultat.getPartieDecimale()[v]), "#C03000", "rgba(173, 207, 79, 0.3)");
                        v--;
                    }
                    if (v === -1) {
                        ecrireDansUneCelluleAvecTransparance(caseResultat[i - 1].x, caseResultat[i - 1].y, String(","), "red", "rgba(173, 207, 79, 0.3)");
                        v = -2;
                    }
                    if (v === -2 && u >= 0) {
                        ecrireDansUneCelluleAvecTransparance(caseResultat[i - 2].x, caseResultat[i - 2].y, String(resultat.getPartieEntiere()[u]), "#C03000", "rgba(173, 207, 79, 0.3)");
                        u--;
                    }
                }


                break;

        }
    }



    function lancerCorrectionSimple() {
        var tableauDesResulat = getStructureResultatAvantComparaison(typeOperation, operation);
        console.log("Reception fonction correction Simple");
        //Pour chaque cellule editable
        for (i = 0; i < tableauDesCelluleAutorise.length; i++) {
            varX = tableauDesCelluleAutorise[i].x
            varY = tableauDesCelluleAutorise[i].y
            //Si l'utilisateur a rempli cette case
            if (getValeurUneCellule(varX, varY) || getValeurUneCellule(varX, varY) === 0) {
                //Si une valeur est attendue
                if (tableauDesResulat.object[varX + "_" + varY]) {
                    console.log("valeur recu :" + getValeurUneCellule(varX, varY) + "/" + tableauDesResulat.object[varX + "_" + varY].val)
                    valeurAttendue = tableauDesResulat.object[varX + "_" + varY].val
                    //Si valeur entrée = valeur attendue
                    if (getValeurUneCellule(varX, varY) == valeurAttendue) {
                        //Bonne Reponse
                        ecrireDansUneCelluleAvecTransparance(varX, varY, String(getValeurUneCellule(varX, varY)), "black", "rgba(0, 102, 0, 0.4)");
                    }
                    //Sinon <=> valeur entrée != valeur attendue
                    else {
                        //Mauvaise Réponse
                        ecrireDansUneCelluleAvecTransparance(varX, varY, String(getValeurUneCellule(varX, varY)), "black", "rgba(255, 0, 0, 0.4)");
                    }
                }
                //Sinon, si aucune valeur attendu
                else {
                    console.log("valeur recu :" + getValeurUneCellule(varX, varY) + "/?")
                    //Si valeur entrée = 0
                    if (getValeurUneCellule(varX, varY) == 0) {
                        //Bonne Reponse
                        ecrireDansUneCelluleAvecTransparance(varX, varY, String(getValeurUneCellule(varX, varY)), "black", "rgba(0, 102, 0, 0.4)");
                    }
                    //Sinon <=> valeur entrée != 0
                    else {
                        //Mauvaise Réponse
                        ecrireDansUneCelluleAvecTransparance(varX, varY, String(getValeurUneCellule(varX, varY)), "black", "rgba(255, 0, 0, 0.4)");
                    }
                }
            }
        }
    }
    /****************************************************************************************
     * @description  Cette fonction prend en entrer un canvas et dessine la flèche du tooltip
     * @param {type} canvasToolTip
     * @param {type} posx
     * @param {type} posy
     * @param {type} bordercolor
     */
    function dessineCanvasTooltip(canvasToolTip, bordercolor) {
        var ctx = canvasToolTip.getContext("2d");
        ctx.fillStyle = bordercolor;

        ctx.moveTo(1, 1);
        ctx.lineTo(1, 18);
        ctx.lineTo(14, 1);
        ctx.fill();
    }
    /****************************************************************************************
     * @description  Cette fonction dessine le tootltip
     * 
     * @param {type} posleft
     * @param {type} postop
     * @param {type} bordercolor$1
     * @param {type} bgcolor
     * @param {type} borderwidth
     * @param {type} textcolor
     * @param {type} message
     * @param {type} tipbot
     * @param {type} bordercolor
     */
    function dessinerDivForTooltip(posleft, postop, bordercolor, bgcolor, borderwidth, textcolor, message, tipbot, bordercolor) {
        /**
         * 
         * @type @exp;document@call;createElement
         */

        var divToolTip = document.createElement("div");
        if (String(message).length > 150) {
            posleftTmp = posleft - 20;
            postopTmp = postop - 60;
        } else {
            posleftTmp = posleft - 10;
            postopTmp = postop - 50;
        }
        var stypeDivToolTip = 'position:absolute;z-index:3; left:' + (posleftTmp) + 'px;top:' + (postopTmp) + 'px;border-color:' + bordercolor + ';background-color:' + bgcolor + ';color:' + textcolor + ';border-width:' + borderwidth + 'px';
        divToolTip.setAttribute("style", stypeDivToolTip);
        divToolTip.setAttribute("class", "tooltip");
        divToolTip.setAttribute("id", "tooltip_" + posleft + "_" + postop);

        /**
         * création d'un object canvas pour dessinée la flèche du tooltip
         * @type @exp;document@call;createElement
         */
        var canvasToolTip = document.createElement("canvas");
        var styleCanvasToolTip = 'position: absolute;bottom:' + tipbot + 'px;left: 10%;';
        var widthCanvasToolTip = 28;
        var heightCanvasToolTip = 18;
        canvasToolTip.setAttribute("width", widthCanvasToolTip);
        canvasToolTip.setAttribute("height", heightCanvasToolTip);
        canvasToolTip.setAttribute("id", "tooltip_tip" + posleft + "_" + posleft);
        canvasToolTip.setAttribute("style", styleCanvasToolTip);
        divToolTip.innerHTML = message;
        /**
         * On appelle la @function dessineCanvasTooltip pour dessinée la flèche du tootltip
         */
        dessineCanvasTooltip(canvasToolTip, bordercolor);
        /**
         * On l'insert dans la grille
         */
        divToolTip.appendChild(canvasToolTip);
        grille.appendChild(divToolTip);
    }
    /****************************************************************************************
     * @description Cette fonction affiche le tootltip
     * @param {type} coordonneGrilleCourant
     * @param {type} message
     * @param {type} bgcolor
     * @returns {undefined}
     */
    function afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor) {
        var bordercolor = '#666666';
        var borderwidth = '4';
        var posleft = coordonneGrilleCourant.x;
        var postop = coordonneGrilleCourant.y;
        var tipbot = -18 + (borderwidth / 4);
        dessinerDivForTooltip(posleft, postop, bordercolor, bgcolor, borderwidth, textcolor, message, tipbot, bordercolor);

    }
    /*********************************************************************************************
     * @description cette fonction prend en entré les coordonnée d'une cellule et efface le tooltip
     * qui lui correspond dans la grille
     * @param {type} x
     * @param {type} y
     */
    function effacerDivForTooltip(x, y) {
        var id_tooltip = "tooltip_" + x + "_" + y;
        var tooltip = grille.querySelector("#" + id_tooltip);
        if (tooltip) {
            grille.removeChild(tooltip);
        }
    }

    /*********************************************************************************************
     * Ci-dessous les attributs, functions d'affiche et de suivi pour la résolution des opération
     ********************************************************************************************/
    /*********************************************************************************************
     * 
     * @type Boolean operationEnCours
     * @type Object:{Addition, Soustraction, Multiplication, dition} operation 
     * @type Array tableauDesCelluleActiveNonActive
     * @type Number postXContante
     * @type Number postYContante
     * @type Object(x,y) positionInitialPourPoserUneOperation 
     */
    var operationEnCours = false;
    var operation;
    var typeOperation;
    var tableauDesCelluleActiveNonActive = [];
    var tableauDesCelluleReserver = [];
    var tableauDesCelluleAutorise = [];
    var postXContante = 224;
    var postYContante = 96;
    var positionInitialPourPoserUneOperation = {x: postXContante, y: postYContante};

    /***********************************************************************************************
     * @description Cette fonction nous permet d'afficher ¬l'opération
     * @param {Addition} addition
     * @param {String} textEnonce 
     */
    this.poserOparationAddition = function poserOparationAddition(addition, textEnonce) {

        operationEnCours = true;
        operation = addition;
        typeOperation = "addition";
        afficherEnonce(textEnonce);
        var nombreCelluleAReserverVerticalement = operation.getOperande().length + 3;
        var nombreCelluleAReserverHorizontalement = 0;
        var operande = operation.getOperande();
        var maxDecimale = 0;
        var maxEntiere = 0;
        for (var i = 0; i < operande.length; i++) {

            if (nombreCelluleAReserverHorizontalement <= operande[i].getLongueurValeur()) {
                nombreCelluleAReserverHorizontalement = parseInt(operande[i].getLongueurValeur());
            }
            ;
            if (maxDecimale <= operande[i].getPartieDecimale().length) {
                maxDecimale = operande[i].getPartieDecimale().length;
            }
            ;
            if (maxEntiere <= operande[i].getPartieEntiere().length) {
                maxEntiere = operande[i].getPartieEntiere().length;
            }
            ;
        }
        ;
        nombreCelluleAReserverHorizontalement = nombreCelluleAReserverHorizontalement + 4;

        var nombreDeCelluleAReserver = nombreCelluleAReserverVerticalement * nombreCelluleAReserverHorizontalement;
        numLigne = 1;
        valMaxByLigne = 0;
        for (i = 0; i < nombreCelluleAReserverVerticalement; i++) {
            for (j = 0; j < nombreCelluleAReserverHorizontalement; j++) {
                if (postXContante + j * 32 >= valMaxByLigne) {
                    valMaxByLigne = postXContante + j * 32;

                }
                p = {x: postXContante + j * 32, y: postYContante + i * 32, ligne: numLigne, valMaxByLigne: 0, valChamp: ""};
                tableauDesCelluleReserver.push(p);

            }
            for (k = 0; k < tableauDesCelluleReserver.length; k++) {
                if (tableauDesCelluleReserver[k].ligne === numLigne) {
                    tableauDesCelluleReserver[k].valMaxByLigne = valMaxByLigne;
                }
            }
            numLigne++;
            valMaxByLigne = 0;
        }
        for (j = 0; j < tableauDesCelluleReserver.length; j++) {
            for (i = 0; i < tableauDeGille.length; i++) {
                if (tableauDeGille[i].x !== tableauDesCelluleReserver[j].x && tableauDeGille[i].y !== tableauDesCelluleReserver[j].y) {
                    tableauDesCelluleActiveNonActive.push(tableauDeGille[i]);
                }
            }
        }


        var couleurTransparenceOperandeDecimal = 'rgba(255, 118, 89, 0.1)';
        var couleurTransparenceOperandeEntiere = 'rgba(110, 71, 151, 0.1)';
        var couleurTransparenceRetenue = 'rgba(163, 209, 157, 0.3)';
        var couleurTransparenceResultat = 'rgba(163, 209, 157, 0.3)';
        /**
         * Opérande
         */

        /**
         * Partie Decimal
         */
        numLigne = 2;
        for (i = 0; i < operande.length; i++) {
            if (operande[i].getPartieDecimale().length === maxDecimale) {
                decimale = operande[i].getPartieDecimale();
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === numLigne) {
                        for (k = 0; k < decimale.length; k++) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((decimale.length - 1 - k) * 32), tableauDesCelluleReserver[j].y, String(decimale[k]), "black", couleurTransparenceOperandeDecimal);

                        }
                    }
                }
            } else {
                decimale = operande[i].getPartieDecimale();
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === numLigne) {
                        for (k = 0; k < decimale.length; k++) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale - 1 - k) * 32), tableauDesCelluleReserver[j].y, String(decimale[k]), "black", couleurTransparenceOperandeDecimal);

                        }
                    }
                }
            }
            for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                if (tableauDesCelluleReserver[j].ligne === numLigne) {
                    ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale) * 32), tableauDesCelluleReserver[j].y, String(","), "black", "rgba(238, 213, 184, 0.2)");
                }
            }
            numLigne++;
        }
        /**
         * Partie entière
         */
        numLigne = 2;
        for (i = 0; i < operande.length; i++) {
            entiere = operande[i].getPartieEntiere();
            if (entiere.length === maxEntiere) {
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === numLigne) {
                        for (k = entiere.length - 1; k >= 0; k--) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale + 1 + maxEntiere - 1 - k) * 32), tableauDesCelluleReserver[j].y, String(entiere[k]), "black", couleurTransparenceOperandeEntiere);

                        }
                    }
                }
            } else {
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === numLigne) {
                        for (k = entiere.length - 1; k >= 0; k--) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale + 1 + entiere.length - 1 - k) * 32), tableauDesCelluleReserver[j].y, String(entiere[k]), "black", couleurTransparenceOperandeEntiere);

                        }
                    }
                }
            }

            numLigne++;
        }
        var trouver = false;
        for (j = 0; j < tableauDesCelluleReserver.length; j++) {
            if (tableauDesCelluleReserver[j].ligne === nombreCelluleAReserverVerticalement - 2) {
                if (trouver === false) {
                    ecrireDansUneCellule(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "+", "red");
                    trouver = true;
                }

            }
        }
        var mettre = false;
        for (j = 0; j < tableauDesCelluleReserver.length; j++) {
            if (tableauDesCelluleReserver[j].ligne === nombreCelluleAReserverVerticalement - 1) {
                dessinerBaseOperation(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "red");
            }

            if (tableauDesCelluleReserver[j].ligne === 1) {
                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "", "white", couleurTransparenceRetenue);
                tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y});
            }
            if (tableauDesCelluleReserver[j].ligne === nombreCelluleAReserverVerticalement) {
                if (mettre === false) {
                    ecrireDansUneCellule(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "=", "red");
                    mettre = true;
                } else {
                    ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "", "white", couleurTransparenceResultat);
                    tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y});
                }
            }

        }
        effacerEcritureUneCellule(positionInitialPourPoserUneOperation.x, positionInitialPourPoserUneOperation.y);

    };

    /**
     * 
     * @param {type} typeOperation
     * @param {type} operation
     * @returns {objet[x_y]:(val,ordre,statu)}
     */
    function getStructureResultatAvantComparaison(typeOperation, operation) {
        if (operationEnCours) {
            switch (typeOperation) {
                case "addition":
                    var tableauAvecResultatDansOrdre = {};
                    var tableauAvecResultatDansOrdreTrier = [];
                    var tableauPartieRetenue = [];
                    var tableauPartieResultat = [];
                    var retenue = operation.getRetenues();
                    var resultat = operation.getResultat();

                    var yDebut = tableauDesCelluleAutorise[0].y;
                    for (i = 0; i < tableauDesCelluleAutorise.length; i++) {
                        if (tableauDesCelluleAutorise[i].y === yDebut) {
                            tableauPartieRetenue.push(tableauDesCelluleAutorise[i]);
                        } else {
                            tableauPartieResultat.push(tableauDesCelluleAutorise[i]);
                        }
                    }
                    var tabDecimale = resultat.getPartieDecimale();
                    var tabEntiere = resultat.getPartieEntiere();
                    var ordre = 1;
                    for (i = 0; i < tabDecimale.length; i++) {
                        tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 1 - i].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 1 - i].y] = {val: tabDecimale[tabDecimale.length - 1 - i], ordre: ordre, statu: false};
                        tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 1 - i].x, y: tableauPartieResultat[tableauPartieResultat.length - 1 - i].y, val: tabDecimale[tabDecimale.length - 1 - i], ordre: ordre, order: ordre, statu: false});
                        ordre = ordre + 2;
                        if (i === tabDecimale.length - 1) {
                            tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 2 - i ].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 2 - i].y] = {val: ",", ordre: tabDecimale.length * 2, statu: false};
                            tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 2 - i].x, y: tableauPartieResultat[tableauPartieResultat.length - 2 - i].y, val: ",", ordre: tabDecimale.length * 2, order: tabDecimale.length * 2, statu: false});
                        }
                    }
                    var ordre2 = tabDecimale.length * 2 + 1;
                    for (i = 0; i < tabEntiere.length; i++) {
                        tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].y] = {val: tabEntiere[tabEntiere.length - 1 - i], ordre: ordre2, statu: false};
                        tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].x, y: tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].y, val: tabEntiere[tabEntiere.length - 1 - i], ordre: ordre2, order: ordre2, statu: false});
                        ordre2 = ordre2 + 2;
                    }
                    var ordre3 = 0;
                    var j = 0;
                    for (i = retenue.length - 1; i >= 0; i--) {
                        if (retenue[i] !== " ") {
                            tableauAvecResultatDansOrdre[tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].x + "_" + tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].y] = {val: retenue[i], ordre: ordre3, statu: false};
                            tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].x, y: tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].y, val: retenue[i], ordre: ordre3, order: ordre3, statu: false});
                            ordre3 = ordre3 + 2;
                        } else {
                            ordre3 = ordre3 + 2;
                        }

                        j++;
                    }
                    var tmp = sortHashTable(tableauAvecResultatDansOrdreTrier, 'order', true);
                    return {object: tableauAvecResultatDansOrdre, tableau: tmp};
                    break;
            }
        }
    }

    /**
     * 
     * @param {type} hashTable
     * @param {type} key
     * @param {type} removeKey
     * @returns {unresolved}
     */
    function sortHashTable(hashTable, key, removeKey) {
        hashTable = (hashTable instanceof Array ? hashTable : []);
        var newHashTable = hashTable.sort(function(a, b) {
            return (typeof(a[key]) === 'number' ? a[key] - b[key] : a[key] > b[key]);
        });
        if (removeKey) {
            for (i in newHashTable) {
                delete newHashTable[i][key];
            }
        }
        return newHashTable;
    }

}




