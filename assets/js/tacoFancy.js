let used = [];
let fail = 0;
let end = 0;

function fetchNow(){
    fetch('http://taco-randomizer.herokuapp.com/random/?full-taco=true')
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

            let button = document.createElement("button");
            let recipe = document.createElement("p");
            let cardIntro = document.createElement('section');
            let cardBody = document.createElement('section');
            let cardMain = document.createElement('section');

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
            
            cardIntro.classList.add('reccard_intro');
            cardBody.classList.add('reccard_body');
            cardMain.classList.add('reccard_main');
            cardMain.classList.add('hide');

            //write name to button
            button.innerHTML = myJson.name;
            button.classList.add("reccard__title");
            
            recipe.innerHTML = converter.makeHtml(myJson.base_layer.recipe)  + converter.makeHtml(shell) + converter.makeHtml(seasoning) + converter.makeHtml(condiment) + converter.makeHtml(mixin);
            
            //append everything
            let content = document.getElementById("reccontent");
            
            cardMain.append(recipe);
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
        const recipePage = document.getElementById('reccontent');
        const landingPage = document.getElementById('home');
        landingPage.classList.add('hide');
        recipePage.classList.remove('hide');
        fetchNow();
        
    })



var coll = document.getElementById('reccontent');
    coll.addEventListener("click", function(event) {
   

    if(!event.target.matches('.reccard__title')){
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
