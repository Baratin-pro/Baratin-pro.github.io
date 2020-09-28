//      Importation
//Importation de la liste des produits de la page d'accueil
import createArticle from './listesproduits.js';
//Importation de la sélection individuelle du produit
import {doShowBasket,createOnProduct} from './product.js';
//    Dynamisation du panier des pages
//Emplacement de la liste des produits du panier
const basket = document.getElementById('basket');
//Active-désactive la listes des produits dans le panier
let nbrclick = 1;
basket.addEventListener('click', function(){
  if(productList.classList.contains('show')){
    productList.classList.remove('show');
  }else if(localStorage.length > 0){
    productList.classList.add('show');
    if(nbrclick === 1){
      doShowBasket()
    }else{
      return false
    }   
  }
  nbrclick = 2;
})
//Sélection de la div contenant la liste des produits du panier 
const productList = document.querySelector('div .dropdown-menu');
//Fetch
const getTeddiesAll = async function(){
    try{
      let response = await fetch('http://localhost:3000/api/teddies');
        if(response.ok){
          let data = await response.json()
          createArticle(data); 
          createOnProduct(data);
        }else{
            console.error('Retour du serveur : ', response.status);
          }
        }catch(e){
          console.log(e)
        }
}
getTeddiesAll();