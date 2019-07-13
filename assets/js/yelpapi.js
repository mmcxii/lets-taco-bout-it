

function searchYelp(zip, num) {
    const yelpApiKey = '_S1aN5XX2NulTwbVa_xJ0VAVwi3yZahAQbvK00zPrdlmA7EbcxE8MUl4a6HDphu_sWjRuIltYlyNNJkcjiXaxaYKKsADjZU8n_uGv1wRSCN3PNbB9e7mvaymJBUmXXYx';

    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=taco&location=${zip}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${yelpApiKey}`,
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then((data) => data.json())
        .then((data) => updatePage(data, num));
}

function updatePage(data, int) {
    let count = 0;
    let restaurantSection = document.getElementById('restaurant__list');

    for (let i = 0; i < int; i++) {

        const info = data.businesses[i];
        const number = info.display_phone;
        const img = info.image_url;
        const price = info.price;
        const link = info.transactions.url;
        const rating = info.rating;
        const name = info.name;
        const streetAddress = info.location.display_address[0];
        const cityAddress = info.location.display_address[1];
        const address = streetAddress +' '+ cityAddress;

        const newSection = document.createElement('section');
        newSection.classList.add('card');
        newSection.classList.add('restaurant')
        newSection.innerHTML = `
        <h3 class="card__title restaurant__title">
        <a href="${link}">${name}</a >
    </h3 >
        <section class="card__body">
            <section class="restaurant__info">
                <aside class="restaurant__photo">
                    <img class="restaurant__photo__item" src="${img}"/>
                </aside>
                <section class="restaurant__location">
                    <section class="restaurant__address">
                        ${address}
                </section>
                </section>
                <section class="restaurant__rating">
                ${rating}/5
                </section>
                <section class="restaurant__price">
                ${price}
                </section>
                <section class="restaurant__contact">
                    ${number}
            </section>
                <section class="restaurant__fav-del">
                    <button class="restaurant__btn--fav btn--trans" data-fav="${count}">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="restaurant__btn--del btn--trans" data-del="${count}">
                        <i class="fas fa-trash"></i>
                    </button>
                </section>
            </section>
        </section>`

        restaurantSection.appendChild(newSection);
        count++;
    }
}

const restaurauntBtn = document.getElementById('restaurant-btn')

restaurauntBtn.addEventListener('click', () => {
    const restSection = document.getElementById('yelp-form-module');
    restSection.classList.remove('hide');
})

const yelpBtn = document.getElementById('yelp-form__btn--submit');

yelpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const zipInput = document.getElementById('yelp-form__field');
    const landing = document.getElementById('home');
    const hero = document.getElementById('hero');
    const zip = zipInput.value;
    const restPage = document.getElementById('rest');

    landing.classList.add('hide');
    hero.classList.add('shrink');
    restPage.classList.remove('hide');

    searchYelp(zip, 10);
})