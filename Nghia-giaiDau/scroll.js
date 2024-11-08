
// Hiển thị nút khi người dùng cuộn xuống 20px từ đầu trang
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none"; 
    }
}

// Hàm để cuộn lên đầu trang khi người dùng nhấp vào nút
function scrollToTop() {
    document.body.scrollTop = 0; //sfr
    document.documentElement.scrollTop = 0; 
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
}
