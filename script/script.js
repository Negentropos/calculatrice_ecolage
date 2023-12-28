
function afficherEcolage(montantEcolage){
    let zoneAffichageEcolage=document.querySelector("#zoneAffichageEcolage")
    zoneAffichageEcolage.innerText=montantEcolage
}

function calculerRevenuFoyer(){
    let revenuFoyer=document.querySelector("#revenuFiscalAnnuelFoyer")
    let nbEnfantsSupp=document.querySelector("#nbEnfantsAChargeFoyer")
    let nbPersonnesSupp=document.querySelector("#nbPersonnesAChargeFoyer")
    let abattement=0

    if (nbEnfantsSupp.value != 0){
        abattement+=nbEnfantsSupp.value*1
    }
    if (nbPersonnesSupp.value != 0){
        abattement+=nbPersonnesSupp.value*5
    }
    return (revenuFoyer.value - revenuFoyer.value*abattement/100)/12
}

function calculerRevenuParentA(){
    let revenuParentA=document.querySelector("#revenuFiscalAnnuelParentA")
    let nbEnfantsSupp=document.querySelector("#nbEnfantsAChargeParentA")
    let nbPersonnesSupp=document.querySelector("#nbPersonnesAChargeParentA")
    let vitSeul=document.querySelector("#parentAVivantSeul")
    let independant=document.querySelector("#parentAindependant")
    let abattement=0

    if (nbEnfantsSupp.value != 0){
        abattement+=nbEnfantsSupp.value*1
    }

    if (nbPersonnesSupp.value != 0){
        abattement+=nbPersonnesSupp.value*5
    }

    if (vitSeul.checked) {
        abattement+=10
    }

    if (independant.checked) {
        abattement+=10
    }
    
    return (revenuParentA.value - revenuParentA.value*abattement/100)/12
}

function calculerRevenuParentB(){
    let revenuParent=document.querySelector("#revenuFiscalAnnuelParentB")
    let nbEnfantsSupp=document.querySelector("#nbEnfantsAChargeParentB")
    let nbPersonnesSupp=document.querySelector("#nbPersonnesAChargeParentB")
    let vitSeul=document.querySelector("#parentBVivantSeul")
    let independant=document.querySelector("#parentBindependant")
    let abattement=0

    if (nbEnfantsSupp.value != 0){
        abattement+=nbEnfantsSupp.value*1
    }

    if (nbPersonnesSupp.value != 0){
        abattement+=nbPersonnesSupp.value*5
    }

    if (vitSeul.checked) {
        abattement+=10
    }

    if (independant.checked) {
        abattement+=10
    }
    
    return (revenuParent.value - revenuParent.value*abattement/100)/12

}

function calculerRevenu(){
    let revenuFoyer=document.querySelector("#revenuFiscalAnnuelFoyer")

    if (revenuFoyer.value !=0) {
        return calculerRevenuFoyer()
    } else {
        return calculerRevenuParentA() + calculerRevenuParentB()
    }
}

function calculerCoef(){
    let nbEnfantsScol=document.querySelector("#nbEnfantsScolarise")
    let coefsA=document.querySelectorAll(".coefA input")
    let coefsB=document.querySelectorAll(".coefB input")
    let plafonds=document.querySelectorAll(".plafond input");
    let planchers=document.querySelectorAll(".plancher input");
    let coefA=coefsA[nbEnfantsScol.value-1].value;
    let coefB=coefsB[nbEnfantsScol.value-1].value;
    let plafond=plafonds[nbEnfantsScol.value-1].value;
    let plancher=planchers[nbEnfantsScol.value-1].value;
    let coefC=document.querySelector("#indiceC");

    console.log(plafond)
    

    return[parseFloat(coefA),parseFloat(coefB),parseFloat(coefC.value),parseFloat(plancher),parseFloat(plafond)]

}

function calculerEcolage(coefs,revenus){
    let revenuFoyersansAbattement=document.querySelector("#revenuFiscalAnnuelFoyer"),
        revenuParentAsansAbattement=document.querySelector("#revenuFiscalAnnuelParentA"),
        revenuParentBsansAbattement=document.querySelector("#revenuFiscalAnnuelParentB"),
        revenuSansAbattement;
        ecolage=0;

    if (revenuFoyersansAbattement.value!=0){
        revenuSansAbattement=revenuFoyersansAbattement.value/12
    }
    else {
        revenuSansAbattement=revenuParentAsansAbattement.value/12 + revenuParentBsansAbattement.value/12
    }

    console.log("coef A " +coefs[0] + " coef B " + coefs[1] + " coef C " + coefs[2] + " revenus " + revenus + " revenus sans abbatement " + revenuSansAbattement)

    ecolage=((coefs[0]*revenus)+coefs[1])*coefs[2]+revenuSansAbattement*0.7/100

    console.log(ecolage)
    return ecolage;

}



const form = document.querySelector('form');

// Quand on submit
form.addEventListener("submit", (event) => {
    let revenus,
        ecolage,
        coefs;

    // On empêche le comportement par défaut
    event.preventDefault();
    coefs=calculerCoef();
    revenus=calculerRevenu()
    ecolage=calculerEcolage(coefs,revenus).toFixed(2)
    if (ecolage > coefs[4]){
        ecolage = coefs[4]
    }
    if (ecolage < coefs[3]){
        ecolage = coefs[3]
    }
    afficherEcolage(ecolage);
});