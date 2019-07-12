const openBtn = document.querySelector('#nav__toggle--open');
const closeBtn = document.querySelector('#nav__toggle--close');
const navMenu = document.querySelector('#nav__menu');
const body = document.querySelector('body');

openBtn.addEventListener('click', () => {
    openBtn.classList.add('hidden');
    navMenu.classList.add('shift');
    body.classList.add('shift');
});

closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('shift');
    body.classList.remove('shift');

    // Delay return of hamburger button
    setTimeout(() => {
        openBtn.classList.remove('hidden');
    }, 200);
});
