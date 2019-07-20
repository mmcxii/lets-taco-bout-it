function updateTime() {
    const dest = document.querySelector('#current-time');
    
    if (dest === null ){
        return
    }
    
    const currentTime = moment().format('h:mm A');
    const currentDay = moment().format('dddd');

    dest.textContent = `${currentTime} on a ${currentDay}`;
}

updateTime();

// Update time every minute
setInterval(() => {
    updateTime();
}, 60000);
