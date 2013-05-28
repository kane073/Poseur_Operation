/**
 * 
 * @fileOverview Projet ingénieur de Télécom bretagne - Poseur d'opération
 * @author Alassane KANE, Jeremy SFEZ, Marc Sanchez
 * @version 2.0
 */

/**
 * @class Cette classe affiche la grille et grère aussi toute les actions faite dans la grille. Elle servira à afficher les differentes opérations et à les résoudres aussi. 
 * @constructor 
 * @argument {string} idDiv est le id de l'element div qui va contenir la grille.
 * @argument {object} config configuration
 * @returns {Grillage}
 */
function Grillage(idDiv, config) {

    // ------------------ Les variables de la classe ------------------
    {
        var resultatAfficher = false;

        /**
         * @private
         * @description Va contenir l'objet timer qui permettra d'arreter l'evenement de suivi de correction.
         * @type event 
         */
        var mySuiviCorrection;

        /**
         * @private
         * @description Elle permet de savoir si le suivi de correction est en cours ou pas.
         * @type Boolean
         */
        var suiviEnCours = false;

    }
    // ------------------ Le content ------------------
    {

        /**
         * @description Il va contenir le l'element div obtenue grace à l'idDiv avec la fonction document.getElementById
         * @private
         * @type ElementDiv
         */
        var content = document.getElementById(idDiv);
        /**
         * @description Contient le du contenaire principal
         * @private
         * @constant
         * @type String
         */
        var styleContent = "border: 2px solid #000;width: 810px; height: 600px; border:dashed 5px #5cbeff;\n\
                        -moz-border-radius-topleft: 6px;-moz-border-radius-topright:5px;\n\
                        -moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;\n\
                        -webkit-border-top-left-radius:6px;-webkit-border-top-right-radius:5px;\n\
                        -webkit-border-bottom-left-radius:5px;-webkit-border-bottom-right-radius:5px;\n\
                        border-top-left-radius:6px;border-top-right-radius:5px;\n\
                        border-bottom-left-radius:5px;border-bottom-right-radius:5px;";
        content.setAttribute("style", styleContent);


    }
    // ------------------ les boutons ------------------
    {
        /**
         * @description Création du button "Correction alignement" qui servira à corriger l'alignement des nombres. 
         * @type ElementButton
         */
        var buttonCorrectionAlignement = document.createElement("button");
        var styleButtonCorrectionAlignement = "display:none;";
        buttonCorrectionAlignement.setAttribute("id", "buttonCorrectionAlignement");
        buttonCorrectionAlignement.setAttribute("class", "buttonPoseurOperation");
        buttonCorrectionAlignement.setAttribute("style", styleButtonCorrectionAlignement);
        buttonCorrectionAlignement.innerHTML = "Corriger alignement";
        content.appendChild(buttonCorrectionAlignement);

        /**
         * @event
         * @param {MyEventObject} e 
         * @requires la variable suiviEnCours
         */
        buttonCorrectionAlignement.addEventListener("click", function(e) {
            //Condition pour ne pas lancer une correction pendant une suivie de correction
            if (operationEnCours) {
                alert("L'opération est déjà posée!");
            } else {
                lancerCorrectionAlignement();
            }
        }, false);


        /**
         * @description Création du button "Correction" qui servira à corriger les réponses de l'élève. 
         * @type ElementButton
         */
        var buttonCorrectionSimple = document.createElement("button");
        var styleButtonEnonce = "display:none;";
        buttonCorrectionSimple.setAttribute("id", "buttonCorrectionSimple");
        buttonCorrectionSimple.setAttribute("class", "buttonPoseurOperation");
        buttonCorrectionSimple.setAttribute("style", styleButtonEnonce);
        buttonCorrectionSimple.setAttribute("title", "Vérifiez votre réponse en cliquant sur ce bouton");
        buttonCorrectionSimple.innerHTML = "Correction";
        content.appendChild(buttonCorrectionSimple);


        /**
         * @event
         * @param {MyEventObject} e 
         * @requires la variable suiviEnCours
         */
        buttonCorrectionSimple.addEventListener("click", function(e) {
            //Condition pour ne pas lancer une correction pendant une suivie de correction
            if (operationEnCours) {
                if (!resultatAfficher) {
                    if (!suiviEnCours) {
                        lancerCorrectionSimple();
                    } else {
                        alert("Veuillez arrêter la correction suivie.");
                    }


                } else {
                    alert("Le résultat a déjà été affiché!");
                }
            } else {
                alert("Il n'y a pas d'opération posée !");
            }
        }, false);


        /**
         * @description Création du button "Correction suivie" qui une fois lancée suivra l'élève dans sa resolution de l'exercice.. 
         * @private
         * @type ElementDiv
         */
        var buttonCorrectionSuivi = document.createElement("button");
        var styleButtonCorrectionSuivi = "display:none;";
        buttonCorrectionSuivi.setAttribute("id", "buttonCorrectionSuivi");
        buttonCorrectionSuivi.setAttribute("class", "buttonPoseurOperation");
        buttonCorrectionSuivi.setAttribute("style", styleButtonCorrectionSuivi);
        buttonCorrectionSuivi.setAttribute("title", "Faites-vous assister dans la résolution de l'équation");
        buttonCorrectionSuivi.innerHTML = "Démarrer Correction suivie";
        content.appendChild(buttonCorrectionSuivi);

        /**
         * @description C'est l'evenement qui se lance quand on click sur le button buttonCorrectionSuivi, elle va faire appelle à la function suiviCorrectionAddition
         * @event
         * @requires suiviEnCours, typeOperation
         */
        buttonCorrectionSuivi.addEventListener("click", function(e) {
            if (operationEnCours) {
                if (!resultatAfficher) {
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
                                if (tableauDesImagesAnnimer) {
                                    for (key in tableauDesImagesAnnimer) {

                                        clearInterval(tableauDesImagesAnnimer[key].stop);
                                        coordonne = String(key).split("_");
                                        chargerImageContourError(parseInt(coordonne[0]), parseInt(coordonne[1]), 0, "white");
                                        tableauDesImagesAnnimer[key].statu = false;

                                    }
                                }

                            }
                            break;
                    }
                } else {
                    alert("Le résultat de l'opération a déjà été affiché!");
                }
            } else {
                alert("Il n'y a pas d'opération posé!");
            }
        }, false);


        /**
         * @description Création du bouton "Afficher Solution" qui affichera la solution. 
         * @type ElementButton
         */
        var buttonAfficherResultat = document.createElement("button");
        var styleButtonEnonce = "position:absolute;top:50px;left:13px;display:none;";
        buttonAfficherResultat.setAttribute("id", "buttonAfficherResultat");
        buttonAfficherResultat.setAttribute("class", "buttonPoseurOperation");
        buttonAfficherResultat.setAttribute("style", styleButtonEnonce);
        buttonAfficherResultat.setAttribute("title", "Afficher la solution de l'opération");
        buttonAfficherResultat.innerHTML = "Afficher Solution";
        content.appendChild(buttonAfficherResultat);

        /**
         * @event
         * @param {MyEventObject} e 
         * @requires la variable suiviEnCours
         */
        buttonAfficherResultat.addEventListener("click", function(e) {
            if (operationEnCours) {
                if (!resultatAfficher) {
                    if (operationEnCours) {
                        suiviEnCours = false;
                        stropSuiviCorrectionAddition(mySuiviCorrection);
                        buttonCorrectionSuivi.innerHTML = "Correction suivie";
                        if (tableauDesImagesAnnimer) {
                            for (key in tableauDesImagesAnnimer) {
                                clearInterval(tableauDesImagesAnnimer[key].stop);
                                coordonne = String(key).split("_");
                                chargerImageContourError(parseInt(coordonne[0]), parseInt(coordonne[1]), 0, "white");
                                tableauDesImagesAnnimer[key].statu = false;

                            }
                        }
                    }
                    afficherResultatOperation(typeOperation);
                    effacerCadreCorrection();
                    resultatAfficher = true;
                }
            } else {
                alert("Il n'y a pas d'opération posé!");
            }

        }, false);


        /**
         * @description Bouton de configuration du programme
         * @type ElementButton
         */
        var buttonConfiguration = document.createElement("button");
        var stylebuttonConfiguration = "position:relative;top:50px;left:188px;padding: 4px 4px;";
        buttonConfiguration.setAttribute("id", "buttonPoserUneOperation");
        buttonConfiguration.setAttribute("class", "buttonPoseurOperation");
        buttonConfiguration.setAttribute("style", stylebuttonConfiguration);
        buttonConfiguration.setAttribute("title", "Configuration de l'application");
        var imageConfig = document.createElement("img");
        imageConfig.setAttribute("src", "./img/config2.png");
        imageConfig.setAttribute("style", "width: 21px;");
        buttonConfiguration.appendChild(imageConfig);
        content.appendChild(buttonConfiguration);


        /**
         * @event
         * @param {MyEventObject} e 
         * @requires 
         */
        buttonConfiguration.addEventListener("click", function(e) {
            document.location.href = "config.html";
        }, false);



    }
    // ------------------ Post-it ------------------
    {


        /**
         * @description Le div qui va contenir l'élément canvas pour afficher le PostIt.
         * @type ElementDiv
         */
        var enonce = document.createElement("div");
        var stylePostIt = "position: absolute; margin-left: -1px; margin-top: 42px;z-index:1;display:none;";
        enonce.setAttribute("style", stylePostIt);
        enonce.setAttribute("id", "enonceAffice");
        content.appendChild(enonce);

        /**
         * @description Le canvas qui servira à afficher l'énoncé.
         * @type ElementCanvas
         */
        var canvasPostIt = document.createElement("canvas");
        canvasPostIt.setAttribute("width", 200);
        canvasPostIt.setAttribute("height", 200);
        canvasPostIt.setAttribute("id", "canvasElementPosti");
        enonce.appendChild(canvasPostIt);

        /**
         * @description Cette fonction affichera l'énoncé de l'exercice.
         * @param {String} contenuEnonce contient l'énoncé de l'exercice
         */
        function afficherEnonce(contenuEnonce) {
            if (contenuEnonce) {
                document.getElementById(idDiv).querySelector("#enonceAffice").style.display = "run-in";
                var contextPosti = canvasPostIt.getContext('2d');
                var imagePosti = new Image(180, 180);
                imagePosti.src = "./img/PostIt.svg";
                imagePosti.onload = function() {
                    contextPosti.drawImage(imagePosti, 0, 0, imagePosti.width, imagePosti.height);
                    contextPosti.lineWidth = 2;
//            contextPosti.strokeStyle = "rgba(35, 70, 237, .8)";
                    contextPosti.shadowColor = "rgb(190, 190, 190)";
                    contextPosti.shadowOffsetX = 1;
                    contextPosti.shadowOffsetY = 1;
                    contextPosti.font = "10.5pt sans-serif";
                    contextPosti.rotate(-0.05);
                    mots = contenuEnonce.split(' ');
                    ligne = new Array;
                    motsEspace = new Array;
                    for (i = 0; i < mots.length; i++) {
                        essai = mots[i].split('\n');
                        if (essai.length > 1) {
                            motsEspace = motsEspace.concat(essai);
                        }
                        else {
                            motsEspace.push(mots[i]);
                        }
                    }
                    mots = motsEspace;
                    ligne[0] = "";
                    var indexLigne = 0;
                    for (i = 0; i < mots.length; i++) {
                        if (mots[i] == "") {
                            indexLigne++;
                            ligne[indexLigne] = "";
                        }
                        else if ((ligne[indexLigne].length + mots[i].length) < 24) {
                            ligne[indexLigne] += mots[i] + ' ';
                        }
                        else {
                            indexLigne++;
                            ligne[indexLigne] = mots[i] + " ";
                        }

                    }

                    for (i = 0; i < ligne.length; i++) {
                        contextPosti.fillText(ligne[i], 12, 70 + i * 20);
                    }
                };
            }
        }
        ;


    }
    // ------------------ Barre d'outils ------------------
    {


        /**
         * @description Le div qui contient la barre d'outils contenant les chiffres et les opérateurs
         * @private
         * @type ElementDiv
         */
        var divoutil = document.createElement("div");
        var styleMenu = "border:inset 5px #5cbeff;-moz-border-radius: 5px;-webkit-border-radius: 5px;\n\
                    border-radius: 5px;z-index: 5;margin-left: 495px;margin-top: -32px;\n\
                    position: absolute;width: 300px;height: 70px;cursor: pointer;";
        divoutil.setAttribute("style", styleMenu);
        divoutil.setAttribute("id", "barreOutil");


    }
    // ------------------ La barre d'outils ------------------
    {


        /**
         * @description Canvas contenant la barre d'outils
         * @type @exp;document@call;createElement
         */
        var canvasOutil = document.createElement("canvas");
        canvasOutil.setAttribute("width", "300");
        canvasOutil.setAttribute("height", "70");
        canvasOutil.setAttribute("id", "canvasElementOutil");

        var contextOutils = canvasOutil.getContext("2d");
        var imageOutils = new Image(300, 70);
        imageOutils.src = "./img/bareOutil.svg";
        imageOutils.onload = function() {
            contextOutils.drawImage(imageOutils, 0, 0, imageOutils.width, imageOutils.height);
        };

        divoutil.appendChild(canvasOutil);
        content.appendChild(divoutil);

        canvasOutil.onmousedown = function(event) {
            var positionSourcie = getSourisPositionMenuOutils(event);
            var positionBontton = getCoordonneButtonOutils(positionSourcie.x, positionSourcie.y);

            if (coordonneGrilleCourant) {
                if (operationEnCours) {
                    switch (positionBontton.type) {
                        case "chiffre":
                            if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {

                                switch (typeOperation) {
                                    case "addition":
                                        var tmp = getStructureResultatAvantComparaison(typeOperation, operation);
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "h") {
                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, config.param.couleur.couleurRetenue, tailleCase / 2);
                                        }
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "b") {
                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, config.param.couleur.couleurResultat);
                                        }
                                        break;

                                    case "soustraction":
                                        var tmp = getStructureResultatAvantComparaison(typeOperation, operation);

                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "resultat") {
                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, config.param.couleur.couleurResultat);
                                        }
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "retenueBas") {

                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, config.param.couleur.couleurRetenue, tailleCase / 2, tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].position);

                                        }
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "retenueHaut") {
                                            effacerLesDonneeCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "devantChiffreInitial");
                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, config.param.couleur.couleurRetenue, tailleCase / 2, tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].position);

                                        }

                                        break;
                                }

