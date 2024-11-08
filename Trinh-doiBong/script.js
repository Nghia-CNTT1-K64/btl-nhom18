
document.getElementById('globalSearchPlayer').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const players = document.querySelectorAll('.player-card');
    const resultContainer = document.getElementById('searchResults');

    resultContainer.innerHTML = ''; 

    if (searchValue === '') {
        resultContainer.style.display = 'none'; 
        return;
    }

    resultContainer.style.display = 'block';  

    players.forEach(player => {
        const playerName = player.getAttribute('data-name').toLowerCase();
        const playerLink = player.getAttribute('data-link'); 
        const playerImg = player.getAttribute('data-img');   

        if (playerName.includes(searchValue)) {
            const playerInfo = `
            <div class="player-result">
                <img src="${playerImg}" alt="${playerName}" class="player-image">
                <div class="player-details">
                    <p><a href="${playerLink}" target="_blank">${playerName.toUpperCase()}</a></p>
                </div>
            </div>
        `;
        
            resultContainer.innerHTML += playerInfo;
        }
    });
});
