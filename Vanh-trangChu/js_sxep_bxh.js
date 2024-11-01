
        document.addEventListener("DOMContentLoaded", function () {
            let table = document.querySelector(".tbody.ct-bxh");
            let sortDirection = false;
            let sortIcon = document.getElementById("sort-icon");

            // Hàm sắp xếp bảng dựa trên cột Điểm
            function sortTableByPoints() {
                let rows = Array.from(table.querySelectorAll("tr"));

                // Sắp xếp các hàng theo cột Điểm
                rows.sort((a, b) => {
                    let pointA = parseInt(a.cells[4].textContent);
                    let pointB = parseInt(b.cells[4].textContent);

                    // Sắp xếp theo chiều tăng dần hoặc giảm dần
                    if (sortDirection) {
                        return pointA - pointB; // Tăng dần
                    } else {
                        return pointB - pointA; // Giảm dần
                    }
                });

                // Cập nhật lại thứ tự "VT" sau khi sắp xếp
                rows.forEach((row, index) => {
                    // Sau khi sắp xếp, cập nhật lại số thứ tự "VT"
                    row.cells[0].textContent = index + 1;
                    table.appendChild(row); // Cập nhật lại bảng
                });

                sortDirection = !sortDirection; // Đổi hướng sắp xếp cho lần click tiếp theo

                // Cập nhật mũi tên
                if (sortDirection) {
                    sortIcon.textContent = '▼'; // Mũi tên hướng lên (tăng dần)
                } else {
                    sortIcon.textContent = '▲'; // Mũi tên hướng xuống (giảm dần)'▲'
                }
            }

            // Thêm sự kiện click vào tiêu đề cột "Điểm"
            document.getElementById("sort-diem").addEventListener("click", sortTableByPoints);
        });
