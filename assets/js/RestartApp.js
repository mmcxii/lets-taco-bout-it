// Pages
const landPage = document.querySelector('#home');
const restPage = document.querySelector('#rest');
const recPage = document.querySelector('#rec');
const favPage = document.querySelector('#fav');

// Components
const goHomeBtn = document.querySelector('#go-home-btn');
const hero = document.querySelector('#hero');
const spinners = document.querySelectorAll('.spinner');

goHomeBtn.addEventListener('click', resetApp);

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

    restaurantSection.innerHTML = '';
}
