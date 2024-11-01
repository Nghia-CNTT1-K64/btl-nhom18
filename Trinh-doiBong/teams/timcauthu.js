// JavaScript Tìm kiếm Cầu thủ
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("playerSearch");
    const playerCards = document.querySelectorAll(".player-card");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        playerCards.forEach(playerCard => {
            const playerName = playerCard.querySelector("h3").textContent.toLowerCase();
            if (playerName.includes(searchTerm)) {
                playerCard.style.display = "block";
            } else {
                playerCard.style.display = "none";
            }
        });
    });
});
// Lấy button 
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Hiện button khi cuộn xuống 100px
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Xử lý sự kiện click
scrollToTopBtn.addEventListener("click", function() {
    // Cuộn mượt lên đầu trang
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});