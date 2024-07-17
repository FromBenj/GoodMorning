const api_url = "https://api.quotable.io/quotes/random";
async function getRandomQuote() {
    const response = await fetch(api_url,  {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': ''
        }
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const quote = await response.json();

    return quote[0];
}
getRandomQuote().then((data) =>  {
    quoteData(data);
    keepMainContainerHeight();
});

function quoteData(data) {
    const quote = document.getElementById('new-quote');
    const author = document.getElementById('new-quote-author');
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}

function keepMainContainerHeight() {
    const mainContainer = document.getElementById('main-container');
    const mainContainerHeight = mainContainer.offsetHeight + 50;
    mainContainer.style.height = `${mainContainerHeight}px`;
}

function openFavoriteSection() {
    const favoriteSectionButton = document.getElementById('favorite-section-button');
    favoriteSectionButton.addEventListener('click', () => {
        const favoriteSection = document.getElementById('favorites-section');
        favoriteSection.style.display = 'block';
        favoriteSectionButton.style.display = 'none';
        removeFavoriteAction();
    });
}
openFavoriteSection();

function closePopup() {
    const close = document.getElementById('close-button');
    close.addEventListener('click', () => {
        window.close();
    });
}
closePopup();


