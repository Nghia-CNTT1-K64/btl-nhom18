document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contentSections = document.querySelectorAll('.content-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content sections
            tabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
});
// Lắng nghe sự kiện click trên tất cả các thẻ <a>
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