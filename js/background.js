function addToFavorites() {
    const like = document.getElementById('like');
    like.addEventListener('click', (e) => {
        const time = Date.now().toString();
        const author = document.getElementById('new-quote-author').innerText;
        const quote = document.getElementById('new-quote').innerText;
        const data = {
            author: author,
            quote: quote
        }
        chrome.storage.local.get(null, (quotes) => {
            let already = false;
            for(const key in quotes) {
                if(key === time || (quotes[key].author === author && quotes[key].quote === quote)) {
                    already = true;
                    break
                }
            }
            if(!already) {
                chrome.storage.local.set({[time]: data});
                renderFavoritesSection();
            }
        })
    });

}
addToFavorites();

function createFavoriteDiv(time, quote, author) {
    const favoriteDiv = document.createElement('div');
    favoriteDiv.classList.add('favorite-quote-container');
    const quotePlace = document.createElement('div');
    quotePlace.innerText = quote;
    quotePlace.classList.add('quote');
    const authorPlace = document.createElement('div');
    authorPlace.innerText = author;
    authorPlace.classList.add('author');
    const removeFavoriteButton = document.createElement('button');
    removeFavoriteButton.classList.add('remove-favorite-button');
    removeFavoriteButton.dataset.time = time;
    const removeFavoriteIcon = document.createElement('img');
    removeFavoriteIcon.src = '../img/close.svg';
    removeFavoriteIcon.width = 12;
    removeFavoriteButton.appendChild(removeFavoriteIcon);
    favoriteDiv
        .appendChild(quotePlace)
        .appendChild(authorPlace)
        .appendChild(removeFavoriteButton)

    return favoriteDiv;
}
function includeFavorites() {
    const favoriteContainer = document.getElementById('favorite-quotes-container');
    chrome.storage.local.get(null, (quotes) => {
        for (const key in quotes) {
            let favoriteQuote = createFavoriteDiv(key, quotes[key].quote, quotes[key].author);
            favoriteContainer.appendChild(favoriteQuote);
        }
        removeFavoriteAction();
        removeLastFavoriteBorder();
    });
}

function removeFavoriteAction() {
    const removeFavoriteButton = document.getElementsByClassName('remove-favorite-button');
    for (const button of removeFavoriteButton) {
        button.addEventListener('click', (e) => {
            button.closest('.favorite-quote-container').remove();
            removeLastFavoriteBorder();
            chrome.storage.local.remove(button.dataset.time);
        })
    }
}

function removeLastFavoriteBorder() {
    const favoriteContainer = document.getElementById('favorite-quotes-container');
    if (favoriteContainer.hasChildNodes()) {
        const favoriteLastChild = favoriteContainer.lastChild;
        favoriteLastChild.style.border= 'none';
    }
}




