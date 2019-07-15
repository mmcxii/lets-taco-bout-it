const goHomeBtn = document.querySelector('#go-home-btn');
const hero = document.querySelector('#hero');
const landingPage = document.querySelector('#home');
const recipePage = document.querySelector('#recipes');
const restaurantPage = document.querySelector('#rest');
const hybridPage = document.querySelector('#hybrid');

goHomeBtn.addEventListener('click', resetApp);

function resetApp() {
    hero.classList.remove('shrink');

    landingPage.classList.remove('hide');
    recipePage.classList.add('hide');
    restaurantPage.classList.add('hide');
    hybridPage.classList.add('hide');
}
