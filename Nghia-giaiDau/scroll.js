
// Hiển thị nút khi người dùng cuộn xuống 20px từ đầu trang
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; // Hiển thị nút
    } else {
        scrollToTopBtn.style.display = "none"; // Ẩn nút
    }
}

// Hàm để cuộn lên đầu trang khi người dùng nhấp vào nút
function scrollToTop() {
    document.body.scrollTop = 0; // Cho Safari
    document.documentElement.scrollTop = 0; // Cho Chrome, Firefox, IE và Opera
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Cuộn mượt
    });
}
