const openBtn = document.querySelector('#nav__toggle--open');
const closeBtn = document.querySelector('#nav__toggle--close');
const navMenu = document.querySelector('#nav__menu');
const body = document.querySelector('body');

openBtn.addEventListener('click', () => {
    navMenu.classList.add('shift');
    body.classList.add('shift');
    openBtn.classList.add('hidden');
});

closeBtn.addEventListener('click', () => {
    body.classList.remove('shift');
    navMenu.classList.remove('shift');

    // Delay return of hamburger button
    setTimeout(() => {
        openBtn.classList.remove('hidden');
    }, 100);
});