//                            
                            } else {
                                var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
                                            <em style=\"margin-left: 15px;\">Erreur : Vous ne pouvez pas ecrire dans cette zone.<br> Veuillez\n\
                                            ecrire dans les zone autorisé.</em>";
                                var bgcolor = "#FF332F";
                                var textcolor = "#FFFCFB";
                                afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                                listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                            }

                            break;
                        case "action":
                            if (positionBontton.val === "del") {
                                switch (typeOperation) {
                                    case "addition":
                                        effacerEcritureUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                        break;
                                    case "soustraction":
                                        var tmp = getStructureResultatAvantComparaison(typeOperation, operation);
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "resultat") {
                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "", config.param.couleur.couleurResultat);
                                        }
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "retenueBas") {

                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "", config.param.couleur.couleurRetenue, tailleCase / 2, tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].position);

                                        }
                                        if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "retenueHaut") {

                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "", config.param.couleur.couleurRetenue, tailleCase / 2, tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].position);

                                        }
                                        break;
                                }

                            }
                            if (positionBontton.val === "equal") {

                                afficherResultatOperation(typeOperation);
                            }
                            break;
                        case "operateur":
                            if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {
                                if (positionBontton.val == ",") {
                                    ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, positionBontton.val, "black");
                                }
                            } else {
                                var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
                                            <em style=\"margin-left: 15px;\">Erreur : Vous ne pouvez pas ecrire dans cette zone.<br> Veuillez\n\
                                            ecrire dans les zone autorisé.</em>";
                                var bgcolor = "#FF332F";
                                var textcolor = "#FFFCFB";
                                afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                                dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                                listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
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
                alert("Veuillez selectionner d'abord une cellule");
            }
        };


        /**
         * @private
         * @description Fonction pour obtenir les coordonnées dans le div du bare d'outils
         * @param {interger} x coordonnée en x par rapport à l'element canvasOutil 
         * @param {interger} y coordonnée en y par rapport à l'element canvasOutil
         * @returns {(x,y)}
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
                    return {x: 261, y: 35, val: ",", type: "operateur"};
                }
            }
        }
        ;

        /**
         * @description Obtenir les coordonnées par rapport à l'interieur du div de la barre d'outils
         * @param {event} event
         * @returns {(x,y)} 
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
        ;


    }
    // ------------------ La grille ------------------
    {

        /**
         * @private
         * @description Création du div "grille" qui contiendra la grille
         * @type ElementDiv
         */
        var grille = document.createElement("div");
        grille.setAttribute("id", "grille");


        /**
         * @private
         * @description Création d'un élément canvas, dans le quel sera déssiné la grille.
         * @type ElementCanvas
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

        /**
         * @private
         * @description Appelle de la méthode getContext, il sera l'élément 
         * central de gestion de Canvas.
         * @type Context2d
         */
        var contextCanvasGrille = canvasGrille.getContext("2d");

        /**
         * @description C'est la longueur et largueur d'une cellule de la grille
         * @constant
         * @public
         * @type Number 
         */
        var tailleCase = config.param.cellule.tailleCellule;
        var tailleContourCase = config.param.cellule.tailleContour;
        var tailleCaseAvecContour = tailleContourCase + tailleCase;
        /**
         * @description Contient les coordonnées de chaque cellule de la grille
         * @public
         * @type Array 
         */
        var tableauDeGrille = [];

        /**
         * @description Contient toujours les coordonnée de la dernière cellule selectionné dans la grille.
         * @private
         * @default {(0,0)}
         * @type {(x,y)} 
         */
        var dernierCelluleSelectionne = {x: 0, y: 0};

        /**
         * @description Contient toujours les coordonnées de la cellule canvas sélectionné
         * @private
         * @type {(x,y)} 
         */
        var canvasCelluleSelectionne;

        /**
         * @description Contient les coordonnées des diffentes cellules où il y a eu des affichages de message d'érreur
         * @private
         * @type Array
         */
        var listeErreurSimple = [];

        /**
         * @description Ce tableau contient les valeurs de chaque cellule à tout moment
         * @type Array 
         */
        var listeDonneeDeChaqueCellule = {};

        /**
         * @description Contient l'information du type de correction qui en cours
         * @private
         * @type String
         */
        var typeDeCorrection;

        var infosGrille = {
            col: parseInt(widthCanvas / tailleCaseAvecContour),
            lin: parseInt(heightCanvas / tailleCaseAvecContour),
            tailleVerticale: parseInt(heightCanvas / tailleCaseAvecContour) * tailleCaseAvecContour - 2,
            tailleHorizontale: parseInt(widthCanvas / tailleCaseAvecContour) * tailleCaseAvecContour - 2,
        };
        if ((widthCanvas - infosGrille.col * tailleCaseAvecContour) >= tailleCase) {
            infosGrille.col = infosGrille.col + 1;
        }
        ;
        if ((heightCanvas - infosGrille.lin * tailleCaseAvecContour) >= tailleCase) {
            infosGrille.lin = infosGrille.lin + 1;
        }
        ;
        var styleGrille = "position: relative;background-color: #CCBEBE;border: 2px solid #CCBEBE;bottom: -50px;margin-left: auto;margin-right: auto;height: " + infosGrille.tailleVerticale + "px;width: " + infosGrille.tailleHorizontale + "px";
        grille.setAttribute("style", styleGrille);


        /**
         * Ici nous dessinons la grille et on stocke dans tableauDeGrille les coordonnées de chaque cellule
         */
        contextCanvasGrille.fillStyle = "#fff";
        for (var i = 0; i < infosGrille.col; i++) {
            for (var j = 0; j < infosGrille.lin; j++) {
                contextCanvasGrille.fillRect(i * tailleCaseAvecContour, j * tailleCaseAvecContour, tailleCase, tailleCase);
                tableauDeGrille.push({x: i * tailleCaseAvecContour, y: j * tailleCaseAvecContour});
                listeDonneeDeChaqueCellule[String(i * tailleCaseAvecContour) + "_" + String(j * tailleCaseAvecContour)] = "";
            }
        }
        ;

        /**
         * @description Cette function dessine la marge
         */
        function dessinerMarge() {
            if (tailleCase <= 50) {
                contextCanvasGrille.fillStyle = config.param.couleur.couleurMarge;
                contextCanvasGrille.fillRect(tailleCaseAvecContour * 4 - tailleContourCase, 0, tailleContourCase, infosGrille.tailleVerticale);
            } else {
                contextCanvasGrille.fillStyle = config.param.couleur.couleurMarge;
                contextCanvasGrille.fillRect(tailleCaseAvecContour * 3 - tailleContourCase, 0, tailleContourCase, infosGrille.tailleVerticale);
            }

        }
        ;

        /**
         * @description On dessine la marge
         * @constructs 
         */
        dessinerMarge();

        /**
         * On insert la div.grille dans le div.content 
         */
        content.appendChild(grille);


    }
    // ------------------ Controle des cellules de la grille ------------------
    {

        /**
         * @description Cette funtion nous retourne la valeur d'une cellule en lui passant en paramètre les coordonnées de celui-ci
         * @param {integer} x coordonnée en x par rapport à la grille 
         * @param {integer} y coordonnée en y par rapport à la grille 
         * @see recupererCordonneeCaseCourante
         * @returns {string} valeur de la cellule
         */
        function getValeurUneCellule(x, y, valeurSupplementaire) {
            if (!valeurSupplementaire) {
                return listeDonneeDeChaqueCellule[String(x) + "_" + String(y)];
            } else {
                return listeDonneeDeChaqueCellule[String(x) + "_" + String(y) + "_valeurSupplementaire"];
            }
        }
        ;

        /**
         * @description Cette fonction enregistre la valeur d'une cellule
         * @param {integer} x coordonnée en x par rapport à la grille 
         * @param {integer} y coordonnée en y par rapport à la grille 
         * @see recupererCordonneeCaseCourante
         * @param {integer} val nouvelle valeur de la cellule
         */
        function setValeurUneCellule(x, y, val, valeurSupplementaire) {
            if (!valeurSupplementaire) {
                listeDonneeDeChaqueCellule[String(x) + "_" + String(y)] = String(val);
            } else {
                listeDonneeDeChaqueCellule[String(x) + "_" + String(y) + "_valeurSupplementaire"] = String(valeurSupplementaire);
            }
        }
        ;

        /**
         * @description Cette fonction nous donne la position de la souris par rapport à l'élement canvas.canvasGrille.
         * Le point de référence (0,0) est situé en haut à gauche
         * L'axe horizontal (x) est défini par la première coordonée
         * L'axe vertical (y) est défini par la seconde coordonnée
         * Ces valeurs correspondent à la grille entourant les pixels, et non pas aux pixels eux-mêmes
         * 
         * @param {event} event venement lié au clavier clavier
         * @requires canvasGrille
         * @returns {(x,y)} coordonnée de la souris
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
        ;

        /**
         * @description Cette fonction prend en entrée les coordonnées de la souris 
         * par rapport au canvasGrille et retourne les coordonnées en X et Y 
         * de la cellule courante
         * @param {integer} x coordonnée en x de la souris
         * @param {integer} y coordonnée en y de la souris
         * @see getSourisPosition
         * @returns {(x,y)} coordonnée de la cellule où se trouve la souris
         */
        function recupererCordonneeCaseCourante(x, y) {
            var coordX = 0;
            var coordY = 0;
            for (i = 0; i < tableauDeGrille.length - 1; i++) {

                if (x >= tableauDeGrille[i].x && x <= tableauDeGrille[i + 1].x) {
                    coordX = tableauDeGrille[i].x;
                }
                if (y >= tableauDeGrille[i].y && y <= tableauDeGrille[i + 1].y) {
                    coordY = tableauDeGrille[i].y;
                }

            }
            return {x: coordX, y: coordY};
        }
        ;

        /**
         * @description Cette fonction prend en entrer les coordonnées d'une cellule 
         * et dessine un contour d'épaisseur 2px selon la couleur aussi passée en paramètre
         * @param {integer} x coordonnée de la cellule en x
         * @param {integer} y coordonnée de la cellule en y
         * @see recupererCordonneeCaseCourante
         * @param {type} couleur couleur du contour
         * @requires contextCanvasGrille
         */
        function dessineContour(x, y, couleur) {
            //Nous traçons coté par poté
            //L'épaisseur de la tracé
            contextCanvasGrille.lineWidth = tailleContourCase;
            //Début de la tracé
            contextCanvasGrille.beginPath();
            //Le tracé part du point (x-1,y)
            contextCanvasGrille.moveTo(x - tailleContourCase / 2, y);
            //Un segment est ajouté vers (x - 1, y + tailleCase)
            contextCanvasGrille.lineTo(x - tailleContourCase / 2, y + tailleCase);
            //Choix de la coulour
            contextCanvasGrille.strokeStyle = couleur;
            //Fin de la tracé
            contextCanvasGrille.stroke();

            contextCanvasGrille.lineWidth = tailleContourCase;
            contextCanvasGrille.beginPath();
            contextCanvasGrille.moveTo(x - tailleContourCase / 2 + tailleCaseAvecContour, y);
            contextCanvasGrille.lineTo(x - tailleContourCase / 2 + tailleCaseAvecContour, y + tailleCase);
            contextCanvasGrille.strokeStyle = couleur;
            contextCanvasGrille.stroke();

            contextCanvasGrille.lineWidth = tailleContourCase;
            contextCanvasGrille.beginPath();
            contextCanvasGrille.moveTo(x, y - tailleContourCase / 2);
            contextCanvasGrille.lineTo(x + tailleCase, y - tailleContourCase / 2);
            contextCanvasGrille.strokeStyle = couleur;
            contextCanvasGrille.stroke();

            contextCanvasGrille.lineWidth = tailleContourCase;
            contextCanvasGrille.beginPath();
            contextCanvasGrille.moveTo(x, y - tailleContourCase / 2 + tailleCaseAvecContour);
            contextCanvasGrille.lineTo(x + tailleCase, y - tailleContourCase / 2 + tailleCaseAvecContour);
            contextCanvasGrille.strokeStyle = couleur;
            contextCanvasGrille.stroke();

            dessinerMarge();
        }
        ;

        /**
         * @description Cette fonction prend en entrer les coordonnées d'une cellule et efface son coutour de 2px.
         * Elle appelle aussi la fonction dessinerMarge() redessiner la marge au cas si elle a été effacer.
         * @param {integer} x coordonnée de la cellule en x
         * @param {integer} y coordonnée de la cellule en y
         * @see recupererCordonneeCaseCourante
         * @see dessinerMarge
         */
        function effacerContour(x, y) {
            contextCanvasGrille.clearRect(x - tailleContourCase, y - tailleContourCase, tailleCaseAvecContour, tailleContourCase);
            contextCanvasGrille.clearRect(x - tailleContourCase, y - tailleContourCase, tailleContourCase, tailleCaseAvecContour);
            contextCanvasGrille.clearRect(x - tailleContourCase, y + tailleCase, tailleCaseAvecContour, tailleContourCase);
            contextCanvasGrille.clearRect(x + tailleCase, y - tailleContourCase, tailleContourCase, tailleCaseAvecContour);

            dessinerMarge();
        }
        ;

        /**
         * @description Cette fonction prend les coordonnées d'une cellule, un caractère, une couleur et ecrit le carectère
         * dans la cellule avec une taille police 30px et de couleur celui passé en paramètre.
         * @param {integer} x coordonnée de la cellule en x
         * @param {integer} y coordonnée de la cellule en y
         * @param {string} caractere le caractère qui doit être ecrit
         * @param {string} couleur la couleur de l'ecriture
         * @
         */
        function ecrireDansUneCellule(x, y, caractere, couleur, taileEcriture, exception) {
            if (!arguments[5]) {
                effacerLesDonneeCellule(x, y);
                contextCanvasGrille.fillStyle = couleur;
                contextCanvasGrille.textAlign = "center";
                contextCanvasGrille.textBaseline = "top";
                taillePasserEnParametre = true;
                if (!taileEcriture) {
                    taileEcriture = tailleCase - tailleCase / 6;
                    taillePasserEnParametre = false;
                }
                contextCanvasGrille.font = "bold " + String(taileEcriture) + "px sans-serif";
                if (taillePasserEnParametre) {
                    contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y + tailleCase / 4);
                } else {
                    contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y);
                }

                setValeurUneCellule(x, y, caractere);
            } else {
                switch (exception) {
                    case "auDessusDeLaBarre":
                        effacerLesDonneeCellule(x, y, exception);
                        contextCanvasGrille.fillStyle = couleur;
                        contextCanvasGrille.textAlign = "center";
                        contextCanvasGrille.textBaseline = "top";
                        taillePasserEnParametre = true;
                        if (!taileEcriture) {
                            taileEcriture = tailleCase - tailleCase / 6;
                            taillePasserEnParametre = false;
                        }
                        contextCanvasGrille.font = "bold " + String(taileEcriture) + "px sans-serif";
                        if (taillePasserEnParametre) {
                            contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y);
                        } else {
                            contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y);
                        }
                        setValeurUneCellule(x, y, caractere);

                        break;
                    case "devantChiffreInitial":
                        effacerLesDonneeCellule(x, y, exception);
                        contextCanvasGrille.fillStyle = couleur;
                        contextCanvasGrille.textAlign = "left";
                        contextCanvasGrille.textBaseline = "top";
                        taillePasserEnParametre = true;
                        if (!taileEcriture) {
                            taileEcriture = tailleCase - tailleCase / 6;
                            taillePasserEnParametre = false;
                        }
                        contextCanvasGrille.font = "bold " + String(taileEcriture) + "px sans-serif";
                        if (taillePasserEnParametre) {
                            contextCanvasGrille.fillText(caractere, x, y + tailleCase / 2);
                        } else {
                            contextCanvasGrille.fillText(caractere, x, y + tailleCase / 2);
                        }
                        setValeurUneCellule(x, y, "", caractere);

                        break;
                }
            }
        }
        ;

        /**
         * @description 
         * @param {type} x
         * @param {type} y
         * @param {type} caractere
         * @param {type} couleurText
         * @param {type} couleurTransparence
         */
        function ecrireDansUneCelluleAvecTransparance(x, y, caractere, couleurText, couleurTransparence, tailleEcriture, exception) {
            if (!arguments[6]) {
                effacerEcritureUneCelluleException(x, y, couleurTransparence);
                contextCanvasGrille.fillStyle = couleurText;
                contextCanvasGrille.textAlign = "center";
                contextCanvasGrille.textBaseline = "top";
                taillePasserEnParametre = true;
                if (!tailleEcriture) {
                    tailleEcriture = tailleCase - tailleCase / 6;
                    taillePasserEnParametre = false;
                }
                contextCanvasGrille.font = "bold " + String(tailleEcriture) + "px sans-serif";
                if (taillePasserEnParametre) {
                    contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y + tailleCase / 4);
                } else {
                    contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y);
                }

                contextCanvasGrille.fillStyle = couleurTransparence;
                contextCanvasGrille.fillRect(x, y, tailleCase, tailleCase);
                setValeurUneCellule(x, y, caractere);
            } else {
                switch (exception) {
                    case "auDessusDeLaBarre":
                        contextCanvasGrille.fillStyle = couleurText;
                        contextCanvasGrille.textAlign = "center";
                        contextCanvasGrille.textBaseline = "top";
                        taillePasserEnParametre = true;
                        if (!tailleEcriture) {
                            tailleEcriture = tailleCase - tailleCase / 6;
                            taillePasserEnParametre = false;
                        }
                        contextCanvasGrille.font = "bold " + String(tailleEcriture) + "px sans-serif";
                        if (taillePasserEnParametre) {
                            contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y);
                        } else {
                            contextCanvasGrille.fillText(caractere, x + tailleCase / 2, y);
                        }

                        contextCanvasGrille.fillStyle = couleurTransparence;
                        contextCanvasGrille.fillRect(x, y, tailleCase, tailleCase / 2);
                        setValeurUneCellule(x, y, caractere);

                        break;
                    case "devantChiffreInitial":
                        effacerLesDonneeCellule(x, y, exception);
                        contextCanvasGrille.fillStyle = couleurText;
                        contextCanvasGrille.textAlign = "left";
                        contextCanvasGrille.textBaseline = "top";
                        taillePasserEnParametre = true;
                        if (!tailleEcriture) {
                            tailleEcriture = tailleCase - tailleCase / 6;
                            taillePasserEnParametre = false;
                        }
                        contextCanvasGrille.font = "bold " + String(tailleEcriture) + "px sans-serif";
                        if (taillePasserEnParametre) {
                            contextCanvasGrille.fillText(caractere, x, y + tailleCase / 2);
                        } else {
                            contextCanvasGrille.fillText(caractere, x, y + tailleCase / 2);
                        }
                        contextCanvasGrille.fillStyle = couleurTransparence;
                        contextCanvasGrille.fillRect(x, y + tailleCase / 2, tailleCase / 3, tailleCase / 2);
                        setValeurUneCellule(x, y, "", caractere);
                        break;

                }
            }
        }
        ;
        /**
         * @private
         * @description Cette fonction prend les coordonnées d'une cellule et efface le caractère ecrit à l'intérieur.
         * @param {type} x
         * @param {type} y
         */
        function effacerEcritureUneCellule(x, y) {
            contextCanvasGrille.fillStyle = "#fff";
            contextCanvasGrille.fillRect(x, y, tailleCase, tailleCase);
            setValeurUneCellule(x, y, "");
        }
        ;
        /**
         * @private
         * @description tex
         * @param {type} x
         * @param {type} y
         * @param {type} couleur
         * @returns {undefined}
         */
        function effacerEcritureUneCelluleException(x, y, couleur) {
            contextCanvasGrille.fillStyle = couleur;
            contextCanvasGrille.fillRect(x, y, tailleCase, tailleCase);
            setValeurUneCellule(x, y, "");
        }
        ;
        /**
         * @private
         * @description tex
         * @param {type} x
         * @param {type} y
         * @returns {undefined}
         */
        function effacerLesDonneeCellule(x, y, exception) {
            if (!arguments[2]) {
                contextCanvasGrille.clearRect(x, y, tailleCase, tailleCase);
                contextCanvasGrille.fillStyle = "#fff";
                contextCanvasGrille.fillRect(x, y, tailleCase, tailleCase);
                setValeurUneCellule(x, y, "");
            } else {
                switch (exception) {
                    case "auDessusDeLaBarre":
                        contextCanvasGrille.clearRect(x, y, tailleCase, tailleCase / 2);
                        contextCanvasGrille.fillStyle = "#fff";
                        contextCanvasGrille.fillRect(x, y, tailleCase, tailleCase / 2);
                        setValeurUneCellule(x, y, "");
                        break;
                    case "devantChiffreInitial":
                        contextCanvasGrille.clearRect(x, y + tailleCase / 2, tailleCase / 3, tailleCase / 2);
                        contextCanvasGrille.fillStyle = "#fff";
                        contextCanvasGrille.fillRect(x, y + tailleCase / 2, tailleCase / 3, tailleCase / 2);
                        setValeurUneCellule(x, y, "", " ");
                        break;
                }
            }
        }
        ;
        /**
         * @private
         * @description tex
         * @param {type} x
         * @param {type} y
         * @param {type} couleur
         * @returns {undefined}
         */
        function dessinerBaseOperation(x, y, couleur) {

            contextCanvasGrille.lineWidth = tailleContourCase * 2;
            contextCanvasGrille.beginPath();
            contextCanvasGrille.moveTo(x, y - tailleContourCase / 2 + 2 * tailleCase / 3);
            contextCanvasGrille.lineTo(x + tailleCase, y - tailleContourCase / 2 + 2 * tailleCase / 3);
            contextCanvasGrille.strokeStyle = couleur;
            contextCanvasGrille.stroke();
        }
        ;

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
                    if (tableauDesCelluleAutorise[taille].statu) {
                        active = true;
                    }

                }
                taille++;

            }
            return active;
        }
        ;

    }
    // ------------------ Partie indéfinie ------------------
    {

        /**
         * @private
         * @description tex
         * @param {type} x
         * @param {type} y
         * @param {type} r
         * @param {type} color
         * @returns {undefined}
         */
        function chargerImageContourError(x, y, r, color) {
            contextCanvasGrille.beginPath();
            contextCanvasGrille.arc(x + tailleCase / 2, y + tailleCase / 2, (tailleCase / 2) - 1, r, Math.PI * 2, true);
            if (color === "white") {
                contextCanvasGrille.lineWidth = tailleContourCase + 0.5;
            } else {
                contextCanvasGrille.lineWidth = tailleContourCase;
            }
            contextCanvasGrille.strokeStyle = color;
            contextCanvasGrille.stroke();

        }
        ;

        /**
         * @private
         * @description tex
         * @type type
         */
        var tableauRadiumIncrementation = {};
        /**
         * @private
         * @description tex
         * @type type
         */
        var tableauDesImagesAnnimer = {};
        /**
         * @private
         * @description text
         * @constant
         * @type Number
         */
        var r = 1;
        function annimerIgame(x, y) {
            if (!tableauRadiumIncrementation[x + "_" + y]) {
                tableauRadiumIncrementation[x + "_" + y] = {r: r};
            }
            chargerImageContourError(x, y, 0, "white")
            chargerImageContourError(x, y, tableauRadiumIncrementation[x + "_" + y].r, "#FC0E0E");
            if (tableauRadiumIncrementation[x + "_" + y].r <= 5) {
                tableauRadiumIncrementation[x + "_" + y].r = 0.5 + tableauRadiumIncrementation[x + "_" + y].r;
            } else {
                tableauRadiumIncrementation[x + "_" + y].r = 0;
            }

        }
        ;

        /**
         * @private
         * @description text
         * @param {type} x
         * @param {type} y
         * @returns {unresolved}
         */
        function commencerAnnimation(x, y) {
            return setInterval(function() {
                annimerIgame(x, y);
            }, 100);
        }
        ;
        /**
         * 
         * @type type
         */
        var tableauContourErreurColonne = {};


        if (tailleCase < 50) {
            postYContante = tailleCaseAvecContour * 3;
        } else {
            postYContante = tailleCaseAvecContour * 2;
        }
        /**
         * 
         * @param {type} x
         * @param {type} longueurColonne
         * @param {type} couleur
         * @returns {undefined}
         */
        function contourErreurColonne(x, longueurColonne, couleur) {
            var rw = tailleCase;
            var rh = parseInt(longueurColonne) * (tailleCase + 2);
            if (!tableauContourErreurColonne["colonne_" + x]) {
                tableauContourErreurColonne["colonne_" + x] = {canvas: document.createElement("canvas"), context: "", x: x};
                heigth = postYContante + 32;
                var canvasColonneStyle = "position: absolute;z-index: 2;margin-left: " + x + "px;margin-top: " + heigth + "px;";
                tableauContourErreurColonne["colonne_" + x].canvas.setAttribute("width", rw);
                tableauContourErreurColonne["colonne_" + x].canvas.setAttribute("height", rh);
                tableauContourErreurColonne["colonne_" + x].canvas.setAttribute("id", "colonneErreur_" + x);
                tableauContourErreurColonne["colonne_" + x].canvas.setAttribute("style", canvasColonneStyle);
                tableauContourErreurColonne["colonne_" + x].context = tableauContourErreurColonne["colonne_" + x].canvas.getContext("2d");
                grille.appendChild(tableauContourErreurColonne["colonne_" + x].canvas);
            }

            tableauContourErreurColonne["colonne_" + x].context.scale(1, rh / rw);
            tableauContourErreurColonne["colonne_" + x].context.beginPath();
            tableauContourErreurColonne["colonne_" + x].context.arc(rw / 2, 14, 14, 0, 2 * Math.PI, true);
            tableauContourErreurColonne["colonne_" + x].context.lineWidth = "1";
            tableauContourErreurColonne["colonne_" + x].context.strokeStyle = couleur;
            tableauContourErreurColonne["colonne_" + x].context.stroke();
        }
        ;


        /**
         * 
         * @param {type} x
         */
        function effacerContourErreurColonne(x) {
            if (tableauContourErreurColonne["colonne_" + x]) {
                grille.removeChild(tableauContourErreurColonne["colonne_" + x].canvas);
                delete(tableauContourErreurColonne["colonne_" + x]);
            }
        }
        ;

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
            var canvasCelluleGrille = "position: absolute;z-index: 2;margin-left: " + x + "px;margin-top: " + y + "px;background: rgba(100,149,237,0.5);opacity: 0.7;";
            canvasCellule.setAttribute("width", tailleCase);
            canvasCellule.setAttribute("height", tailleCase);
            canvasCellule.setAttribute("id", "cellule_" + x + "_" + y);
            canvasCellule.setAttribute("style", canvasCelluleGrille);
            grille.appendChild(canvasCellule);
        }
        ;
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
        ;

        /**
         * @description Cette fonction, selon le type de navigateur, retourne l'objet 'event' approprié.      * @param {type} _event_
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
        ;

    }
    // ------------------ Contrôle du clavier ------------------
    {

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
            KEY_TAB = 9;
            if (intKeyCode === KEY_ENTER) {
                return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "droit", "type": "direction"};
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
            if ((intKeyCode >= 37 && intKeyCode <= 40) || (intKeyCode == KEY_TAB)) {
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
                    case 9:
                        return {"intKeyCode": intKeyCode, "intAltKey": intAltKey, "intCtrlKey": intCtrlKey, "val": "droit", "type": "direction"};
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
        ;

        /**
         * @description contient toujours les coordonnées de la cellule ou se trouvre le curseur
         * @type {(x,y)}
         */
        var coordonneGrilleCourant;

        /**
         * @private
         * @description text
         * @param {event} event
         */
        function traiterEntreeClavier(event) {
            //On appelle la fonction clavier qui nous retourne un Object(intKeyCode,intAltKey,intCtrlKey,val,type)
            var donnekey = clavier(event);

            if (operationEnCours) {
                switch (donnekey.type) {

                    case "chiffre":
                        if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {

                            switch (typeOperation) {
                                case "addition":
                                    var tmp = getStructureResultatAvantComparaison(typeOperation, operation);
                                    if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "h") {
                                        ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, config.param.couleur.couleurRetenue, tailleCase / 2);
                                    }
                                    if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "b") {
                                        ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, config.param.couleur.couleurResultat);
                                    }
                                    break;

                                case "soustraction":
                                    var tmp = getStructureResultatAvantComparaison(typeOperation, operation);

                                    if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "resultat") {
                                        ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, config.param.couleur.couleurResultat);
                                    }
                                    if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "retenueBas") {

                                        ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, config.param.couleur.couleurRetenue, tailleCase / 2, tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].position);

                                    }
                                    if (tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].line === "retenueHaut") {

                                        ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, config.param.couleur.couleurRetenue, tailleCase / 2, tmp.object[coordonneGrilleCourant.x + "_" + coordonneGrilleCourant.y].position);

                                    }

                                    break;
                            }
                            effacerDivForTooltip(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                            effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);

                        } else {
                            var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
                        <em style=\"margin-left: 15px;\">Erreur : Vous ne pouvez pas écrire dans cette zone.<br> Veuillez\n\
                        écrire dans la zone autorisée.</em>";
                            var bgcolor = "#FF332F";
                            var textcolor = "#FFFCFB";
                            afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                            dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                            listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                        }
                        break;
                    case "operateur":
                        switch (typeOperation) {
                            case "addition":
                                switch (donnekey.val) {
                                    case "equal":


                                        afficherResultatOperation("addition");

                                        break;
                                    case ",":
                                        if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {
                                            ecrireDansUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y, donnekey.val, "#000");
                                        }
                                        break;

                                }
                                break;
                        }
                        effacerDivForTooltip(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                        effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                        break;
                    case "action":
                        switch (donnekey.val) {

                            case "del":
                                if (verifierQueLaCelluleEstActive(coordonneGrilleCourant.x, coordonneGrilleCourant.y)) {
                                    effacerEcritureUneCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    effacerDivForTooltip(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    ecrireDansUneCelluleAvecTransparance(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "", "white", "rgba(163, 209, 157, 0.3)");

                                } else {
                                    var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
                                <em style=\"margin-left: 15px;\">Erreur : Vous ne pouvez pas écrire dans cette zone.<br> Veuillez\n\
                                écrire dans la zone autorisée.</em>";
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

                    case "direction":
                        effacerErreurTooltipSimple();
                        switch (donnekey.val) {
                            case "droit":
                                if (coordonneGrilleCourant.x >= 0 && coordonneGrilleCourant.x < (tailleCaseAvecContour * (infosGrille.col - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.x = coordonneGrilleCourant.x + tailleCase + tailleContourCase;
                                    effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                }
                                break;
                            case "gauche":
                                if (coordonneGrilleCourant.x > 0 && coordonneGrilleCourant.x <= (tailleCaseAvecContour * (infosGrille.col - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.x = coordonneGrilleCourant.x - tailleCase - tailleContourCase;
                                    effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                }
                                break;
                            case "haut":
                                if (coordonneGrilleCourant.y > 0 && coordonneGrilleCourant.y <= (tailleCaseAvecContour * (infosGrille.lin - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.y = coordonneGrilleCourant.y - tailleCase - tailleContourCase;
                                    effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                }
                                break;
                            case "bas":
                                if (coordonneGrilleCourant.y >= 0 && coordonneGrilleCourant.y < (tailleCaseAvecContour * (infosGrille.lin - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.y = coordonneGrilleCourant.y + tailleCase + tailleContourCase;
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

//                     Cette catégorie est la liste de touche intergie, à l'anclachement un message s'affiche dans la grille
//                     sous forme d'un tooltip qui signale à l'utilisateur d'utiliser les bonnes touche.
//                     Le contour de la cellule devient rouge

                    case "interdit":
                        var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
                    <em style=\"margin-left: 15px;\">Erreur : Seuls les caractères numériques sont permis <br> dans cette cellule. \n\
                    Exemple : 0, 1, 2, 5 etc...</em>";
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

                        //Dans cette categorie nous avons le touche Echap, Entrer et Delete

                    case "action":
                        switch (donnekey.val) {

                            //Delete efface l'ecriture d'une cellule selectionné

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

                        //Cette actegorie nous permet de deplacer le selectionneur de cellule grace aux touche directionnel du clavier.

                    case "direction":
                        effacerErreurTooltipSimple();
                        switch (donnekey.val) {
                            case "droit":
                                if (coordonneGrilleCourant.x >= 0 && coordonneGrilleCourant.x < (tailleCaseAvecContour * (infosGrille.col - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.x = coordonneGrilleCourant.x + tailleCase + tailleContourCase;
                                    effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                }
                                break;
                            case "gauche":
                                if (coordonneGrilleCourant.x > 0 && coordonneGrilleCourant.x <= (tailleCaseAvecContour * (infosGrille.col - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.x = coordonneGrilleCourant.x - tailleCase - tailleContourCase;
                                    effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                }
                                break;
                            case "haut":
                                if (coordonneGrilleCourant.y > 0 && coordonneGrilleCourant.y <= (tailleCaseAvecContour * (infosGrille.lin - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.y = coordonneGrilleCourant.y - tailleCase - tailleContourCase;
                                    effacerContour(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    supprimerCanvasCellule(dernierCelluleSelectionne.x, dernierCelluleSelectionne.y);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "green");
                                    creerCanvasCellule(coordonneGrilleCourant.x, coordonneGrilleCourant.y);
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                }
                                break;
                            case "bas":
                                if (coordonneGrilleCourant.y >= 0 && coordonneGrilleCourant.y < (tailleCaseAvecContour * (infosGrille.lin - 1))) {
                                    dernierCelluleSelectionne.x = coordonneGrilleCourant.x;
                                    dernierCelluleSelectionne.y = coordonneGrilleCourant.y;
                                    coordonneGrilleCourant.y = coordonneGrilleCourant.y + tailleCase + tailleContourCase;
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

//                     Cette catégorie est la liste de touche intergie, à l'anclachement un message s'affiche dans la grille
//                     sous forme d'un tooltip qui signale à l'utilisateur d'utiliser les bonnes touche.
//                     Le contour de la cellule devient rouge

                    case "interdit":
                        var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
                    <em style=\"margin-left: 15px;\">Erreur : Seuls les caractères numériques sont permis <br> dans cette cellule. \n\
                    Exemple : 0, 1, 2, 5 etc...</em>";
                        var bgcolor = "#FF332F";
                        var textcolor = "#FFFCFB";
                        afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                        dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                        listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                        break;
                }
            }
        }
        ;
        /**
         * @description Correspond à l'évenement declancher quand on click dans la grille
         * @event 
         * @param {type} event
         */
        canvasGrille.onmousedown = function(event) {

            // On appelle la @function getSourisPosition qui nous donne position de la sourie

            var positionGrilleCanvas = getSourisPosition(event);

            // On appelle la fonction recupererCordonneeCaseCourante pour recuperer les coordonnées de la cellule selectionnée

            coordonneGrilleCourant = recupererCordonneeCaseCourante(positionGrilleCanvas.x, positionGrilleCanvas.y);


            //On verifie qu'on n'a pas clické que la même cellule

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
                    document.onkeydown = function(evt) {

                        if ((evt.keyCode >= 37 && evt.keyCode <= 40) || (evt.keyCode == 9)) {
                            traiterEntreeClavier(evt);
                        }
                        else if (!window.devicePixelRatio) {
                            traiterEntreeClavier(evt);
                        }
                        else {
                            document.onkeypress = function(evt2) {
                                if ((evt2.keyCode >= 37 && evt2.keyCode <= 40) || (evt2.keyCode == 34) || (evt2.keyCode == 33)) {
                                    var message = "<img style=\"position: absolute;margin-left: -16px;margin-top: -8px;\" src=\"./img/icone_erreur.png\"/>\n\
			                    <em style=\"margin-left: 15px;\">Erreur : seul les caractères numerique sont permise <br> dans cette cellule. \n\
			                    Exemple : 0, 1, 2, 5 etc...</em>";
                                    var bgcolor = "#FF332F";
                                    var textcolor = "#FFFCFB";
                                    afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor);
                                    dessineContour(coordonneGrilleCourant.x, coordonneGrilleCourant.y, "red");
                                    listeErreurSimple.push({x: coordonneGrilleCourant.x, y: coordonneGrilleCourant.y});
                                }
                                else {
                                    traiterEntreeClavier(evt2);
                                }

                            }
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


    }
    // ------------------ Gestion des tooltip + cadre correction ------------------
    {

        function effacerErreurTooltipSimple() {
            for (i = 0; i < listeErreurSimple.length; i++) {
                effacerDivForTooltip(listeErreurSimple[i].x, listeErreurSimple[i].y);
                //effacerContour(listeErreurSimple[i].x, listeErreurSimple[i].y);
            }
        }
        ;

        /**
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
        ;
        /**
         * @description  Cette fonction dessine le tootltip
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
            trouver = false;
            debut = 0;
            for (i = 1; i < infosGrille.col; i++) {
                if (debut <= 500) {
                    if (trouver == false) {
                        debut = i * tailleCaseAvecContour;
                    }
                } else {
                    trouver = true;
                }
            }

            if (posleft >= debut) {
                var vraiPositionLeft = posleft + tailleCase / 2;
                tmp = posleft - debut;
                var vraiPositionTop = postop - tmp / 2;
            } else {
                var vraiPositionLeft = posleft;
                var vraiPositionTop = postop;
            }
            var divToolTip = document.createElement("div");
            if (String(message).length > 150) {
                posleftTmp = vraiPositionLeft - 20;
                postopTmp = vraiPositionTop - 60;
            } else {
                posleftTmp = vraiPositionLeft - 10;
                postopTmp = vraiPositionTop - 50;
            }
            var stypeDivToolTip = "position:absolute;z-index:5; left:" + (posleftTmp) + "px;top:" + (postopTmp) + "px;border-color:" + bordercolor + ";background-color:" + bgcolor + ";color:" + textcolor + ";border-width:" + borderwidth + "px";
            divToolTip.setAttribute("style", stypeDivToolTip);
            divToolTip.setAttribute("class", "tooltip");
            divToolTip.setAttribute("id", "tooltip_" + posleft + "_" + postop);

            //création d'un object canvas pour dessinée la flèche du tooltip
            var canvasToolTip = document.createElement("canvas");
            var styleCanvasToolTip = "position: absolute;bottom:" + tipbot + "px;left: 10%;";
            var widthCanvasToolTip = 28;
            var heightCanvasToolTip = 18;
            canvasToolTip.setAttribute("width", widthCanvasToolTip);
            canvasToolTip.setAttribute("height", heightCanvasToolTip);
            canvasToolTip.setAttribute("id", "tooltip_tip" + posleft + "_" + posleft);
            canvasToolTip.setAttribute("style", styleCanvasToolTip);
            divToolTip.innerHTML = message;

            //On appelle la @function dessineCanvasTooltip pour dessinée la flèche du tootltip

            dessineCanvasTooltip(canvasToolTip, bordercolor);

            // On l'insert dans la grille

            divToolTip.appendChild(canvasToolTip);
            grille.appendChild(divToolTip);
        }
        ;


        /**
         * @description Cette fonction affiche le tootltip
         * @param {type} coordonneGrilleCourant
         * @param {type} message
         * @param {type} bgcolor      * @returns {undefined}
         */
        function afficheMessageTooltip(coordonneGrilleCourant, message, bgcolor, textcolor) {
            var bordercolor = "#666666";
            var borderwidth = "4";
            var posleft = coordonneGrilleCourant.x;
            var postop = coordonneGrilleCourant.y;
            var bordercolor = "#666666";

            var tipbot = -18 + (borderwidth / 4);
            effacerErreurTooltipSimple();
            dessinerDivForTooltip(posleft, postop, bordercolor, bgcolor, borderwidth, textcolor, message, tipbot, bordercolor);

        }
        ;
        /**
         * @description cette fonction prend en entré les coordonnée d'une cellule et efface le tooltip
         * qui lui correspond dans la grille
         * @param {type} x      
         * @param {type} y      
         * */
        function effacerDivForTooltip(x, y) {
            var id_tooltip = "tooltip_" + x + "_" + y;
            var tooltip = grille.querySelector("#" + id_tooltip);
            if (tooltip) {
                grille.removeChild(tooltip);
            }
        }
        ;

        /**
         * @private
         * @description text
         * @returns 
         */
        function effacerCadreCorrection() {
            var spanCorrection = grille.querySelector("#cadreCorrection");
            if (spanCorrection != null) {
                grille.removeChild(spanCorrection);
            }
        }

        /**
         * @private
         * @description text
         * @param {type} objet
         */
        function dessinerCadreCorrection(objet) {
            var nombreMessage = 0;
            var spanCorrection = document.createElement("span");

            if (objet.opt1 == false && objet.opt2 == false && objet.opt3 == false && objet.opt4 == false) {
                effacerCadreCorrection();
                return;
            }
            // Gestion des options
            var styleTexte = "margin:11px";
            if (objet.opt1) {
                texte1 = document.createElement("p");
                texte1.setAttribute("style", styleTexte);
                texte1.innerHTML = "Attention, tu as fait une erreur de calcul.";
                spanCorrection.appendChild(texte1);
                nombreMessage += 1;
            }
            if (objet.opt2) {
                texte1 = document.createElement("p");
                texte1.setAttribute("style", styleTexte);
                texte1.innerHTML = "Attention, tu as fait une erreur de retenue.";
                spanCorrection.appendChild(texte1);
                nombreMessage += 1;
            }
            if (objet.opt3) {
                texte1 = document.createElement("p");
                texte1.setAttribute("style", styleTexte);
                texte1.innerHTML = "Attention, tu as oublié de remplir au moins une case.";
                spanCorrection.appendChild(texte1);
                nombreMessage += 1;
            }
            if (objet.opt4) {
                texte1 = document.createElement("p");
                texte1.setAttribute("style", styleTexte);
                texte1.innerHTML = 'Attention, faute d\'alignement.';
                spanCorrection.appendChild(texte1);
                nombreMessage += 1;
            }
            var hauteurSpan = nombreMessage * 20 + 10;
            var styleSpanCorrection = "position:absolute;z-index:3; left:362px;top:10px;height:" + hauteurSpan + "px;"
            spanCorrection.setAttribute("style", styleSpanCorrection);
            spanCorrection.setAttribute("class", "cadreCorrection");
            spanCorrection.setAttribute("id", "cadreCorrection");

            // Affichage
            grille.appendChild(spanCorrection);
        }



    }
    // ------------------ Correction addition ------------------
    {

        /**
         * @private
         * @description text
         * @type {(boolean,boolean,boolean)}
         */
        var tableauDesTypeErreurs = {};

        var tableauDesContourErreurEnX = {};
        /**
         * @description Variable global dans la qualle on stock les resultats attendu
         * @type Array
         */
        var tableauDesValeursAttendu;

        /**
         *  @description Cette function verifie le champs remplit pendant la correction et aussi les champs déjà remplit.
         */
        var tailleTableauDesImagesAnnimer = 0;

        function suiviCorrectionAddition() {
            var typeError = {opt1: false, opt2: false, opt3: false, opt4: false};


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
                var correct = true;
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
                            if (tableauDesValeursAttendu[i].line == "b") {
                                effacerLesDonneeCellule(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y);
                                ecrireDansUneCelluleAvecTransparance(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y, String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)");
                            }
                            if (tableauDesValeursAttendu[i].line == "h") {
                                effacerLesDonneeCellule(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y);
                                ecrireDansUneCelluleAvecTransparance(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y, String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)", tailleCase / 2);
                            }
                            if (tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y]) {
                                clearInterval(tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].stop);
                                chargerImageContourError(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y, 0, "white");
                                tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].statu = false;
                            }
                        }
                        if (tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y]) {
                            if (tableauDesValeursAttendu[i].line == "b") {
                                tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt1 = false;
                            }
                            if (tableauDesValeursAttendu[i].line == "h") {
                                tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt2 = false;
                            }
                            tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt3 = false;
                        } else {
                            tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y] = {opt1: false, opt2: false, opt3: false, opt4: false};
                        }

                    } else {
                        if (tableauDesValeursAttendu[i].champObligatoire === true) {
                            tableauDesValeursAttendu[i].statu = false;

                            if (courant) {
                                if (tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y]) {
                                    if (tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].statu === false) {
                                        var stopDessinerContour2 = commencerAnnimation(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y);
                                        tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].stop = stopDessinerContour2;
                                        tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].statu = true;
                                    }
                                } else {
                                    var stopDessinerContour3 = commencerAnnimation(tableauDesValeursAttendu[i].x, tableauDesValeursAttendu[i].y);
                                    tableauDesImagesAnnimer[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y] = {stop: stopDessinerContour3, statu: true};
                                }
                                if (tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y]) {
                                    if (tableauDesValeursAttendu[i].line == "b") {
                                        tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt1 = true;
                                    }
                                    if (tableauDesValeursAttendu[i].line == "h") {
                                        tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt2 = true;
                                    }
                                    tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt3 = false;
                                } else {
                                    tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y] = {opt1: false, opt2: false, opt3: false, opt4: false};
                                    if (tableauDesValeursAttendu[i].line == "b") {
                                        tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt1 = true;
                                    }
                                    if (tableauDesValeursAttendu[i].line == "h") {
                                        tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt2 = true;
                                    }
                                }
                            } else {

                                if (tailleTableauDesImagesAnnimer > 1) {
                                    if (tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y]) {
                                        tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y].opt3 = true;
                                    } else {
                                        if (i <= indicemax) {
                                            tableauDesTypeErreurs[tableauDesValeursAttendu[i].x + "_" + tableauDesValeursAttendu[i].y] = {opt1: false, opt2: false, opt3: false, opt4: false};
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (courant) {
                        indicemax = i;
                    }
                    correct = tableauDesValeursAttendu[i].statu;

                }

                if (indicemax) {
                    for (v = 1; v <= indicemax; v++) {
                        if (tableauDesValeursAttendu[v].statu === false && tableauDesValeursAttendu[v].champObligatoire === true) {

                            // dessineContour(tableauDesValeursAttendu[v].x, tableauDesValeursAttendu[v].y, "red");
                            if (!tableauDesImagesAnnimer[tableauDesValeursAttendu[v].x + "_" + tableauDesValeursAttendu[v].y]) {
                                var stopDessinerContour = commencerAnnimation(tableauDesValeursAttendu[v].x, tableauDesValeursAttendu[v].y);
                                tableauDesImagesAnnimer[tableauDesValeursAttendu[v].x + "_" + tableauDesValeursAttendu[v].y] = {stop: stopDessinerContour, statu: true};

                                if (tableauDesTypeErreurs[tableauDesValeursAttendu[v].x + "_" + tableauDesValeursAttendu[v].y]) {
                                    tableauDesTypeErreurs[tableauDesValeursAttendu[v].x + "_" + tableauDesValeursAttendu[v].y].opt3 = true;
                                } else {
                                    tableauDesTypeErreurs[tableauDesValeursAttendu[v].x + "_" + tableauDesValeursAttendu[v].y] = {opt1: false, opt2: false, opt3: true};
                                }
                            }

                        }

                    }
                }

                for (key in tableauDesTypeErreurs) {
                    if (tableauDesTypeErreurs[key].opt1) {
                        typeError.opt1 = true;
                        tab = String(key).split("_");
                        tableauDesContourErreurEnX[tab[0]] = tab[0];
                        break;
                    }
                }
                for (key in tableauDesTypeErreurs) {
                    if (tableauDesTypeErreurs[key].opt2) {
                        typeError.opt2 = true;
                        tab = String(key).split("_");
                        tableauDesContourErreurEnX[tab[0]] = tab[0];
                        break;
                    }
                }
                for (key in tableauDesTypeErreurs) {
                    if (tableauDesTypeErreurs[key].opt3) {
                        typeError.opt3 = true;
                        tab = String(key).split("_");
                        tableauDesContourErreurEnX[tab[0]] = tab[0];
                        break;
                    }
                }
                var spanCorrection = grille.querySelector("#cadreCorrection");
                if (spanCorrection) {
                    effacerCadreCorrection();
                    dessinerCadreCorrection(typeError);
                } else {
                    dessinerCadreCorrection(typeError);
                }

                for (j = 1; j < tableauDesValeursAttendu.length; j++) {
                    if (tableauDesValeursAttendu[j].champObligatoire === true) {
                        if (tableauDesValeursAttendu[j].statu === false) {
                            correct = false;
                            continue;
                        }
                    }
                }
                if (correct) {
                    stropSuiviCorrectionAddition();
                    buttonCorrectionSuivi.innerHTML = "Correction suivi";
                    suiviEnCours = false;
                    alert("Correction terminée!");
                }

                tailleTableauDesImagesAnnimer = 0;
                for (key in tableauDesImagesAnnimer) {
                    tailleTableauDesImagesAnnimer++;
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

        function stropSuiviCorrectionAddition() {
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
                        if (resultat.getPartieDecimale().length == 0) {
                            if (retenu[retenu.length - 1 - i] != 0) {
                                effacerLesDonneeCellule(caseRetenue[caseRetenue.length - 1 - i].x - tailleCaseAvecContour, caseRetenue[caseRetenue.length - 1 - i].y);
                                ecrireDansUneCelluleAvecTransparance(caseRetenue[caseRetenue.length - 1 - i].x - tailleCaseAvecContour, caseRetenue[caseRetenue.length - 1 - i].y, String(retenu[retenu.length - 1 - i]), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat, tailleCase / 2);
                            }
                        } else {
                            if (retenu[retenu.length - 1 - i] != 0) {
                                effacerLesDonneeCellule(caseRetenue[caseRetenue.length - 1 - i].x, caseRetenue[caseRetenue.length - 1 - i].y);
                                ecrireDansUneCelluleAvecTransparance(caseRetenue[caseRetenue.length - 1 - i].x, caseRetenue[caseRetenue.length - 1 - i].y, String(retenu[retenu.length - 1 - i]), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat, tailleCase / 2);
                            }
                        }
                    }

                    tailleMax = resultat.getPartieEntiere().length + resultat.getPartieDecimale().length + 1;
                    v = resultat.getPartieDecimale().length - 1;
                    t = v;
                    u = resultat.getPartieEntiere().length - 1;
                    for (i = caseResultat.length - 1; i >= 0; i--) {
                        if (v >= 0) {
                            effacerLesDonneeCellule(caseResultat[i].x, caseResultat[i].y);
                            ecrireDansUneCelluleAvecTransparance(caseResultat[i].x, caseResultat[i].y, String(resultat.getPartieDecimale()[v]), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat);


                            v--;
                        }
                        if (v === -1) {
                            if (t != -1) {
                                effacerLesDonneeCellule(caseResultat[i - 1].x, caseResultat[i - 1].y);
                                ecrireDansUneCelluleAvecTransparance(caseResultat[i - 1].x, caseResultat[i - 1].y, String(","), "red", config.param.couleur.couleurFondAfficherResultat);
                            }
                            v = -2;
                        }
                        if (v === -2 && u >= 0) {
                            if (t != -1) {
                                effacerLesDonneeCellule(caseResultat[i - 2].x, caseResultat[i - 2].y);
                                ecrireDansUneCelluleAvecTransparance(caseResultat[i - 2].x, caseResultat[i - 2].y, String(resultat.getPartieEntiere()[u]), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat);
                            } else {
                                effacerLesDonneeCellule(caseResultat[i - 1].x, caseResultat[i - 1].y);
                                ecrireDansUneCelluleAvecTransparance(caseResultat[i - 1].x, caseResultat[i - 1].y, String(resultat.getPartieEntiere()[u]), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat);
                            }
                            u--;
                        }
                    }

                    break;
                case "soustraction":
                    var tableauDesResulat = getStructureResultatAvantComparaison(typeOperation, operation);

                    for (key in tableauDesResulat.object) {
                        cleCoordonnee = String(key).split("_");
                        if (tableauDesResulat.object[key].line == "resultat") {
                            effacerLesDonneeCellule(parseInt(cleCoordonnee[0]), parseInt(cleCoordonnee[1]));
                            ecrireDansUneCelluleAvecTransparance(parseInt(cleCoordonnee[0]), parseInt(cleCoordonnee[1]), String(tableauDesResulat.object[key].val), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat);
                        }
                        if (tableauDesResulat.object[key].line == "retenueBas") {
                            if (tableauDesResulat.object[key].val != 0) {
                                ecrireDansUneCelluleAvecTransparance(parseInt(cleCoordonnee[0]), parseInt(cleCoordonnee[1]), String(tableauDesResulat.object[key].val), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat, tailleCase / 2, tableauDesResulat.object[key].position);
                            }
                        }
                        if (tableauDesResulat.object[key].line == "retenueHaut") {
                            if (tableauDesResulat.object[key].val != 0) {
                                ecrireDansUneCelluleAvecTransparance(parseInt(cleCoordonnee[0]), parseInt(cleCoordonnee[1]), String(tableauDesResulat.object[key].val), config.param.couleur.couleurTextAfficherResultat, config.param.couleur.couleurFondAfficherResultat, tailleCase / 2, tableauDesResulat.object[key].position);
                            }
                        }
                    }
                    break;

            }
        }

        /**
         * @private
         * @description text
         */
        function lancerCorrectionSimple() {
            var tableauDesResulat = getStructureResultatAvantComparaison(typeOperation, operation);

            var tableauDesErreurDeCorrection = {};
            var tmp = tableauDesResulat.object;
            var typeErreur = {opt1: false, opt2: false, opt3: false, opt4: false};
            switch (typeOperation) {
                case "addition":
                    console.log("correction simple addition");
                    for (key in tmp) {
                        if (tmp[key].champObligatoire == true) {
                            xy = String(key).split("_");
                            courant = getValeurUneCellule(parseInt(xy[0]), parseInt(xy[1]));
                            val = String(tmp[key].val);
                            if (courant) {
                                if (courant == val) {
                                    if (tmp[key].line == "b") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)");
                                    }
                                    if (tmp[key].line == "h") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)", tailleCase / 2);
                                    }
                                    if (tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]]) {
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "b") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt1 = false;
                                        }
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "h") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt2 = false;
                                        }

                                    } else {
                                        tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]] = {opt1: false, opt2: false, opt3: false, opt4: false};

                                    }
                                } else {
                                    if (tmp[key].line == "b") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)");
                                    }
                                    if (tmp[key].line == "h") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)", tailleCase / 2);
                                    }
                                    if (tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]]) {
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "b") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt1 = true;
                                        }
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "h") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt2 = true;
                                        }
                                    } else {
                                        tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]] = {opt1: false, opt2: false, opt3: false, opt4: false};
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "b") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt1 = true;
                                        }
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "h") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt2 = true;
                                        }
                                    }
                                }
                            } else {
                                if (tmp[key].line == "b") {
                                    effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                    ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), "", config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)");
                                }
                                if (tmp[key].line == "h") {
                                    effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                    ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), "", config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)", tailleCase / 2);
                                }
                                if (tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]]) {
                                    tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt3 = true;
                                } else {
                                    tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]] = {opt1: false, opt2: false, opt3: true};
                                }
                            }
                        }
                    }

                    break;
                case "soustraction":
                    console.log("correction simple soustraction");

                    for (key in tmp) {
                        if (tmp[key].champObligatoire == true) {
                            xy = String(key).split("_");
                            if (tmp[key].line == "retenueHaut") {
                                courant = getValeurUneCellule(parseInt(xy[0]), parseInt(xy[1]), true);
                            } else {
                                courant = getValeurUneCellule(parseInt(xy[0]), parseInt(xy[1]));
                            }
                            val = String(tmp[key].val);
                            if (courant) {
                                if (courant == val) {
                                    if (tmp[key].line == "retenueHaut") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]), tmp[key].position);
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)", tailleCase / 2, tmp[key].position);
                                    }
                                    if (tmp[key].line == "retenueBas") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]), tmp[key].position);
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)", tailleCase / 2, tmp[key].position);
                                    }
                                    if (tmp[key].line == "resultat") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(0, 102, 0, 0.4)");
                                    }
                                    if (tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]]) {
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "retenueBas" || ableauDesResulat.object[xy[0] + "_" + xy[1]].line == "retenueHaut") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt2 = false;
                                        }
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "resultat") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt1 = false;
                                        }

                                    } else {
                                        tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]] = {opt1: false, opt2: false, opt3: false, opt4: false};

                                    }

                                } else {
                                    if (tmp[key].line == "retenueHaut") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]), tmp[key].position);
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)", tailleCase / 2, tmp[key].position);
                                    }
                                    if (tmp[key].line == "retenueBas") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]), tmp[key].position);
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)", tailleCase / 2, tmp[key].position);
                                    }
                                    if (tmp[key].line == "resultat") {
                                        effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                        ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), String(courant), config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)");
                                    }
                                    if (tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]]) {
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "retenueBas" || tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "retenueBas") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt2 = true;
                                        }
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "resultat") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt1 = true;
                                        }
                                    } else {
                                        tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]] = {opt1: false, opt2: false, opt3: false, opt4: false};
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "retenueBas" || tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "retenueBas") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt2 = true;
                                        }
                                        if (tableauDesResulat.object[xy[0] + "_" + xy[1]].line == "resultat") {
                                            tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt1 = true;
                                        }
                                    }
                                }
                            } else {
                                if (tmp[key].line == "retenueHaut") {
                                    effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]), tmp[key].position);
                                    ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), "", config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)", tailleCase / 2, tmp[key].position);
                                }
                                if (tmp[key].line == "retenueBas") {
                                    effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]), tmp[key].position);
                                    ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), "", config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)", tailleCase / 2, tmp[key].position);
                                }
                                if (tmp[key].line == "resultat") {
                                    effacerLesDonneeCellule(parseInt(xy[0]), parseInt(xy[1]));
                                    ecrireDansUneCelluleAvecTransparance(parseInt(xy[0]), parseInt(xy[1]), "", config.param.couleur.couleurResultat, "rgba(255, 0, 0, 0.4)");
                                }
                                if (tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]]) {
                                    tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]].opt3 = true;
                                } else {
                                    tableauDesErreurDeCorrection[xy[0] + "_" + xy[1]] = {opt1: false, opt2: false, opt3: true};
                                }
                            }
                        }
                    }

                    break;
            }

            //Verification et affichage des messages d'erreur
            for (key in tableauDesErreurDeCorrection) {
                if (tableauDesErreurDeCorrection[key].opt1) {
                    typeErreur.opt1 = true;
                    break;
                }
            }
            for (key in tableauDesErreurDeCorrection) {
                if (tableauDesErreurDeCorrection[key].opt2) {
                    typeErreur.opt2 = true;
                    break;
                }
            }
            for (key in tableauDesErreurDeCorrection) {
                if (tableauDesErreurDeCorrection[key].opt3) {
                    typeErreur.opt3 = true;
                    break;
                }
            }
            var spanCorrection = grille.querySelector("#cadreCorrection");
            if (spanCorrection) {
                effacerCadreCorrection();
                dessinerCadreCorrection(typeErreur);
            } else {
                dessinerCadreCorrection(typeErreur);
            }

        }


    }
    // ------------------ Opération à poser librement ------------------
    {
        /**
         * @public
         * @description Cette fonction nous permet de laisser une operation posee par l'élève
         * @param {Addition} addition
         * @param {String} textEnonce 
         */

        this.lancerOperationAPoser = function lancerOperationAPoser(ope, Correction, textEnonce) {
            operation = ope;
            typeDeCorrection = Correction;
            if (operation instanceof Addition) {
                typeOperation = "addition";
            }
            else if (operation instanceof Soustraction) {
                typeOperation = "soustraction";
            }
            operande = operation.getOperande();
            c = '';
            for (i = 0; i < operande.length; i++) {
                c += operande[i].getPartieEntiere().join('');
                if (operande[i].getPartieDecimale().length > 0) {
                    c += ","
                    c += operande[i].getPartieDecimale().join('');
                }
                if (i < operande.length - 1) {
                    if (typeOperation == "addition") {
                        c += " + ";
                    }
                    else if (typeOperation == "soustraction") {
                        c += " - ";
                    }

                }
            }
            enonce2 = "Poser l'opérations \n" + c + " \net cliquer sur \"Corriger alignement\"";
            if (textEnonce == "defaut") {
                afficherEnonce(enonce2);
            } else {
                afficherEnonce(textEnonce);
            }
            console.log(enonce2);
            buttonCorrectionAlignement.setAttribute("style", "");
        }

        function lancerCorrectionAlignement() {
            //Variables locales
            var i = 0;
            var j = 0;
            var operande = operation.getOperande()
            var premierNombreAbscisse;
            var premierNombreOrdonne;
            var finBoucle = true;
            var debutLigneCouranteAbscisse;
            var debutLigneCouranteOrdonne;
            var grilleNonVide = false;
            var colonneVirgule;
            var validation = true;
            var typeError = {opt1: false, opt2: false, opt3: false, opt4: false};

            //Effacer cadre correction
            dessinerCadreCorrection(typeError);


            //Chercher le premier chiffre entré par l'utilisateur
            while (i < (infosGrille.lin - 1) && finBoucle) {
                j = 0;
                while (j < (infosGrille.col - 1)) {
                    if (!isNaN(parseFloat(getValeurUneCellule(j * tailleCaseAvecContour, i * tailleCaseAvecContour)))) {
                        premierNombreAbscisse = i;
                        premierNombreOrdonne = j;
                        finBoucle = false;
                        grilleNonVide = true;
                        break;
                    }
                    j++;
                }
                i++;
            }
            debutLigneCouranteAbscisse = premierNombreAbscisse;
            debutLigneCouranteOrdonne = premierNombreOrdonne;
            // console.log("Premiere case remplie -> i: "+premierNombreAbscisse+", j: "+premierNombreOrdonne+", val: "+getValeurUneCellule(premierNombreOrdonne*tailleCaseAvecContour, premierNombreAbscisse*tailleCaseAvecContour));

            if (grilleNonVide) {

                //Vérifier que le nombre soit correctement placé
                for (i = 0; i < operande.length; i++) {
                    i2 = (i + debutLigneCouranteAbscisse);
                    partieDecimale = operande[i].getPartieDecimale();
                    partieEntiere = operande[i].getPartieEntiere();
                    if (i != 0) {
                        debutLigneCouranteOrdonne = colonneVirgule - partieEntiere.length;
                    }
                    //Verifie partie entiere
                    for (j = 0; j < partieEntiere.length; j++) {
                        j2 = (j + debutLigneCouranteOrdonne);
                        if (getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0 && getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour) != partieEntiere[j]) {
                            // console.log("Case fausse1 -> i: "+i2+", j: "+j2+", val: "+getValeurUneCellule(j2*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: "+partieEntiere[j]);

                            validation = false;
                            ecrireDansUneCelluleAvecTransparance(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(255, 0, 0, 0.4)");
                        } else if (getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0) {
                            // console.log("Case bonne -> i: "+i2+", j: "+j2+", val: "+getValeurUneCellule(j2*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: "+partieEntiere[j]);
                            ecrireDansUneCelluleAvecTransparance(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(0, 102, 0, 0.4)");
                        } else if (partieEntiere[j] != 0) {
                            // console.log("Case fausse1.2 -> attendue: "+partieEntiere[j]);
                            validation = false;
                        }
                    }

                    //Verifie partie la présence d'une partie décimale
                    if (partieDecimale.length > 0) {
                        //Verifie la vigule
                        j2 = debutLigneCouranteOrdonne + partieEntiere.length;
                        if (getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0 && getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour) != ',') {
                            // console.log("Case fausse2 -> i: "+i2+", j: "+j2+", val: "+getValeurUneCellule(j2*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: ,");
                            validation = false;
                            ecrireDansUneCelluleAvecTransparance(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(255, 0, 0, 0.4)");
                        } else if (getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0) {
                            ecrireDansUneCelluleAvecTransparance(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(0, 102, 0, 0.4)");
                        }

                        //Verifie les chiffres
                        for (j = 0; j < partieDecimale.length; j++) {
                            j2 = j + debutLigneCouranteOrdonne + partieEntiere.length + 1;
                            if (getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0 && getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour) != partieDecimale[j]) {
                                // console.log("Case fausse3 -> i: "+i2+", j: "+j2+", val: "+getValeurUneCellule(j2*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: "+partieDecimale[j]);
                                validation = false;
                                ecrireDansUneCelluleAvecTransparance(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(255, 0, 0, 0.4)");
                            } else if (getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0) {
                                // console.log("Case bonne3 -> i: "+i2+", j: "+j2+", val: "+getValeurUneCellule(j2*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: "+partieDecimale[j]);
                                ecrireDansUneCelluleAvecTransparance(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j2 * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(0, 102, 0, 0.4)");
                            } else if (partieDecimale[j] != 0) {
                                // console.log("Case fausse1.2 -> attendue: "+partieEntiere[j]);
                                validation = false;
                            }
                        }
                    }
                    //Verifie que la fin de la ligne est vide
                    for (j = debutLigneCouranteOrdonne + partieDecimale.length + 1 + partieEntiere.length; j < infosGrille.col; j++) {
                        if (getValeurUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0) {
                            // console.log("Case fausse4 -> i: "+i2+", j: "+j+", val: "+getValeurUneCellule(j*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: Vide");
                            validation = false;
                            ecrireDansUneCelluleAvecTransparance(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(255, 0, 0, 0.4)");
                        }
                    }
                    //Verifie que le début de la ligne est vide
                    for (j = 0; j < debutLigneCouranteOrdonne; j++) {
                        if (getValeurUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour).length > 0 && getValeurUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour) != '+') {
                            // console.log("Case fausse5 -> i: "+i2+", j: "+j+", val: "+getValeurUneCellule(j*tailleCaseAvecContour, i2*tailleCaseAvecContour)+", attendue: Vide");
                            validation = false;
                            ecrireDansUneCelluleAvecTransparance(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour, String(getValeurUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour)), "black", "rgba(255, 0, 0, 0.4)");
                        } else if (getValeurUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour) == '+') {
                            effacerEcritureUneCellule(j * tailleCaseAvecContour, i2 * tailleCaseAvecContour);
                        }
                    }

                    //Determiner la colonne de virgules
                    if (colonneVirgule == null) {
                        colonneVirgule = debutLigneCouranteOrdonne + partieEntiere.length;
                    }
                    //Placer le signe de l'opération
                    if (i == operande.length - 1) {
                        if (typeOperation == 'addition') {
                            ecrireDansUneCellule((colonneVirgule - operation.getLgMaxPartieEntiere() - 1) * tailleCaseAvecContour, i2 * tailleCaseAvecContour, "+", "black");
                        }
                        else if (typeOperation == 'soustraction') {
                            ecrireDansUneCellule((colonneVirgule - operation.getLgMaxPartieEntiere() - 1) * tailleCaseAvecContour, i2 * tailleCaseAvecContour, "-", "black");
                        }
                    }
                }
                //Verifie que les lignes suivantes sont vides
                for (i = operande.length + debutLigneCouranteAbscisse; i < infosGrille.lin; i++) {
                    for (j = 0; j < infosGrille.col; j++) {
                        if (getValeurUneCellule(j * tailleCaseAvecContour, i * tailleCaseAvecContour).length > 0) {
                            // console.log("Case fausse6 -> i: "+i+", j: "+j+", val: "+getValeurUneCellule(j*tailleCaseAvecContour, i*tailleCaseAvecContour)+", attendue: Vide");
                            validation = false;
                            ecrireDansUneCelluleAvecTransparance(j * tailleCaseAvecContour, i * tailleCaseAvecContour, String(getValeurUneCellule(j * tailleCaseAvecContour, i * tailleCaseAvecContour)), "black", "rgba(255, 0, 0, 0.4)");
                        }
                    }
                }
                //Si validation = true : l'opération est bien posée.
                if (validation == true) {
                    console.log("Placement réussi.");
                    for (i = 0; i < infosGrille.lin; i++) {
                        for (j = 0; j < infosGrille.col; j++) {
                            effacerLesDonneeCellule(j * tailleCaseAvecContour, i * tailleCaseAvecContour);
                        }
                    }
                    buttonCorrectionAlignement.setAttribute("style", "display:none;");
                    if (typeOperation == 'addition') {
                        poserOparationAdditionLocal(operation, typeDeCorrection, "Résoudre");
                    }
                    else if (typeOperation == 'soustraction') {
                        poserOparationSoustractionLocal(operation, typeDeCorrection, "Résoudre");
                    }
                }
                else {
                    console.log("Operation mal posée");
                    typeError.opt4 = true;
                    dessinerCadreCorrection(typeError);
                }
            }
            else {
                alert("Il n'y a pas d'opération posé!");
            }
        }

    }
    // ------------------ Addition ------------------
    {

        /**
         * 
         * @type Boolean 
         */
        var operationEnCours = false;
        /**
         * 
         * @type {Addition, Soustraction, Multiplication, division} 
         */
        var operation;
        /**
         * 
         * @type String 
         */
        var typeOperation;
        /**
         * 
         * @type Array
         */
        var tableauDesCelluleActiveNonActive = [];
        /**
         * 
         * @type Array
         */
        var tableauDesCelluleReserver = [];
        /**
         * 
         * @type Array
         */
        var tableauDesCelluleAutorise = [];
        /**
         * @constant
         * @type Number
         */
        var postXContante;

        /**
         * @constant
         * @type Number
         */
        var postYContante;
        if (tailleCase < 40) {
            postXContante = 4 * tailleCaseAvecContour;
            if (tailleCase == 30) {
                postXContante = 7 * tailleCaseAvecContour;
            }
        } else {
            postXContante = 5 * tailleCaseAvecContour;
        }
        if (tailleCase < 50) {
            postYContante = 3 * tailleCaseAvecContour;
        } else {
            postYContante = 2 * tailleCaseAvecContour;
        }

        /**
         * 
         * @type {(postXContante,postYContante)}
         */
        var positionInitialPourPoserUneOperation = {x: postXContante, y: postYContante};


        this.poserOparationAddition = function poserOparationAddition(addition, Correction, textEnonce) {
            poserOparationAdditionLocal(addition, Correction, textEnonce);
        };

        /**
         * @public
         * @description Cette fonction nous permet d'afficher ¬l'opération
         * @param {Addition} addition
         * @param {String} textEnonce 
         */
        function poserOparationAdditionLocal(addition, Correction, textEnonce) {

            if (Correction == 0) {
                //Correction simple
                buttonCorrectionSimple.setAttribute("style", "");
                buttonConfiguration.setAttribute("style", "position:absolute;top:50px;left:188px;padding: 4px 4px;");
            }
            else if (Correction == 1) {
                //Correction suivie
                buttonCorrectionSuivi.setAttribute("style", "");
                var stylePostie = "position: absolute; margin-left: -1px; margin-top: 78px;z-index:1;display:none;";
                enonce.setAttribute("style", stylePostie);
                buttonConfiguration.setAttribute("style", "position:absolute;top:50px;left:188px;padding: 4px 4px;");
            }

            operationEnCours = true;
            operation = addition;
            typeOperation = "addition";
            afficherEnonce(textEnonce);
            var nombreCelluleAReserverVerticalement = operation.getOperande().length + 3;
            var nombreCelluleAReserverHorizontalement = 0;
            var operande = operation.getOperande();
            var resultat = operation.getResultat();
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
            var numLigne = 1;
            var valMaxByLigne = 0;
            for (i = 0; i < nombreCelluleAReserverVerticalement; i++) {
                for (j = 0; j < nombreCelluleAReserverHorizontalement; j++) {
                    if (postXContante + j * tailleCaseAvecContour >= valMaxByLigne) {
                        valMaxByLigne = postXContante + j * tailleCaseAvecContour;

                    }
                    p = {x: postXContante + j * tailleCaseAvecContour, y: postYContante + i * tailleCaseAvecContour, ligne: numLigne, valMaxByLigne: 0, valChamp: ""};
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
                for (i = 0; i < tableauDeGrille.length; i++) {
                    if (tableauDeGrille[i].x !== tableauDesCelluleReserver[j].x && tableauDeGrille[i].y !== tableauDesCelluleReserver[j].y) {
                        tableauDesCelluleActiveNonActive.push(tableauDeGrille[i]);
                    }
                }
            }


            var couleurTransparenceOperandeDecimal = config.param.couleur.couleurApresVirgule;
            var couleurTransparenceOperandeEntiere = config.param.couleur.couleurAvantVirgule;
            var couleurTransparenceRetenue = config.param.couleur.couleurFondDesChampsDestineAuReponse;
            var couleurTransparenceResultat = config.param.couleur.couleurFondDesChampsDestineAuReponse;


            numLigne = 2;
            positionVirguleRetenue = {x: "", y: "", trouve: false};
            positionPremierRetenue = {x: "", y: ""};
            for (i = 0; i < operande.length; i++) {
                if (operande[i].getPartieDecimale().length === maxDecimale) {
                    decimale = operande[i].getPartieDecimale();
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = 0; k < decimale.length; k++) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((decimale.length - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(decimale[k]), "black", couleurTransparenceOperandeDecimal);
                            }
                        }
                    }
                } else {
                    decimale = operande[i].getPartieDecimale();
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = 0; k < decimale.length; k++) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(decimale[k]), "black", couleurTransparenceOperandeDecimal);

                            }
                        }
                    }
                }
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === numLigne) {
                        if (operande[i].getPartieDecimale().length != 0) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(","), "black", config.param.couleur.couleurVirgule);
                        }
                        if (!positionVirguleRetenue.trouve) {
                            positionVirguleRetenue.x = tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale) * tailleCaseAvecContour);
                            positionVirguleRetenue.y = tableauDesCelluleReserver[j].y - tailleCaseAvecContour;
                            positionVirguleRetenue.trouve = true;
                        }
                    }
                }
                numLigne++;
            }
