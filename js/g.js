document.addEventListener('DOMContentLoaded', function() {
    ver();
});

function ver() {
    fetch('/json/g.json')
    .then(response => response.json())
    .then(data => {
        const gameContainer = document.getElementById('game-container');
        const addedGames = new Set();
        data.forEach(game => {
            if (game.tags && game.tags.length > 0) {
                game.tags.forEach(tag => {
                    const categoryDiv = document.querySelector(`#${tag}`);
                    if (categoryDiv && !addedGames.has(game.title)) {
                        const gameButton = document.createElement('div');
                        gameButton.classList.add('game-btn');
                        gameButton.innerHTML = `
                            <a href="${game.directory}" class="game-button">
                                <img class="game-img" src="${game.img}" alt="${game.title}">
                                <div class="underline"></div>
                            </a>
                        `;
                        gameContainer.appendChild(gameButton);
                        categoryDiv.appendChild(gameButton);
                        addedGames.add(game.title);
                    }
                });
            }
        });
    })
    .catch(error => {
        console.error('404:', error);
    });
}
