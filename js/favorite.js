function renderFavoritesSection() {
    fetch("../html/favorite.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("favorites-section").innerHTML = data;
            includeFavorites();
            closeFavoriteSection();
        });
}
renderFavoritesSection();

function closeFavoriteSection() {
    const closeButton = document.getElementById('circle-decoration');
    closeButton.addEventListener('click', () => {
        const favoriteSection = document.getElementById('favorites-section');
        favoriteSection.style.display = 'none';
        const favoriteSectionButton = document.getElementById('favorite-section-button');
        favoriteSectionButton.style.display = 'block';
    });
}
