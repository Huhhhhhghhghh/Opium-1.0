document.addEventListener('DOMContentLoaded', function() {
    ver();
});

function ver() {
    const addgms = new Map();
    let clicks = new Map();
    let trendingGames = JSON.parse(localStorage.getItem('trending')) || [];

    fetch('/json/g.json')
        .then(response => response.json())
        .then(data => {
            const gameContainer = document.getElementById('game-container');
            const trendingContainer = document.getElementById('trending');

            data.forEach(game => {
                if (game.tags && game.tags.length > 0) {
                    game.tags.forEach(tag => {
                        const categoryDiv = document.querySelector(`#${tag}`);
                        if (categoryDiv) {
                            if (!addgms.has(tag) || !addgms.get(tag).has(game.title)) {
                                const gameButton = document.createElement('div');
                                gameButton.classList.add('game-btn');
                                gameButton.innerHTML = `
                                    <a href="${game.directory}" class="game-button">
                                        <p class="game-title">${game.title}</p>
                                        <img class="game-img" src="${game.img}" alt="${game.title}">
                                        <div class="underline"></div>
                                    </a>
                                `;
                                gameContainer.appendChild(gameButton);
                                categoryDiv.appendChild(gameButton);

                                gameButton.addEventListener('click', () => {
                                    const title = game.title;
                                    if (!clicks.has(title)) {
                                        clicks.set(title, 1);
                                    } else {
                                        clicks.set(title, clicks.get(title) + 1);
                                    }
                                    updateTrending(gameButton);
                                });

                                if (!addgms.has(tag)) {
                                    addgms.set(tag, new Set());
                                }
                                addgms.get(tag).add(game.title);
                            }
                        }
                    });
                }
            });

            function updateTrending(clickedButton) {
                const trendingContainer = document.getElementById('trending');
                let maxClicks = 0;
                let maxClicksTitle = null;

                clicks.forEach((clickCount, gameTitle) => {
                    if (clickCount > maxClicks) {
                        maxClicks = clickCount;
                        maxClicksTitle = gameTitle;
                    }
                });

                if (maxClicksTitle) {
                    const gameButtons = document.querySelectorAll('.game-btn');
                    gameButtons.forEach(button => {
                        if (button.querySelector('.game-title').textContent === maxClicksTitle) {
                            const trendingButton = button.cloneNode(true);
                            trendingContainer.innerHTML = '';
                            trendingContainer.appendChild(trendingButton);

                            if (!trendingGames.includes(maxClicksTitle)) {
                                trendingGames.unshift(maxClicksTitle);
                                localStorage.setItem('trending', JSON.stringify(trendingGames));
                            }
                        }
                    });
                }

                if (clickedButton && trendingGames.length > 0) {
                    const leastClickedTitle = trendingGames.pop();
                    localStorage.setItem('trending', JSON.stringify(trendingGames));

                    gameButtons.forEach(button => {
                        if (button.querySelector('.game-title').textContent === leastClickedTitle) {
                            trendingContainer.removeChild(button);
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('404:', error);
        });
}
