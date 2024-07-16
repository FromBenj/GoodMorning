//To clear local storage
// chrome.storage.local.clear(function() {
//     console.log('Local storage cleared');
// });

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
                if(key === time || quotes[key] === data) {
                    already = true;
                    break
                }
            }
            if(!already) {
                chrome.storage.local.set({[time]: data});
                renderFavoritesSection();
            }
        });
    })
}

addToFavorites();

function createFavoriteDiv(quote, author) {
    const favoriteDiv = document.createElement('div');
    favoriteDiv.style.padding = '1rem 0';
    const quotePlace = document.createElement('div');
    quotePlace.innerText = quote;
    quotePlace.classList.add('quote');
    const authorPlace = document.createElement('div');
    authorPlace.innerText = author;
    authorPlace.classList.add('author');
    favoriteDiv
        .appendChild(quotePlace)
        .appendChild(authorPlace)

    return favoriteDiv;
}
function getFavorites() {
    const favoriteContainer = document.getElementById('favorite-quotes-container');
    chrome.storage.local.get(null, (quotes) => {
        for (const key in quotes) {
            let favoriteQuote = createFavoriteDiv(quotes[key].quote, quotes[key].author);
            favoriteContainer.appendChild(favoriteQuote);
        }
    });
}




