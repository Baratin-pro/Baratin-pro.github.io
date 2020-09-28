//Fonction rajout l'élément et tous ces enfants s'il y a 
function appendDOM(elementParent,element,...moreArguments){
  elementParent.appendChild(element);
    for(let i = 0; i < moreArguments.length; i++) {
      if(moreArguments[i]){
        element.appendChild(moreArguments[i]);
      }
  }
}
//Emplacement de la liste des produits du panier
const basket = document.getElementById("basket");
const productList = document.querySelector("div .dropdown-menu");
//Création de la liste des produits du panier 
export function doShowBasket(){
  let newProduct = "";
  let key = "";
  if(window.localStorage && window.localStorage !== null){
      for(let i = 0;  i <= localStorage.length-1; i++){
        //Récupération des clefs dans une variable
        key = localStorage.key(i); 
        //Transformation de la chaine JSON en objet JavaScript 
        newProduct = JSON.parse(localStorage.getItem(key));
          //Création des divs contenant les produits du panier
          const cardProduct = document.createElement("div");
            cardProduct.id = newProduct.id;
            cardProduct.className = "dropdown-item pl-1";
            //Création du cadre
            const frameProduct = document.createElement("div");
              frameProduct.className= "col-4 col-lg-12";
              //Création de l'image
              const imgProduct = document.createElement("img");
                imgProduct.src = newProduct.img;
                imgProduct.alt = "Peluche d'ourson nommée " + newProduct.name + " vendu par l'entreprise Orinoco";
                imgProduct.className = "w-25 h-25 pr-2 d-inline";
              //Création du paragraphe et son texte
              const textProduct = document.createElement("p");
                textProduct.className = "text-center d-inline";
                textProduct.innerHTML = newProduct.name;
              //Céation du delete produit dans le panier
              const deleteProduct = document.createElement("span");
                deleteProduct.innerHTML = "⊗";
                deleteProduct.className = "ml-4 h4";
                deleteProduct.addEventListener("click", function(){
                  localStorage.removeItem(key);
                })
            //Création du séparateur
            const separatorProduct = document.createElement("div");
              separatorProduct.className = "dropdown-divider"; 
        //Importation au Dom de l'élément suivit des éléments enfants s'il y a
        if(basket){
            appendDOM(basket,productList,cardProduct);
            appendDOM(cardProduct,frameProduct,imgProduct,textProduct,deleteProduct);
            appendDOM(productList,separatorProduct);
        }
      }
  }
}
export function createOnProduct(data){
  let idUrl = window.location.hash.substr(1);
  const elementOnProduct = document.querySelector("div[onProductTeddies]");
    for(let i = 0; i < data.length; i++){
        if(idUrl == data[i]._id){
            //Création de la colonne de l'image
            const frameImg = document.createElement("div");
              frameImg.className= "col-12 col-sm-4 h-50 ";
              //Création de l'image
              const img = document.createElement("img");
                img.src = data[i].imageUrl;
                img.alt = "Peluche d'ourson nommée " + data[i].name + " vendu par l'entreprise Orinoco";
                img.className = "w-100 h-100";
            //Création de la colonne du contenu
            const content = document.createElement("div");
              content.className = "col-12 col-sm-6 mt-2";
              //Création du titre
              const title = document.createElement("h1");
                title.innerHTML = data[i].name;
                title.className = "text-center font-weight-bold h2";
              //Création de la liste de sélection des couleurs
              const labelSelect = document.createElement("label");
                labelSelect.for = "colors-select";
                labelSelect.innerHTML = "Choix de la couleur : ";
                labelSelect.className = "mt-2 mr-2"
              const select = document.createElement("select");
                select.name = "colors";
                select.id = "colors-select";
                  for(let j = 0; j < data[i].colors.length; j++){
                    const option = document.createElement("option");
                      option.value = data[i].colors[j];
                      option.innerHTML = data[i].colors[j];
                      select.appendChild(option);
                  }
              //Création du paragraphe de la description
              const description = document.createElement("p");
                description.innerHTML = data[i].description;
                description.className = "mt-4";
            //Création de la colonne du prix
            const sidebarPrice = document.createElement("div");
              sidebarPrice.className = "col-12 col-sm-2 px-0 mt-2";
              //Création du paragraphe du prix
              const price = document.createElement("p");
                price.innerHTML = "Prix de : " + (data[i].price/100) + " €";
                price.className = " text-center border border-dark bg-dark text-white rounded w-75 mt-2 ml-2 py-2";
             //Création du btn d'achat
              const btn = document.createElement("button");
                  btn.id = "command";
                  btn.innerHTML = "Ajouter au panier";
                  btn.className = " text-center btn btn-dark w-75 mt-2 ml-2";
                  btn.addEventListener("click",function(){
                    if(window.localStorage && window.localStorage !== null){
                      if(!localStorage.getItem(idUrl)){
                        let newProduct ={
                          img : data[i].imageUrl,
                          id : data[i]._id,
                          name : data[i].name,
                          price : data[i].price,   
                      }; 
                      newProduct = localStorage.setItem((data[i]._id), JSON.stringify(newProduct));
                      if(localStorage.getItem(idUrl)){
                        tp(idUrl)
                      }
                      
                      }else if(localStorage.getItem(idUrl)){
                        return false
                      }}else{
                      console.log("localStorage n'est pas supporté");
                    }
                 })                  
            //Ajout des éléments au DOM suivit des éléments enfants maximum s'il y a 
            if(elementOnProduct){
              appendDOM(elementOnProduct,frameImg,img);
              appendDOM(elementOnProduct,content,title,labelSelect,select,description);
              appendDOM(elementOnProduct,sidebarPrice,price,btn);
            }
        }
    }
}

function tp(key){
  const newProduct = JSON.parse(localStorage.getItem(key));
  console.log(newProduct)
  //Création des divs contenant les produits du panier
  const cardProduct = document.createElement("div");
    cardProduct.id = newProduct.id;
    cardProduct.className = "dropdown-item pl-1";
    //Création du cadre
    const frameProduct = document.createElement("div");
    frameProduct.className= "col-4 col-lg-12";
          //Création de l'image
          const imgProduct = document.createElement("img");
            imgProduct.src = newProduct.img;
            imgProduct.alt = "Peluche d'ourson nommée " + newProduct.name + " vendu par l'entreprise Orinoco";
            imgProduct.className = "w-25 h-25 pr-2 d-inline";
          //Création du paragraphe et son texte
          const textProduct = document.createElement("p");
            textProduct.className = "text-center d-inline";
            textProduct.innerHTML = newProduct.name;
          //Céation du delete produit dans le panier
          const deleteProduct = document.createElement("span");
            deleteProduct.innerHTML = "⊗";
            deleteProduct.className = "ml-4 h4";
            deleteProduct.addEventListener("click", function(){
              localStorage.removeItem(key);
            })
        //Création du séparateur
        const separatorProduct = document.createElement("div");
          separatorProduct.className = "dropdown-divider"; 
    //Importation au Dom de l'élément suivit des éléments enfants s'il y a
    if(basket){
        appendDOM(basket,productList,cardProduct);
        appendDOM(cardProduct,frameProduct,imgProduct,textProduct,deleteProduct);
        appendDOM(productList,separatorProduct);
    }
  }