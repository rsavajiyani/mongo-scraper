$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('#scrape-button').on('click', () => {
        $.getJSON('/scrape', () => console.log('scraper pressed'));
    });
});