//          Partie entière
            numLigne = 2;
            for (i = 0; i < operande.length; i++) {
                entiere = operande[i].getPartieEntiere();
                if (entiere.length === maxEntiere) {
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = entiere.length - 1; k >= 0; k--) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale + 1 + maxEntiere - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(entiere[k]), "black", couleurTransparenceOperandeEntiere);
                            }
                        }
                    }
                } else {
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = entiere.length - 1; k >= 0; k--) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale + 1 + entiere.length - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(entiere[k]), "black", couleurTransparenceOperandeEntiere);

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

                    if (resultat.getPartieDecimale().length == 0) {
                        ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].x - tailleCaseAvecContour, tableauDesCelluleReserver[j].y, "", "white", couleurTransparenceRetenue);
                        tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x - tailleCaseAvecContour, y: tableauDesCelluleReserver[j].y, statu: true});
                    } else {
                        ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "", "white", couleurTransparenceRetenue);
                        tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y, statu: true});
                    }

                }
                if (tableauDesCelluleReserver[j].ligne === nombreCelluleAReserverVerticalement) {
                    if (mettre === false) {
                        ecrireDansUneCellule(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "=", "red");
                        mettre = true;
                    } else {
                        ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "", "white", couleurTransparenceResultat);
                        tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y, statu: true});
                    }
                }

            }
            effacerEcritureUneCellule(positionInitialPourPoserUneOperation.x, positionInitialPourPoserUneOperation.y);

            for (i = 0; i < tableauDesCelluleAutorise.length; i++) {
                if (tableauDesCelluleAutorise[i].x == positionVirguleRetenue.x && tableauDesCelluleAutorise[i].y == positionVirguleRetenue.y) {
                    tableauDesCelluleAutorise[i] = {x: positionVirguleRetenue.x, y: positionVirguleRetenue.y, statu: false};

                }

            }

            var tableauDesResulat = getStructureResultatAvantComparaison(typeOperation, operation);
            for (i = 0; i < tableauDesCelluleAutorise.length; i++) {
                if (!tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y]) {
                    tableauDesCelluleAutorise[i] = {x: tableauDesCelluleAutorise[i].x, y: tableauDesCelluleAutorise[i].y, statu: false};
                    ecrireDansUneCellule(tableauDesCelluleAutorise[i].x, tableauDesCelluleAutorise[i].y, "");
                } else {
                    if (tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].champObligatoire == false && tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].writable === false) {
                        tableauDesCelluleAutorise[i] = {x: tableauDesCelluleAutorise[i].x, y: tableauDesCelluleAutorise[i].y, statu: false};
                        ecrireDansUneCellule(tableauDesCelluleAutorise[i].x, tableauDesCelluleAutorise[i].y, "");
                    }
                }

            }
        }
        ;


        /**
         * @description text
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
                            tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 1 - i].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 1 - i].y] = {val: tabDecimale[tabDecimale.length - 1 - i], ordre: ordre, statu: false, line: "b", champObligatoire: true, writable: true};
                            tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 1 - i].x, y: tableauPartieResultat[tableauPartieResultat.length - 1 - i].y, val: tabDecimale[tabDecimale.length - 1 - i], ordre: ordre, order: ordre, statu: false, line: "b", champObligatoire: true, writable: true});
                            ordre = ordre + 2;
                            if (i === tabDecimale.length - 1) {
                                tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 2 - i ].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 2 - i].y] = {val: ",", ordre: tabDecimale.length * 2, statu: false, line: "b", champObligatoire: true, writable: true};
                                tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 2 - i].x, y: tableauPartieResultat[tableauPartieResultat.length - 2 - i].y, val: ",", ordre: tabDecimale.length * 2, order: tabDecimale.length * 2, statu: false, line: "b", champObligatoire: true, writable: true});
                            }
                        }
                        var ordre2 = tabDecimale.length * 2 + 2;
                        for (i = 0; i < tabEntiere.length; i++) {
                            tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].y] = {val: tabEntiere[tabEntiere.length - 1 - i], ordre: ordre2, statu: false, line: "b", champObligatoire: true, writable: true};
                            tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].x, y: tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].y, val: tabEntiere[tabEntiere.length - 1 - i], ordre: ordre2, order: ordre2, statu: false, line: "b", champObligatoire: true, writable: true});
                            ordre2 = ordre2 + 2;
                        }
                        var ordre3 = 0;
                        var j = 0;
                        for (i = retenue.length - 1; i >= 0; i--) {
                            if (retenue[i] !== " ") {

                                if (retenue[i] === 0) {

                                    tableauAvecResultatDansOrdre[tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].x + "_" + tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].y] = {val: retenue[i], ordre: ordre3, statu: false, line: "h", champObligatoire: false, writable: false};
                                    tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].x, y: tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].y, val: retenue[i], ordre: ordre3, order: ordre3, statu: false, line: "h", champObligatoire: false, writable: false});

                                } else {
                                    tableauAvecResultatDansOrdre[tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].x + "_" + tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].y] = {val: retenue[i], ordre: ordre3, statu: false, line: "h", champObligatoire: config.param.correction.retenueObligatoire, writable: true};
                                    tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].x, y: tableauPartieRetenue[tableauPartieRetenue.length - 1 - j].y, val: retenue[i], ordre: ordre3, order: ordre3, statu: false, line: "h", champObligatoire: config.param.correction.retenueObligatoire, writable: true});
                                }
                                ordre3 = ordre3 + 2;
                            } else {
                                ordre3 = ordre3 + 1;
                            }

                            j++;
                        }

                        var tmp = sortHashTable(tableauAvecResultatDansOrdreTrier, "order", true);

                        return {object: tableauAvecResultatDansOrdre, tableau: tmp};

                        break;
                    case "soustraction":
                        var tableauAvecResultatDansOrdre = {};
                        var tableauAvecResultatDansOrdreTrier = [];
                        var tableauPartieRetenueHaut = [];
                        var tableauPartieRetenueBas = [];
                        var tableauPartieResultat = [];
                        var retenue = operation.getRetenues();
                        var resultat = operation.getResultat();

                        var y1 = tableauDesCelluleAutorise[0].y;
                        var y2 = y1 + 2 * tailleCaseAvecContour;
                        var y3 = y2 + tailleCaseAvecContour;

                        for (i = 0; i < tableauDesCelluleAutorise.length; i++) {
                            if (tableauDesCelluleAutorise[i].y === y1) {
                                tableauPartieRetenueHaut.push(tableauDesCelluleAutorise[i]);
                            }
                            if (tableauDesCelluleAutorise[i].y === y2) {
                                tableauPartieRetenueBas.push(tableauDesCelluleAutorise[i]);
                            }
                            if (tableauDesCelluleAutorise[i].y === y3) {
                                tableauPartieResultat.push(tableauDesCelluleAutorise[i]);
                            }
                        }

                        var tabDecimale = resultat.getPartieDecimale();
                        var tabEntiere = resultat.getPartieEntiere();

                        var ordre = 3;
                        for (i = 0; i < tabDecimale.length; i++) {
                            tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 1 - i].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 1 - i].y] = {val: tabDecimale[tabDecimale.length - 1 - i], ordre: ordre, statu: false, line: "resultat", champObligatoire: true, writable: true};
                            tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 1 - i].x, y: tableauPartieResultat[tableauPartieResultat.length - 1 - i].y, val: tabDecimale[tabDecimale.length - 1 - i], order: ordre, ordre: ordre, statu: false, line: "resultat", champObligatoire: true, writable: true});
                            ordre = ordre + 3;
                            if (i === tabDecimale.length - 1) {
                                tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 2 - i ].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 2 - i].y] = {val: ",", ordre: tabDecimale.length * 3 + 1, statu: false, line: "resultat", champObligatoire: true, writable: true};
                                tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 2 - i].x, y: tableauPartieResultat[tableauPartieResultat.length - 2 - i].y, val: ",", ordre: tabDecimale.length * 3 + 1, order: tabDecimale.length * 3 + 1, statu: false, line: "resultat", champObligatoire: true, writable: true});
                            }
                        }
                        ordre = ordre + 1;
                        for (i = 0; i < tabEntiere.length; i++) {
                            tableauAvecResultatDansOrdre[tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].x + "_" + tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].y] = {val: tabEntiere[tabEntiere.length - 1 - i], ordre: ordre, statu: false, line: "resultat", champObligatoire: true, writable: true};
                            tableauAvecResultatDansOrdreTrier.push({x: tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].x, y: tableauPartieResultat[tableauPartieResultat.length - 2 - i - tabDecimale.length].y, val: tabEntiere[tabEntiere.length - 1 - i], ordre: ordre, order: ordre, statu: false, line: "resultat", champObligatoire: true, writable: true});
                            ordre = ordre + 3;
                        }

                        var j = 0;
                        var tailleRetenu = parseInt(retenue.superieures.length);
                        var ordre2 = 1;
                        var ordre3 = 2;
                        for (i = tailleRetenu - 1; i >= 0; i--) {

                            if (retenue.inferieures[i] !== " ") {
                                if (retenue.inferieures[i] === 0) {
                                    tableauAvecResultatDansOrdre[tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].x + "_" + tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].y] = {val: retenue.inferieures[i], ordre: ordre2, statu: false, line: "retenueBas", champObligatoire: false, writable: false, position: "auDessusDeLaBarre"};
                                    tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].x, y: tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].y, val: retenue.inferieures[i], ordre: ordre2, order: ordre2, statu: false, line: "retenueBas", champObligatoire: false, writable: false, position: "auDessusDeLaBarre"});
                                } else {
                                    tableauAvecResultatDansOrdre[tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].x + "_" + tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].y] = {val: retenue.inferieures[i], ordre: ordre, statu: false, line: "retenueBas", champObligatoire: config.param.correction.retenueObligatoire, writable: true, position: "auDessusDeLaBarre"};
                                    tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].x, y: tableauPartieRetenueBas[tableauPartieRetenueBas.length - 1 - j].y, val: retenue.inferieures[i], ordre: ordre2, order: ordre2, statu: false, line: "retenueBas", champObligatoire: config.param.correction.retenueObligatoire, writable: true, position: "auDessusDeLaBarre"});
                                }
                                ordre2 = ordre2 + 3;
                            } else {
                                ordre2 = ordre2 + 1;
                            }
                            if (retenue.superieures[i] !== " ") {
                                tmp = getValeurUneCellule(tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].x, tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].y);

                                if (retenue.superieures[i] === 0) {
                                    tableauAvecResultatDansOrdre[tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].x + "_" + tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].y] = {val: retenue.superieures[i], ordre: ordre3, statu: false, line: "retenueHaut", champObligatoire: false, writable: false, position: "devantChiffreInitial", valContent: tmp};
                                    tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].x, y: tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].y, val: retenue.superieures[i], ordre: ordre3, order: ordre3, statu: false, line: "retenueHaut", champObligatoire: false, writable: false, position: "devantChiffreInitial", valContent: tmp});
                                } else {
                                    tableauAvecResultatDansOrdre[tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].x + "_" + tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].y] = {val: retenue.superieures[i], ordre: ordre3, statu: false, line: "retenueHaut", champObligatoire: config.param.correction.retenueObligatoire, writable: true, position: "devantChiffreInitial", valContent: tmp};
                                    tableauAvecResultatDansOrdreTrier.push({x: tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].x, y: tableauPartieRetenueHaut[tableauPartieRetenueHaut.length - 1 - j].y, val: retenue.superieures[i], ordre: ordre3, order: ordre3, statu: false, line: "retenueHaut", champObligatoire: config.param.correction.retenueObligatoire, writable: true, position: "devantChiffreInitial", valContent: tmp});
                                }
                                j++;
                                ordre3 = ordre3 + 3;
                            } else {
                                ordre3 = ordre3 + 1;
                            }
                        }


                        var tmpTableauTrier = sortHashTable(tableauAvecResultatDansOrdreTrier, "order", true);
                        return {object: tableauAvecResultatDansOrdre, tableau: tmpTableauTrier};
                        break;
                }
            }
        }
        ;

        /**
         * @description text
         * @param {type} hashTable
         * @param {type} key
         * @param {type} removeKey      * @returns {unresolved}
         */
        function sortHashTable(hashTable, key, removeKey) {
            hashTable = (hashTable instanceof Array ? hashTable : []);
            var newHashTable = hashTable.sort(function(a, b) {
                return (typeof(a[key]) === "number" ? a[key] - b[key] : a[key] > b[key]);
            });
            if (removeKey) {
                for (i in newHashTable) {
                    delete newHashTable[i][key];
                }
            }
            return newHashTable;
        }
        ;

        //Poser une addition

        function poserOperationDepuisLaGrille() {
            var donneClasseParLigne = {};
            var ligne = 0;
            for (key in listeDonneeDeChaqueCellule) {
                index = key.split("_");
                donneClasseParLigne[index[1]] = {ligne: ligne, x: index[0], y: index[1], val: listeDonneeDeChaqueCellule[key]};
                console.log(index);
            }
        }
        ;


    }
    // ------------------ Soustraction ------------------
    {

        this.poserOparationSoustraction = function poserOparationAddition(soustraction, Correction, textEnonce) {
            poserOparationSoustractionLocal(soustraction, Correction, textEnonce);
        };


        function poserOparationSoustractionLocal(soustraction, Correction, textEnonce) {

            if (Correction == 0) {
                //Correction simple
                buttonCorrectionSimple.setAttribute("style", "");
                buttonConfiguration.setAttribute("style", "position:absolute;top:50px;left:188px;padding: 4px 4px;");
            }
            else if (Correction == 1) {
                //Correction suivie
                buttonCorrectionSuivi.setAttribute("style", "");
                var stylePostie = "position: absolute; margin-left: -1px; margin-top: 78px;z-index:1;display:none;";
                enonce.setAttribute("style", stylePostie);
                buttonConfiguration.setAttribute("style", "position:absolute;top:50px;left:188px;padding: 4px 4px;");
            }

            operationEnCours = true;
            operation = soustraction;
            typeOperation = "soustraction";
            afficherEnonce(textEnonce);

            var nombreCelluleAReserverVerticalement = operation.getOperande().length + 2;
            var nombreCelluleAReserverHorizontalement = 0;
            var operande = operation.getOperande();
            var resultat = soustraction.getResultat();

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

            nombreCelluleAReserverHorizontalement = nombreCelluleAReserverHorizontalement + 3;

            var nombreDeCelluleAReserver = nombreCelluleAReserverVerticalement * nombreCelluleAReserverHorizontalement;
            var numLigne = 1;
            var valMaxByLigne = 0;
            for (i = 0; i < nombreCelluleAReserverVerticalement; i++) {
                for (j = 0; j < nombreCelluleAReserverHorizontalement; j++) {
                    if (postXContante + j * tailleCaseAvecContour >= valMaxByLigne) {
                        valMaxByLigne = postXContante + j * tailleCaseAvecContour;

                    }
                    p = {x: postXContante + j * tailleCaseAvecContour, y: postYContante + i * tailleCaseAvecContour, ligne: numLigne, valMaxByLigne: 0, valChamp: ""};
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
                for (i = 0; i < tableauDeGrille.length; i++) {
                    if (tableauDeGrille[i].x !== tableauDesCelluleReserver[j].x && tableauDeGrille[i].y !== tableauDesCelluleReserver[j].y) {
                        tableauDesCelluleActiveNonActive.push(tableauDeGrille[i]);
                    }
                }
            }

            var couleurTransparenceOperandeDecimal = config.param.couleur.couleurApresVirgule;
            var couleurTransparenceOperandeEntiere = config.param.couleur.couleurAvantVirgule;
            var couleurTransparenceRetenue = config.param.couleur.couleurFondDesChampsDestineAuReponse;
            var couleurTransparenceResultat = config.param.couleur.couleurFondDesChampsDestineAuReponse;


            numLigne = 1;
            positionVirguleRetenue = {x: "", y: "", trouve: false};
            positionPremierRetenue = {x: "", y: ""};

            for (i = 0; i < operande.length; i++) {
                if (operande[i].getPartieDecimale().length === maxDecimale) {
                    decimale = operande[i].getPartieDecimale();
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = 0; k < decimale.length; k++) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((decimale.length - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(decimale[k]), "black", couleurTransparenceOperandeDecimal);
                            }
                        }
                    }
                } else {
                    decimale = operande[i].getPartieDecimale();
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = 0; k < decimale.length; k++) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(decimale[k]), "black", couleurTransparenceOperandeDecimal);

                            }
                        }
                    }
                }
                for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                    if (tableauDesCelluleReserver[j].ligne === numLigne) {
                        if (operande[i].getPartieDecimale().length != 0) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(","), "black", config.param.couleur.couleurVirgule);
                        }
                        if (!positionVirguleRetenue.trouve) {
                            positionVirguleRetenue.x = tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale) * tailleCaseAvecContour);
                            positionVirguleRetenue.y = tableauDesCelluleReserver[j].y - tailleCaseAvecContour;
                            positionVirguleRetenue.trouve = true;
                        }
                    }
                }
                numLigne++;
            }

            numLigne = 1;
            for (i = 0; i < operande.length; i++) {
                entiere = operande[i].getPartieEntiere();
                if (entiere.length === maxEntiere) {
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = entiere.length - 1; k >= 0; k--) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale + 1 + maxEntiere - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(entiere[k]), "black", couleurTransparenceOperandeEntiere);
                            }
                        }
                    }
                } else {
                    for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                        if (tableauDesCelluleReserver[j].ligne === numLigne) {
                            for (k = entiere.length - 1; k >= 0; k--) {
                                ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].valMaxByLigne - ((maxDecimale + 1 + entiere.length - 1 - k) * tailleCaseAvecContour), tableauDesCelluleReserver[j].y, String(entiere[k]), "black", couleurTransparenceOperandeEntiere);

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
                        ecrireDansUneCellule(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "-", "red");
                        trouver = true;
                    }

                }
            }


            for (i = 0; i < tableauDesCelluleReserver.length; i++) {
                tableauDesCelluleReserver[i].valChamp = getValeurUneCellule(tableauDesCelluleReserver[i].x, tableauDesCelluleReserver[i].y);
            }
            var mettre = false;
            for (j = 0; j < tableauDesCelluleReserver.length; j++) {
                if (tableauDesCelluleReserver[j].ligne === nombreCelluleAReserverVerticalement - 1) {
                    dessinerBaseOperation(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "red");
                }
                if (tableauDesCelluleReserver[j].ligne === 1) {
                    if (tableauDesCelluleReserver[j].valChamp != "" && tableauDesCelluleReserver[j].valChamp != ",") {
                        tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y, statu: true});
                        tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y + 2 * tailleCaseAvecContour, statu: true});
                    }
                }
                if (tableauDesCelluleReserver[j].ligne === nombreCelluleAReserverVerticalement) {
                    if (mettre === false) {
                        ecrireDansUneCellule(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "=", "red");
                        mettre = true;
                    } else {
                        ecrireDansUneCelluleAvecTransparance(tableauDesCelluleReserver[j].x, tableauDesCelluleReserver[j].y, "", "white", couleurTransparenceResultat);
                        tableauDesCelluleAutorise.push({x: tableauDesCelluleReserver[j].x, y: tableauDesCelluleReserver[j].y, statu: true});
                    }
                }
            }

            var tableauDesResulat = getStructureResultatAvantComparaison(typeOperation, operation);

            for (i = 0; i < tableauDesCelluleAutorise.length; i++) {
                if (!tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y]) {
                    tableauDesCelluleAutorise[i] = {x: tableauDesCelluleAutorise[i].x, y: tableauDesCelluleAutorise[i].y, statu: false};
                    ecrireDansUneCellule(tableauDesCelluleAutorise[i].x, tableauDesCelluleAutorise[i].y, "");
                } else {
                    if (tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].champObligatoire == false && tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].writable === false) {
                        tableauDesCelluleAutorise[i] = {x: tableauDesCelluleAutorise[i].x, y: tableauDesCelluleAutorise[i].y, statu: false};
                        if (!tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].position) {
                            ecrireDansUneCellule(tableauDesCelluleAutorise[i].x, tableauDesCelluleAutorise[i].y, "");
                        }
                    } else {
                        if (tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].position) {
                            ecrireDansUneCelluleAvecTransparance(tableauDesCelluleAutorise[i].x, tableauDesCelluleAutorise[i].y, "", "white", couleurTransparenceResultat, tailleCase / 2, tableauDesResulat.object[tableauDesCelluleAutorise[i].x + "_" + tableauDesCelluleAutorise[i].y].position);
                        }
                    }
                }
            }


        }
    }

}
;
