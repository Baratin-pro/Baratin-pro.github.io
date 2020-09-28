//Fonction rajout l'élément et tous ces enfants s'il y a 
function appendDOM(elementParent,element,...moreArguments){
  elementParent.appendChild(element);
    for(let i = 0; i < moreArguments.length; i++) {
      if(moreArguments[i]){
        element.appendChild(moreArguments[i]);
      }
  }
}
const listArticles = document.querySelector('div[teddies]');
export default function createArticle(data){
  for(let i = 0; i < data.length; i++){
    //Création des blogs articles
    const cartArticles = document.createElement('div');
    const attrCartArticles = document.createAttribute('cartTeddies');
      cartArticles.id = data[i]._id;
      cartArticles.className = "col-12 col-sm-5 col-md-3 col-lg-2 m-auto m-sm-3 p-3 border bg-warning";
      cartArticles.setAttributeNode(attrCartArticles);
      //Création du H2
      const title = document.createElement('h2');
        title.innerHTML = data[i].name;
        title.className = "text-center h4";
      //Création du blog de l'image
      const frameImg = document.createElement('div');
        frameImg.className= " col-5 col-sm-8 col-md-10 h-50 mx-auto";
      //Création de l'image
      const img = document.createElement('img');
        img.src = data[i].imageUrl;
        img.alt = "Peluche d'ourson nommée " + data[i].name + " vendu par l'entreprise Orinoco";
        img.className = "w-100 h-100";
      //Création du paragraphe du prix
      const price = document.createElement('p');
        price.innerHTML = (data[i].price/100) + " €";
        price.className = "text-right font-weight-bold";
      //Création du bouton
      const formBtn = document.createElement('form');
        formBtn.method = "GET";
        formBtn.action = "product.html#" + data[i]._id;
      const btn = document.createElement('input');
        btn.type = "submit";
        btn.value = "Description";
        btn.className = "btn btn-dark w-100 mb-4";
      //Ajout des éléments au DOM
      if(listArticles){
        appendDOM(listArticles,cartArticles,title,frameImg,price,formBtn);
        appendDOM(frameImg,img);
        appendDOM(formBtn,btn);
      }
      
  } 
}