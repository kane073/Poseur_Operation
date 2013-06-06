var formaConfig = {
    "name": "config",
    "param": {
        "cellule": {
            "tailleCellule": 40,
            "tailleContour": 2
        },
        "correction": {
            "retenueObligatoire": true
        }
    }
};
/**
 * 
 * @type type
 */
var poseur = {
    //declaration des propriétés
    divOperation: document.createElement("div"),
    configuraton: "",
    grille: "",
    operation: ""
};
/**
 * 
 * @returns {undefined}
 */
function poseurchargement() {
    // création du DIV "opération" !!
    poseur.divOperation.setAttribute("id", "operation");
    document.body.appendChild(poseur.divOperation);
    poseur.configuraton = formaConfig;

    if (poseur.configuraton) {
        poseur.grille = new Grillage("operation", poseur.configuraton);

        // ----------------- Declarer une addition -----------------
        {
            poseur.operation = new Addition(1.7, 124.1, 1.23);
            poseur.operation.resoudreAddition();
            var textEnonce = "Résoudre l\'addition 1347.1, 871.2, 224.574 en spécifiant les retenues";
            // ----------------- Optionnel -----------------
            console.log(poseur.operation.getRetenues());
            console.log(poseur.operation.getResultat().getPartieEntiere(), poseur.operation.getResultat().getPartieDecimale());
            // ----------------- Choix de correction : Correction Simpe := 0 ou Correction Suivie := 1 -----------------
            poseur.grille.poserOparationAddition(poseur.operation, 0, textEnonce);
//        grille.poserOparationAddition(addition, 1, textEnonce);
//        grille.lancerOperationAPoser(addition, 0, "defaut");
//        grille.lancerOperationAPoser(addition, 1, "defaut");
        }

        // ----------------- Declarer une Soustratction -----------------
        {
//        poseur.operation = new Soustraction(914, 91.24);
//        poseur.operation.resoudreSoustraction();
//        var textEnonce = "Résoudre l\'soustraction en spécifiant les retenues";
            // ----------------- Optionnel -----------------
//        console.log(poseur.operation.getRetenues());
//        console.log(poseur.operation.getResultat().getPartieEntiere(), poseur.operation.getResultat().getPartieDecimale());
            // ----------------- Choix de correction : Correction Simpe := 0 ou Correction Suivie := 1 -----------------
//        poseur.grille.poserOparationSoustraction(poseur.operation, 0, textEnonce);
//        grille.lancerOperationAPoser(poseur.operation, 0, "defaut");
//        grille.lancerOperationAPoser(poseur.operation, 1, "defaut");
        }

    }
}
/**
 * 
 * @param {type} e
 * @returns {undefined}
 */
window.onload = function(e) {
    poseurchargement();
}
