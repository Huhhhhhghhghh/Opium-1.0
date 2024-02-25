document.addEventListener('DOMContentLoaded', function() {
    ver();
});

function ver() {
    fetch('/json/g.json')
    .then(response => response.json())
    .then(data => {
       data.forEach(game => {
            if (game.tags && game.tags.length > 0) {
                game.tags.forEach(tag => {
                    const categoryDiv = document.querySelector(`#${tag}`);
                    if (categoryDiv) {
                        if (game.tags.includes(tag)) {
                            const gameButton = document.createElement('div');
                            gameButton.id = 'game-btn';
                            gameButton.innerHTML = `
                                <a href="${game.directory}" class="game-button">
                                    <img style="width: 100%; height: 100%; object-fit: cover;" src="${game.img}" alt="${game.title}">
                                    <div class="underline"></div>
                                </a>
                            `;
                            categoryDiv.appendChild(gameButton);
                            const gameContainer = document.getElementById('game-container');
                            if (gameContainer) {
                                gameContainer.appendChild(gameButton.cloneNode(true));
                            }
                        }
                    }
                });
            }
        });
    })
    .catch(error => {
        console.error('404:', error);
    });
}
