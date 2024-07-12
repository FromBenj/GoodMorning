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
getRandomQuote().then((data) => quoteData(data));

function quoteData(data) {
    const quote = document.getElementById('new-quote');
    const author = document.getElementById('new-quote-author');
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}
