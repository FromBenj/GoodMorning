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
    chrome.storage.local.set({lastQuote: quote[0]});

    return quote[0];
}

function renderRandomQuote() {
    getRandomQuote().then((data) =>  {
        quoteData(data);
        keepMainContainerHeight();
    });
}

function updateQuote() {
    chrome.storage.local.get("updateTime", (data) => {
        console.log(data)
        if (data.updateTime === undefined) {
            const updateTime = setUpdateTime();
            chrome.storage.local.set({updateTime: updateTime});
            renderRandomQuote();
        } else {
            const updateTime = new Date(data.updateTime);
            const newUpdateTime = new Date(setUpdateTime());
            if (newUpdateTime.getDate() > updateTime.getDate() && newUpdateTime.getHours() > updateTime.getHours()) {
                chrome.storage.local.set({updateTime: newUpdateTime.valueOf()});
                renderRandomQuote();
            } else {
                chrome.storage.local.get("lastQuote", (data) => {
                    quoteData(data.lastQuote);
                    keepMainContainerHeight();
                });
            }
        }
    });
}
updateQuote();

function setUpdateTime() {
    let updateTime = new Date();
    updateTime.setHours(8, 0, 0);
    if (updateTime. getHours() < 8) {
        updateTime.setDate(updateTime.getDate() - 1);
    }

    return updateTime.valueOf();
}


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
