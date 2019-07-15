const modal = document.querySelector('#yelp-form-modal');
const closeModalBtn = document.querySelector('#yelp-form-close');
const optionsBtns = document.querySelector('#options-btns');

closeModalBtn.addEventListener('click', closeModal);
optionsBtns.addEventListener('click', openModal);

function closeModal() {
    modal.classList.add('hide');
}

function openModal(e) {
    if (e.target.id === 'restaurant-btn' || e.target.id === 'hybrid-btn') {
        modal.classList.remove('hide');
    }
}
