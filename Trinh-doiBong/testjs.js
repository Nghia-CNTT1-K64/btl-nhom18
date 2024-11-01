// Lắng nghe sự kiện khi nhập vào ô tìm kiếm
document.getElementById("globalSearchPlayer").addEventListener("input", function() {
    const query = this.value.toLowerCase(); // Lấy giá trị người dùng nhập và chuyển sang chữ thường
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Xóa các kết quả cũ

    if (query) {
        // Dữ liệu kết quả tìm kiếm mẫu (thay thế bằng dữ liệu thực tế của bạn nếu có)
        const sampleResults = ["Cầu thủ 1", "Cầu thủ 2", "dũng"]; // Thay thế với dữ liệu thật nếu có
        const filteredResults = sampleResults.filter(name => name.toLowerCase().includes(query));

        // Tạo và thêm các kết quả tìm kiếm vào container
        filteredResults.forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.className = "player-result"; // Đặt class để CSS có thể áp dụng
            resultItem.textContent = result; // Hiển thị tên cầu thủ

            // Tùy chọn: Thêm sự kiện khi nhấp vào kết quả
            resultItem.addEventListener("click", function() {
                alert(`Bạn đã chọn: ${result}`); // Thay đổi theo hành động bạn muốn
            });

            resultsContainer.appendChild(resultItem);
        });

        resultsContainer.style.display = "block"; // Hiển thị kết quả tìm kiếm
    } else {
        resultsContainer.style.display = "none"; // Ẩn khi không có kết quả
    }
});
