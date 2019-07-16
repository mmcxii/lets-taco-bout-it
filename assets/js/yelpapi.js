function searchYelp(zip, num) {
    const yelpApiKey =
        '_S1aN5XX2NulTwbVa_xJ0VAVwi3yZahAQbvK00zPrdlmA7EbcxE8MUl4a6HDphu_sWjRuIltYlyNNJkcjiXaxaYKKsADjZU8n_uGv1wRSCN3PNbB9e7mvaymJBUmXXYx';
    fetch(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=taco&location=${zip}`,
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
            console.log(data);
            console.log(data.businesses[0].url);
            const spinner = document.querySelector('.spinner');
            spinner.classList.add('hide');
        });
}

function updatePage(data, int) {
    let count = 0;
    let restaurantSection = document.getElementById('restaurant__list');

    for (let i = 0; i < int; i++) {
        
        //discuss with team and decide if we should add checks for undefined, or just remove price.
        
        const info = data.businesses[i];
        const number = info.display_phone;
        const img = info.image_url;
        const price = info.price;
        const link = info.url;
        const rating = info.rating;
        const name = info.name;
        const streetAddress = info.location.display_address[0];
        const cityAddress = info.location.display_address[1];
        const address = streetAddress + ' ' + cityAddress;

        const newSection = document.createElement('section');
        newSection.classList.add('card');
        newSection.classList.add('restaurant');
        newSection.innerHTML = `
        <h3 class="card__title restaurant__title">
        <a data-name="${count}" href="${link}">${name}</a >
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
                        <i data-fav="${count}" class="fas fa-star"></i>
                    </button>
                    <button class="restaurant__btn--del btn--trans" data-del="${count}">
                        <i data-del="${count}" class="fas fa-trash"></i>
                    </button>
                </section>
            </section>
        </section>`;

        restaurantSection.appendChild(newSection);
        count++;
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
    if (e.target.dataset.fav) {
        let num = e.target.dataset.fav;
        let name = document.querySelector('[data-name="'+ num + '"]');
        
        console.log(name.getAttribute('href'), name.text); //gets href and text brainstomr better ways to get values with THE boys or there will be a lot of variable declarations just to get favorites.
    } else {
        return;
    }

})

