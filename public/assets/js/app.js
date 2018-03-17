$(document).ready(function () {
    $('#scrape-button').on('click', () => {
        $.getJSON('/scrape', () => console.log('scraper pressed'));
    });
});
