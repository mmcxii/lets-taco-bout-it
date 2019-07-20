let used = [];
let fail = 0;
let end = 0;
let recipeFavorites = [];
let storage = [];
let title;

const favsRec = document.getElementById('favs-recipes');
const favsPageBtn = document.getElementById('user-favs-btn');

const coll = document.getElementById('reccontent');
//checks local storage for existing items
if (localStorage.getItem('rec') !== null) {
    recipeFavorites = JSON.parse(localStorage.getItem('rec'));
}

//fetch function for API
function fetchNow() {
    fetch('https://taco-randomizer.herokuapp.com/random/?full-taco=true')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            if (fail > 30) {
                return;
            }
            if (used.length < end) {
                let isNew = true;
                coll.classList.add('hide');

                for (let j = 0; j < used.length; j++) {
                    if (used[j] === myJson.name) {
                        fail++;
                        isNew = false;
                        break;
                    }
                }
                if (isNew) {
                    //<button class="rec-rest__btn--fav btn--trans" data-fav="${i}">
                    //<i data-fav="${i}" class="fas fa-star"></i>
                    //</button>
                    let button = document.createElement('h3');
                    let recipe = document.createElement('p');
                    let cardIntro = document.createElement('section');
                    let cardBody = document.createElement('section');
                    let cardMain = document.createElement('section');
                    let favBtn = document.createElement('button');
                    let remBtn = document.createElement('button');
                    let shell = '';
                    let seasoning = '';
                    let condiment = '';
                    let mixin = '';
                    if (myJson.shell != undefined) {
                        shell = myJson.shell.recipe;
                    }
                    if (myJson.seasoning != undefined) {
                        seasoning = myJson.seasoning.recipe;
                    }
                    if (myJson.condiment != undefined) {
                        condiment = myJson.condiment.recipe;
                    }
                    if (myJson.mixin != undefined) {
                        mixin = myJson.mixin.recipe;
                    }
                    var converter = new showdown.Converter();

                    cardIntro.classList.add('reccard');
                    cardIntro.classList.add('card');
                    cardBody.classList.add('card__body');
                    cardMain.classList.add('card__main');
                    cardMain.classList.add('hide');
                    //Trash can button rec-rest__btn--del btn--trans
                    remBtn.classList.add('rec-rest_btn--del');
                    remBtn.classList.add('btn--trans');
                    remBtn.innerHTML = '<i data-del="${i}" class="fas fa-trash"></i>';
                    //favorite button
                    favBtn.classList.add('rec-rest__btn--fav');
                    favBtn.classList.add('btn--trans');
                    favBtn.innerHTML = '<i data-fav="${i}" class="fas fa-star"></i>';
                    //write name to button
                    button.innerHTML = myJson.name;
                    button.classList.add('reccard__title');
                    button.classList.add('card__title');

                    recipe.innerHTML =
                        converter.makeHtml(myJson.base_layer.recipe) +
                        converter.makeHtml(shell) +
                        converter.makeHtml(seasoning) +
                        converter.makeHtml(condiment) +
                        converter.makeHtml(mixin);

                    //append everything
                    let content = document.getElementById('reccontent');

                    cardMain.append(recipe);
                    button.append(favBtn);
                    button.append(remBtn);
                    cardBody.append(button);
                    cardBody.append(cardMain);
                    cardIntro.append(cardBody);

                    // content.append(button);
                    content.append(cardIntro);
                    used.push(myJson.name);
                }
                fetchNow();
            } else {
                coll.classList.remove('hide');
                const spinner = document.querySelector('#recipe-spinner');
                spinner.classList.add('hide');
                return;
            }
        });
}
//starts the fetch loops. Resets fails to 0 and adds to ending point of function
document.getElementById('recipe-btn').addEventListener('click', function() {
    fail = 0;
    end = 10;
    used = [];
    coll.innerHTML = '';

    // Hide Pages
    landPage.classList.add('hide');
    restPage.classList.add('hide');
    favPage.classList.add('hide');

    cardTextZone.innerHTML = recipeStr;

    // Display Recipe Page
    recPage.classList.remove('hide');

    // Shrink Hero
    hero.classList.add('shrink');
    fetchNow();
});

//Expandable recipe on click event

coll.addEventListener('click', function(event) {
    //gets the event for correct recipe title
    if (!event.target.matches('.card__title')) {
        return;
    } else {
        var content = event.target.nextElementSibling;
        if (content.classList.contains('hide')) {
            content.classList.remove('hide');
        } else {
            content.classList.add('hide');
        }
    }
});
//clear localStorage for testing or ease of use
//localStorage.clear();

//favorite button on click event
coll.addEventListener('click', function(e) {
    e.preventDefault();
    if (!event.target.matches('.fa-star')) {
        return;
    } else {
        let recipeContent = e.target.parentElement.parentElement.parentElement.parentElement;
        let title = recipeContent.outerHTML;

        recipeFavorites.push(title);
        localStorage.setItem('rec', JSON.stringify(recipeFavorites));
    }
});
//remove button on click event
coll.addEventListener('click', function(e) {
    e.preventDefault();
    if (!e.target.matches('.fa-trash')) {
        return;
    } else {
        let parent = e.target.parentElement.parentElement.parentElement;
        parent.classList.add('hide');
    }
});

//button for favorites page.
favsPageBtn.addEventListener('click', function() {
    UpdateRecFavs();
});
//local storage function
function UpdateRecFavs() {
    if (recipeFavorites.length < 1) {
        return;
    } else {
        favsRec.innerHTML = '';
        favPage.classList.remove('hide');
        restPage.classList.add('hide');
        recPage.classList.add('hide');

        storage = JSON.parse(window.localStorage.getItem('rec'));

        for (let i = 0; i < storage.length; i++) {
            title = storage[i];
            let recipeContainerDiv = document.createElement('div');
            recipeContainerDiv.setAttribute('data-index', i);
            recipeContainerDiv.innerHTML = title;

            favsRec.append(recipeContainerDiv);
        }
    }
}

//hide and show for main recipe content
favsRec.addEventListener('click', function(event) {
    event.preventDefault();

    //recipe hide
    if (!event.target.matches('.card__title')) {
        return;
    } else {
        var content = event.target.nextElementSibling;
        if (content.classList.contains('hide')) {
            content.classList.remove('hide');
        } else {
            content.classList.add('hide');
        }
    }
});

favsRec.addEventListener('click', function(event) {
    //trash can
    if (!event.target.matches('.fa-trash')) {
        return;
    } else {
        let parent = event.target.parentElement.parentElement.parentElement;
        let recIndex = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.index;
        console.log(recIndex);
        recipeFavorites.splice(recIndex, 1);
        localStorage.setItem('rec', JSON.stringify(recipeFavorites));
        UpdateRecFavs();
        parent.classList.add('hide');
    }
});
