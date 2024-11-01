
document.getElementById('globalSearchPlayer').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const players = document.querySelectorAll('.player-card');
    const resultContainer = document.getElementById('searchResults');

    resultContainer.innerHTML = '';  // Xóa kết quả cũ

    if (searchValue === '') {
        resultContainer.style.display = 'none'; // Ẩn kết quả nếu thanh tìm kiếm trống
        return;
    }

    resultContainer.style.display = 'block';  // Hiển thị kết quả khi có nội dung tìm kiếm

    players.forEach(player => {
        const playerName = player.getAttribute('data-name').toLowerCase();
        const playerLink = player.getAttribute('data-link'); // Lấy link của cầu thủ
        const playerImg = player.getAttribute('data-img');   // Lấy link hình ảnh cầu thủ

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

// Lấy button 
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Hiện button khi cuộn xuống 100px
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Xử lý sự kiện click
scrollToTopBtn.addEventListener("click", function () {
    // Cuộn mượt lên đầu trang
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});