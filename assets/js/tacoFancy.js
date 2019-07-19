let used = [];
let fail = 0;
let end = 0;
let recipefavorites;
let storage;
const favsPage = document.getElementsByClassName('favs-page');
const favsRec = document.getElementById('favs-recipes');
const favsPageBtn = document.getElementById('user-favs-btn');
const restPage = document.getElementById('rest');
const recPage = document.getElementById('rec');

if (localStorage.getItem('rec') !== null) {
        restaurantFavorites = JSON.parse(localStorage.getItem('rec'));
}



function fetchNow(){
    fetch('https://taco-randomizer.herokuapp.com/random/?full-taco=true')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
     if(fail > 30){
         return;
     }
    if(used.length < end){


        let isNew = true;

        for(let j = 0; j < used.length; j++){
            if(used[j] === myJson.name){
                fail++;
                isNew = false;
                break;
            }
        }
        if(isNew){
            //<button class="rec-rest__btn--fav btn--trans" data-fav="${i}">
            //<i data-fav="${i}" class="fas fa-star"></i>
        //</button>
            let button = document.createElement("h3");
            let recipe = document.createElement("p");
            let cardIntro = document.createElement('section');
            let cardBody = document.createElement('section');
            let cardMain = document.createElement('section');
            let favBtn = document.createElement('button');
            let shell = '';
            let seasoning = '';
            let condiment = '';
            let mixin = '';
            if(myJson.shell != undefined){
            shell = myJson.shell.recipe;
            }
            if(myJson.seasoning != undefined){
            seasoning = myJson.seasoning.recipe;
            }
            if(myJson.condiment != undefined){
            condiment = myJson.condiment.recipe;
            }
            if(myJson.mixin != undefined){
            mixin = myJson.mixin.recipe;
            }
            var converter = new showdown.Converter();
            
            cardIntro.classList.add('reccard');
            cardIntro.classList.add('card');
            cardBody.classList.add('card__body');
            cardMain.classList.add('card__main');
            cardMain.classList.add('hide');
            //favorite button
            favBtn.classList.add('rec-rest__btn--fav');
            favBtn.classList.add('btn--trans');
            favBtn.innerHTML = '<i data-fav="${i}" class="fas fa-star"></i>'
            //write name to button
            button.innerHTML = myJson.name;
            button.classList.add("reccard__title");
            button.classList.add("card__title");
            
            recipe.innerHTML = converter.makeHtml(myJson.base_layer.recipe)  + converter.makeHtml(shell) + converter.makeHtml(seasoning) + converter.makeHtml(condiment) + converter.makeHtml(mixin);
            
            //append everything
            let content = document.getElementById("reccontent");
            
            cardMain.append(recipe);
            button.append(favBtn);
            cardBody.append(button);
            cardBody.append(cardMain);
            cardIntro.append(cardBody);

           // content.append(button);
            content.append(cardIntro);
            used.push(myJson.name);
        }
           fetchNow();      
     }else{
         return;
     }
    })


}
    document.getElementById("recipe-btn").addEventListener('click', function () {
        fail = 0;
        end += 10;
        const recipePage = document.getElementById('rec');
        const landingPage = document.getElementById('home');
        landingPage.classList.add('hide');
        recipePage.classList.remove('hide');
        fetchNow();
        
    })


//Expandable recipe on click event
var coll = document.getElementById('reccontent');
    coll.addEventListener("click", function(event) {
   

    if(!event.target.matches('.card__title')){
        return;
    }else{
    var content = event.target.nextElementSibling;
    if (content.classList.contains('hide')) {
      content.classList.remove('hide');
    } else {
      content.classList.add('hide');
    }
}
  });
  //clear localStorage
    //localStorage.clear();
  //favorite button on click event
  coll.addEventListener('click', function(e){
    if(!event.target.matches('.fa-star')){
        return;
    }else{
        console.log('clicked');
        let recipeContent = e.target.parentElement.parentElement.parentElement.parentElement;
        //let titleEl = buttonEl.parentElement;
        //let recipeEl = titleEl.nextElementSibling;

        let title = recipeContent.outerHTML;
        //let recipe = recipeEl.outerHTML;

        // let recipeObj = {
        //     Title: title,
        //     Recipe: recipe
        // }

        restaurantFavorites.push(title);
        localStorage.setItem('rec', JSON.stringify(restaurantFavorites));

      

    }
  })


favsPageBtn.addEventListener('click', function(){
    favsPage[0].classList.remove('hide');
    restPage.classList.add('hide');
    recipePage.classList.add('hide');

    let title;


    storage = JSON.parse(window.localStorage.getItem('rec'));
    
    for (let i = 0; i < storage.length; i++) {
   
    title = storage[i]
    let test = document.createElement('div');
    test.innerHTML = title;

    favsRec.append(test)
            
    }



})
favsRec.addEventListener("click", function(event) {
   

    if(!event.target.matches('.card__title')){
        return;
    }else{
    var content = event.target.nextElementSibling;
    if (content.classList.contains('hide')) {
      content.classList.remove('hide');
    } else {
      content.classList.add('hide');
    }
}
});