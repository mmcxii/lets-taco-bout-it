let restaurantFavorites = [];

if (localStorage.getItem('rest') !== null) {
    restaurantFavorites = JSON.parse(localStorage.getItem('rest'));
}

function searchYelp(zip, num, lat, long) {


    const yelpApiKey =
        '_S1aN5XX2NulTwbVa_xJ0VAVwi3yZahAQbvK00zPrdlmA7EbcxE8MUl4a6HDphu_sWjRuIltYlyNNJkcjiXaxaYKKsADjZU8n_uGv1wRSCN3PNbB9e7mvaymJBUmXXYx';

    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=taco&limit=11`;

    if (zip !== '') {
        queryURL += `&location=${zip}`;
    }

    if (lat && long) {
        queryURL += `&latitude=${lat}&longitude=${long}`
    }

    fetch(queryURL,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${yelpApiKey}`,
                'Access-Control-Allow-Origin': '*',
            },
        }
    )
        .then((data) => data.json())
        .then((data) => {
            updatePage(data, num);
            const spinner = document.querySelector('.spinner');
            spinner.classList.add('hide');
        });
}

function updatePage(data, int) {
    let restaurantSection = document.getElementById('restaurant__list');

    restaurantSection.innerHTML = '';

    for (let i = 0; i < int; i++) {

        //discuss with team and decide if we should add checks for undefined, or just remove price.

        const info = data.businesses[i];
        const number = info.display_phone;
        const img = info.image_url;
        let price = info.price;
        const link = info.url;
        const rating = info.rating;
        const name = info.name;
        const streetAddress = info.location.display_address[0];
        const cityAddress = info.location.display_address[1];
        const address = streetAddress + ' ' + cityAddress;

        if (price === undefined) {
            price = 'Price unavailable';
        }

        const newSection = document.createElement('section');
        newSection.classList.add('card');
        newSection.classList.add('restaurant');
        newSection.setAttribute('data-parent', i);
        newSection.innerHTML = `
        <h3 class="card__title restaurant__title">
        <a data-name="${i}" href="${link}" target="new">${name}</a >
    </h3 >
        <section class="card__body">
            <section class="restaurant__info">
                <aside class="restaurant__photo">
                    <img data-img="${i}" class="restaurant__photo__item" src="${img}"/>
                </aside>
                <section class="restaurant__location">
                    <section data-address="${i}" class="restaurant__address">
                        ${address}
                </section>
                </section>
                <section data-rating="${i}" class="restaurant__rating">
                ${rating}/5
                </section>
                <section data-price="${i}" class="restaurant__price">
                ${price}
                </section>
                <section data-phone="${i}" class="restaurant__contact">
                    ${number}
            </section>
                <section class="restaurant__fav-del">
                    <button class="rec-rest__btn--fav btn--trans" data-fav="${i}">
                        <i data-fav="${i}" class="fas fa-star"></i>
                    </button>
                    <button class="rec-rest__btn--del btn--trans" data-del="${i}">
                        <i data-del="${i}" class="fas fa-trash"></i>
                    </button>
                </section>
            </section>
        </section>`;

        restaurantSection.appendChild(newSection);
    }
}

const yelpModal = document.getElementById('yelp-form-modal');

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
    yelpModal.classList.add('hide');

    searchYelp(zip, 10);
});

const restaurantListener = document.getElementById('restaurant__list');

restaurantListener.addEventListener('click', (e) => {

    console.log('clicked');

    if (e.target.dataset.fav) {
        const num = e.target.dataset.fav;
        const nameEl = document.querySelector('[data-name="' + num + '"]');
        const addressEl = document.querySelector('[data-address="' + num + '"]');
        const ratingEl = document.querySelector('[data-rating="' + num + '"]');
        const priceEl = document.querySelector('[data-price="' + num + '"]');
        const phoneEl = document.querySelector('[data-phone="' + num + '"]');
        const imgEl = document.querySelector('[data-img="' + num + '"]');

        const link = nameEl.getAttribute('href');
        const name = nameEl.text.trim();
        const address = addressEl.textContent.trim();
        const rating = ratingEl.textContent.trim();
        const price = priceEl.textContent.trim();
        const phone = phoneEl.textContent.trim();
        const img = imgEl.getAttribute('src');

        let obj = {
            'link': link,
            'name': name,
            'address': address,
            'rating': rating,
            'price': price,
            'phone': phone,
            'img': img
        }

        if (restaurantFavorites.length >= 0) {

            for (let i = 0; i < restaurantFavorites.length; i++) {

                if (restaurantFavorites[i]['name'] === name) {

                    return;
                }
            }
            restaurantFavorites.push(obj);
            localStorage.setItem('rest', JSON.stringify(restaurantFavorites));
        }
    } 

    if (e.target.dataset.del) {
        let delNum = e.target.dataset.del;

        let parent = document.querySelector('[data-parent="' + delNum + '"]');

        parent.classList.add('hide');

    }
})

const favRest = document.getElementById('favs-restaurants');

function updateRestFavorites() {
    favRest.innerHTML = '';

    if (restaurantFavorites.length < 1) {
        return;
    } else {
        const favsPage = document.querySelector('.favs-page');

        favsPage.classList.remove('hide');

        for (let i = 0; i < restaurantFavorites.length; i++) {
            const data = restaurantFavorites[i];
            const link = data.link;
            const name = data.name;
            const address = data.address;
            const rating = data.rating;
            const price = data.price;
            const phone = data.phone;
            const img = data.img;

            const newSection = document.createElement('section');
            newSection.classList.add('card');
            newSection.classList.add('restaurant');
            newSection.setAttribute('data-parent', i);

            newSection.innerHTML = `
        <h3 class="card__title restaurant__title">
        <a data-name="${i}" href="${link}" target="new">${name}</a >
    </h3 >
        <section class="card__body">
            <section class="restaurant__info">
                <aside class="restaurant__photo">
                    <img class="restaurant__photo__item" src="${img}"/>
                </aside>
                <section class="restaurant__location">
                    <section data-address="${i}" class="restaurant__address">
                        ${address}
                </section>
                </section>
                <section data-rating="${i}" class="restaurant__rating">
                ${rating}
                </section>
                <section data-price="${i}" class="restaurant__price">
                ${price}
                </section>
                <section data-phone="${i}" class="restaurant__contact">
                    ${phone}
            </section>
                <section class="restaurant__fav-del">
                    <button class="rec-rest__btn--del btn--trans" data-del="${i}">
                        <i data-del="${i}" class="fas fa-trash"></i>
                    </button>
                </section>
            </section>
        </section>`
            favRest.appendChild(newSection);
        }
    }
}

favRest.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.dataset.del) {
        let num = e.target.dataset.del;
        restaurantFavorites.splice(num, 1);
        localStorage.setItem('rest', JSON.stringify(restaurantFavorites));
        updateRestFavorites();
    } else {
        return;
    }

})

const locationBtn = document.getElementById('location-btn');

locationBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const landing = document.getElementById('home');
    const hero = document.getElementById('hero');
    const restPage = document.getElementById('rest');

    landing.classList.add('hide');
    hero.classList.add('shrink');
    restPage.classList.remove('hide');
    yelpModal.classList.add('hide');

    searchYelp('', 10, lat, long);
})

const signInFavListener = document.querySelector('.user-info')

signInFavListener.addEventListener('click', (e) => {
    e.preventDefault();

    const landing = document.getElementById('home');
    const hero = document.getElementById('hero');

    landing.classList.add('hide');
    hero.classList.add('shrink');

    if (e.target.dataset.btn === 'favorites') {
        updateRestFavorites();
    } else {
        return;
    }
})

