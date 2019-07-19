let hybrid = false;

const modal = document.querySelector('#yelp-form-modal');
const closeModalBtn = document.querySelector('#yelp-form-close');
const optionsBtns = document.querySelector('#options-btns');
const modalText = document.getElementById('yelp-form-modal__text');

closeModalBtn.addEventListener('click', closeModal);
optionsBtns.addEventListener('click', openModal);
window.addEventListener('click', outsideClick);

function closeModal() {
    hybrid = false;
    modal.classList.add('hide');
    modalText.textContent = 'Please enter your zip code so we can find taquerias near you!';
}

function openModal(e) {
    if (e.target.id === 'restaurant-btn') {
        modal.classList.remove('hide');
    }

    if (e.target.id === 'hybrid-btn') {
        modal.classList.remove('hide');
        hybrid = true;
    }
}

function outsideClick(e) {
    if (e.target === modal) {
        closeModal();
    }
}
