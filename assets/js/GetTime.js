function updateTime() {
    const currentTime = moment().format('h:mm A');
    const currentDay = moment().format('dddd');

    const dest = document.querySelector('#current-time');

    dest.textContent = `${currentTime} on a ${currentDay}`;
}

updateTime();

// Update time every minute
setInterval(() => {
    updateTime();
}, 60000);
