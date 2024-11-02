
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