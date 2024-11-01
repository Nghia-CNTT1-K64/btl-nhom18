// Lấy button 
const scrollToTopBtn = document.getElementById("scrollToTop");

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

document.addEventListener('click', function(event) {
    const target = event.target;

    // Kiểm tra xem thẻ được click có phải là thẻ <a> không
    if (target.tagName === 'A') {
        // Kiểm tra nếu href rỗng hoặc là "#"
        if (!target.getAttribute('href') || target.getAttribute('href') === '#') {
            event.preventDefault(); // Ngăn chặn hành động mặc định
            alert('Chưa cập nhật'); // Hiển thị thông báo
        }
    }
});