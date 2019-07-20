// Pages
const landPage = document.querySelector('#home');
const restPage = document.querySelector('#rest');
const recPage = document.querySelector('#rec');
const favPage = document.querySelector('#fav');

// Components
const goHomeBtn = document.querySelector('#go-home-btn');
const backBtn = document.querySelector('#back-btn');
const hero = document.querySelector('#hero');
const spinners = document.querySelectorAll('.spinner');
const cardTextZone = document.getElementById('primaryText');

const landingStr = `<h3 class="card__title">Welcome</h3>
<p>
Man, are you really just <em>gassed</em> at
<span id="current-time"></span>? Or do you just have a hankerin' for some
tacos? Either way, we here at Let's Taco 'Bout It can relate. Our
proprietary, open source app can solve all of your taco related woes in
just a few simple clicks!
</p>
<p>
Our app gives <em>you</em> the power to decide on your own taco experience
from the two main schools of thought: be a true man (or woman, as the case
may be) and make your own damn tacos by selecting a recipe from our highly
currated list of proven-to-knock-your-socks-off tacos; or leave the
dangerous taco creation work to the highly trained professionals, in which
case we will provide you with a list of the ten closest places you can get
your fix!
</p>
<p>
But wait, you may be asking yourself, I see a third button, and we applaud
you for your excellent peripheral vision. That awfully handsome third
button will enable you to straddle the two ufniverses and experience the
wonders of both browsing local taquerias and trucks, as well as perusing a
few recipes simultaniously to ensure that you are truly getting the best
taco experience we can provide!
</p>`;

const recipeStr = `<h3 class="card__title">
So you're feeling ambitious and want to try out your taco craft?
</h3>
<section class="card__main">
<p>
    Take a look at the recipies we have found for you, Delete them or Favorite
    them!
</p>`;

const restStr = `Well well well, look who decided to leave it to the pros. That's fine, we
understand. Please take a look at the following selection of nearby
restaurants. Feel free to remove restaurants you don't like or if you see one
you do like go ahead and save it for later! To see a restaurant's Yelp Page,
click on its name.`;

const faveStr = `Here are your favorite recipes and restaurants! You can remove an item from your favorites by pressing the 'trashcan' icon next to an entry.`;

const hybridStr = 'Little from column A, little from column B. Never hurts to keep your options open!';

goHomeBtn.addEventListener('click', resetApp);
backBtn.addEventListener('click', resetApp);

function resetApp() {
    // Display Home Page
    landPage.classList.remove('hide');

    // Hide Secondary Pages
    recPage.classList.add('hide');
    restPage.classList.add('hide');
    favPage.classList.add('hide');

    // Reset Hero size and prepare spinners to be shown
    hero.classList.remove('shrink');
    spinners.forEach((spinner) => spinner.classList.remove('hide'));

    let restaurantSection = document.getElementById('restaurant__list');

    cardTextZone.innerHTML = landingStr;
    updateTime();

    restaurantSection.innerHTML = '';
}
