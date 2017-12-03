window.onload = function () {
    let aboutScreen = document.querySelector('#about-screen');
    let eventsScreen = document.querySelector('#events-screen');
    let eventsTab = document.querySelector('#events-screen-tab');
    let aboutTab = document.querySelector('#about-screen-tab');

    eventsTab.addEventListener('click', event => {
        aboutScreen.style.left = '100%';
        eventsScreen.style.left = '0';
        $(aboutTab).removeClass('selected');
        $(eventsTab).addClass('selected');
    });

    aboutTab.addEventListener('click', event => {
        aboutScreen.style.left = '0';
        eventsScreen.style.left = '-100%';
        $(eventsTab).removeClass('selected');
        $(aboutTab).addClass('selected');
    });

    let newEventButton = document.querySelector('#new-event-button');
    let newEventScreen = document.querySelector('#new-event-screen');

    newEventButton.addEventListener('click', event => {
        newEventScreen.style.top = '0';
    });

    newEventScreen.style.top = window.innerHeight + 'px';
};