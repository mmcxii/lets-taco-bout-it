let used = [];
let fail = 0;

    document.getElementById("recipe-btn").addEventListener('click', function fetchNow() {
        
        fetch('http://taco-randomizer.herokuapp.com/random/?full-taco=true')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
             if(fail > 10){
                 return;
             }
            if(used.length < 10){


                let isNew = true;

                for(let j = 0; j < used.length; j++){
                    if(used[j] === myJson.name){
                        fail++;
                        console.log(fail);
                        isNew = false;
                        break;
                    }
                }
                if(isNew){
                    let button = document.createElement("button");
                    let recipe = document.createElement("p");
                    // if(myJson.shell = undefined){
                        
                    // }
    
                    //write name to button
                    button.innerHTML = myJson.name;
                    button.classList.add("collapse");
    
                    recipe.innerHTML = myJson.base_layer.recipe;
                    recipe.classList.add("recipeContent")
    
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
        
    })


var coll = document.getElementById('tacoFancyContent');


    
    coll.addEventListener("click", function(event) {
   
    

    if(!event.target.matches('.collapse')){
        return;
    }else{
    var content = event.target.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
}
  });
