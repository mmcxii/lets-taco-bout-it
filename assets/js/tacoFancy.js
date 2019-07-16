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
            
            //write name to button
            button.innerHTML = myJson.name;
            button.classList.add("card__title");
            
            recipe.innerHTML = converter.makeHtml(myJson.base_layer.recipe)  + '<br>' + converter.makeHtml(shell) + '<br>' + converter.makeHtml(seasoning) + '<br>' + converter.makeHtml(condiment) + '<br>' + converter.makeHtml(mixin);
            recipe.classList.add("card__body")
            recipe.classList.add("hide");

            let content = document.getElementById("tacoFancyContent");
            
            content.append(button);
            content.append(recipe);
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
        const recipePage = document.getElementById('recipes');

        recipePage.classList.remove('hide');
        fetchNow();
        
    })



var coll = document.getElementById('tacoFancyContent');
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
