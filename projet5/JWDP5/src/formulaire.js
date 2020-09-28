//Object inputsForm
const form = {
    formValid : document.getElementById('submit-validation'),
    formulaire : document.querySelector('#formulaire'),
    inputsForm :{
        //Element input
        firstName : document.getElementById('firstName'),
        lastName : document.getElementById('lastName'), //Nom de famille
        address : document.getElementById('adress'), //Adresse 
        city : document.getElementById('city'), //Nom de la ville
        email : document.getElementById('email'), // Email
        codePostal : document.getElementById('cp'), // Code Postal
        //valueInput
        inputFirstName : function(){ return this.firstName.value},
        inputLastName : function(){ return this.lastName.value},
        inputAddress : function(){ return this.address.value},
        inputCity : function(){ return this.city.value},
        inputCodePostalCity : function (){ return this.codePostal.value + " " + this.city.value},
        inputEmail : function(){ return this.email.value}
    },
    //les expressions régulières
    regExpAll :{ 
        regExpName : /^[A-Z][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][A-Z][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/, //regExp de prénom / Nom / Ville
        regExpAdresse : /([0-9][ ])?[A-Za-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][A-Z][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/, //reg Adresse
        regExpEmail : /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/ //regExp email
    }, 
}
//Tableau des inputs ayants des regExp
let tabInput = [[form.inputsForm.firstName,form.inputsForm.lastName,form.inputsForm.city],form.inputsForm.address,form.inputsForm.email];
//Les fonctions
//Condition correcte 
function correct(input){
    input.nextSibling.nextSibling.className = "";
    input.nextSibling.nextSibling.textContent = "";
}
//Si l'élément possède l'une des deux class alors elles sont remplacées par 1 voir 2 class
function changeClass(element,classToDelete1,classToAdd1,classToAdd2,classToDelete2){
    if(classToDelete1 && element.classList.contains(classToDelete1)){
        element.classList.remove(classToDelete1);
    }else if(classToDelete2 && element.classList.contains(classToDelete2)){
        element.classList.remove(classToDelete2);
    }else if(classToAdd2){
        element.classList.add(classToAdd2);
    }  
    element.classList.add(classToAdd1);
}  
//Ajout contenu lors de la vérification des tests sur la valeur
function contentCheckValue(input,borderBgToDelete,textToDelete,borderBgToAdd,textToAdd,infoMsg){
    const span = input.nextSibling.nextSibling;
            changeClass(input,('border-'+ borderBgToDelete),('border-'+ borderBgToAdd));
            span.className = "px-3";
            changeClass(span,("bg-" + borderBgToDelete),("bg-" + borderBgToAdd ),("text-"+ textToAdd),("text-" + textToDelete))
            span.textContent = input.parentNode.firstElementChild.innerHTML + infoMsg;
}
//Vérification de la valeur des inputs 
function checkValue(form){   
    for(i = 0; i < form.elements.length-1; i++){
        const inputs = form.elements[i]; //Récupération l'ensemble des inputs sauf le button pour envoyer le formulaire
        //Vérification de l'absence de la valeur des champs après sortie saisis
            inputs.addEventListener('blur', function(){
                if(inputs.validity.valueMissing){
                    contentCheckValue(inputs,'warning','dark','danger','white',"manquant");
                }
            })
    }
}
//Ajout contenu lors de la vérification des reg Exp
function contentChekRegExp (input,expression){
    if(!expression.test(input.value)){
        contentCheckValue(input,'danger','white','warning','dark','incorrect');
    }else if(expression.test(input.value)){
        changeClass(input,'border-warning','border-success',false,'border-danger',) + correct(input);
    }  
 } 
//Vérification du regExp des inputs
function checkRegExp(element,expression){
    if(element.length > 1){
        for(i = 0; i < element[0].length; i++){
            const input = element[0][i];
            input.addEventListener('blur', function(){
                contentChekRegExp(input,expression);
            })
        }  
    }else{
        element.addEventListener('blur', function(){
            contentChekRegExp(element,expression);
        })
    }
}
//Mise en route du système
//Vérification des saisis des utilisateurs
form.inputsForm.codePostal.addEventListener('blur', function(){
    if(form.inputsForm.codePostal.value.length != 5){
       contentCheckValue(form.inputsForm.codePostal,'danger','white','warning','dark','incorrect');
   }else if(form.inputsForm.codePostal.value.length == 5){
       changeClass(form.inputsForm.codePostal,'border-warning','border-success',false,'border-danger') + correct(form.inputsForm.codePostal);
   } 
}) 
checkRegExp(tabInput,form.regExpAll.regExpName);
checkRegExp(form.inputsForm.address,form.regExpAll.regExpAdresse);
checkRegExp(form.inputsForm.email, form.regExpAll.regExpEmail);
checkValue(form.formulaire);
//Vérification du formulaire lors de la validation
form.formValid.addEventListener('click', function(e){
    for(i = 0; i < form.formulaire.elements.length-1; i++){
        const inputs = form.formulaire.elements[i];
        if(!inputs.validity.valueMissing){
            for(j = 0; j < tabInput[0].length; j++){
                if(!form.regExpAll.regExpName.test(tabInput[0][j].value)){
                    contentCheckValue(tabInput[0][j],'danger','white','warning','dark','incorrect');
                    e.preventDefault();
                }
            }
            if(!form.regExpAll.regExpAdresse.test(form.inputsForm.inputAddress
                ())){
                contentCheckValue(form.inputsForm.address,'danger','white','warning','dark','incorrect');
                e.preventDefault();
            }else if(!form.regExpAll.regExpEmail.test(form.inputsForm.inputEmail())){
                contentCheckValue(form.inputsForm.email,'danger','white','warning','dark','incorrect');
                e.preventDefault();
            }        
        }else if(inputs.validity.valueMissing){
            contentCheckValue(inputs,'warning','dark','danger','white',"manquant");
            e.preventDefault();
        }
    }
})
//Envoie le formulaire par la méthode POST
 
function idproduct(){ 
    let onProduct= [];
    for(let i = 0;  i<= localStorage.length-1; i++){
        //Récupération des clefs dans une variable
        key = localStorage.key(i);
        //Transformation de la chaine JSON en objet JavaScript 
        newProduit = JSON.parse(localStorage.getItem(key));
        onProduct.push(newProduit.id);
    }
    return onProduct;
}   


function buildDataOrder (){
    let products = idproduct();
        let contact = {
        firstName : form.inputsForm.inputFirstName(),
        lastName : form.inputsForm.inputLastName(),
        address : form.inputsForm.inputAddress(),
        city: form.inputsForm.inputCodePostalCity(),
        email : form.inputsForm.inputEmail()
        }
    console.log(products)
    console.log(contact);
    return ({contact ,  products}) 
}



const url = 'http://localhost:3000/api/teddies/order';

 form.formulaire.addEventListener('submit', function(e){
    e.preventDefault()
    data2 = buildDataOrder()
    let request = new Request(url,{
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json'
    }), 
    body: JSON.stringify(data2)
    
    });console.log(data2);

    fetch(request)//retour du fetch
        .then(res => {
            let promise =  res.json();
                promise.then(result =>{
                console.log(result.orderId); 
                window.location.href="confirmation.html?orderId=" + result.orderId;
            })
        });    
}) 




/*
form.formulaire.addEventListener('submit', async function(e){
    let data2 = buildDataOrder()
    console.log(data2)

     try{
        let response = await fetch(form.getAttribute('action'),{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify(data2)
            
        });
            response.then
            
            //window.location.href="confirmation.html?orderId=" + response.orderID;
        }
    }catch(e){
            console.log(e)
          } 
})

*/