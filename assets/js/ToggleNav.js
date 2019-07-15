const openNavBtn = document.querySelector('#nav__toggle--open');
const closeNavBtn = document.querySelector('#nav__toggle--close');
const navMenu = document.querySelector('#nav__menu');
const body = document.querySelector('body');

openNavBtn.addEventListener('click', () => {
    navMenu.classList.add('shift');
    body.classList.add('shift');
    openNavBtn.classList.add('hidden');
});

closeNavBtn.addEventListener('click', () => {
    body.classList.remove('shift');
    navMenu.classList.remove('shift');

    // Delay return of hamburger button
    setTimeout(() => {
        openNavBtn.classList.remove('hidden');
    }, 100);
});
