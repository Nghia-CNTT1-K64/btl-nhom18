// Lấy tất cả các nút có id là "showTableButton"
const toggleButtons = document.querySelectorAll('#showTableButton');

// Lấy phần tử có id là "tableContainer"
const tableContainer = document.getElementById('tableContainer');

// Hàm để cập nhật thông tin đội
function updateTeamInfo(button) {
    const teamName = button.dataset.team;
    const teamLogo = button.dataset.logo;
    const latestResult = button.dataset.latestResult.split(',');
    const nextFixture = button.dataset.nextFixture.split(',');
    const positionData = button.dataset.positionData.split(',');

    // Cập nhật tên đội và logo
    const teamInfo = document.querySelector('#tableContainer .team-info');
    teamInfo.querySelector('h1').textContent = teamName;
    teamInfo.querySelector('.logo').src = teamLogo;

    // Cập nhật kết quả gần đây nhất
    const latestResultElem = document.querySelector('#tableContainer .latest-result');
    latestResultElem.querySelector('p').textContent = `Latest Result: ${latestResult[0]}`;
    latestResultElem.querySelector('.match .team-logo:first-child').src = latestResult[1];
    latestResultElem.querySelector('.match .score').textContent = `${latestResult[2]} - ${latestResult[3]}`;
    latestResultElem.querySelector('.match .team-logo:last-child').src = latestResult[4];

    // Cập nhật trận đấu sắp tới
    const nextFixtureElem = document.querySelector('#tableContainer .latest-result-2');
    nextFixtureElem.querySelector('p').textContent = `Latest Fixture: ${nextFixture[0]}`;
    nextFixtureElem.querySelector('.fixture .team-logo:first-child').src = nextFixture[1];
    nextFixtureElem.querySelector('.fixture .time').textContent = nextFixture[2];
    nextFixtureElem.querySelector('.fixture .team-logo:last-child').src = nextFixture[3];

    // Cập nhật biểu đồ vị trí
    const svg = document.querySelector('#tableContainer svg');
    const polyline = svg.querySelector('polyline');
    polyline.setAttribute('points', positionData.map((pos, index) => `${50 + index * 100},${50 + (pos - 1) * 50}`).join(' '));

    // Cập nhật các điểm dữ liệu trên biểu đồ
    const circles = svg.querySelectorAll('circle');
    circles.forEach((circle, index) => {
        circle.setAttribute('cy', 50 + (positionData[index] - 1) * 50);
    });
}
// Thêm style cho transition màu sắc
const style = document.createElement('style');
style.textContent = `
    #showTableButton {
        transition: all 0.3s ease;
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        padding: 8px 16px;
        cursor: pointer;
    }
    
    #showTableButton.active {
        background-color: #4CAF50;
        color: white;
        border-color: #45a049;
    }
    
    #showTableButton:hover {
        background-color: #e0e0e0;
    }
    
    #showTableButton.active:hover {
        background-color: #45a049;
    }
`;
document.head.appendChild(style);

// Thêm sự kiện click cho mỗi nút với hiệu ứng màu
toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Reset màu của tất cả các nút
        toggleButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Toggle hiển thị của tableContainer
        if (tableContainer.style.display === 'none' || tableContainer.style.display === '') {
            tableContainer.style.display = 'block';
            this.classList.add('active'); // Thêm class active khi hiển thị bảng
        } else {
            tableContainer.style.display = 'none';
            this.classList.remove('active'); // Xóa class active khi ẩn bảng
        }
        
        // Cập nhật thông tin đội
        updateTeamInfo(this);
        
        // Thay đổi biểu tượng mũi tên
        this.innerHTML = tableContainer.style.display === 'none' ? '&#9660;' : '&#9650;';
    });
});

//Hàm sắp xếp
let sortDirection = Array(10).fill(true);

    // Hàm sắp xếp bảng theo cột được chọn
    function sortTable(colIndex) {
        const table = document.querySelector(".table-section");
        const headers = table.getElementsByTagName("th");
        const body = table.getElementsByTagName("tbody")[0];
        const rows = Array.from(body.getElementsByTagName("tr"));
        
        // Xóa class sắp xếp cũ của tất cả tiêu đề
        Array.from(headers).forEach(header => {
            header.classList.remove('asc', 'desc');
        });
        
        // Thêm class chỉ thị hướng sắp xếp mới
        headers[colIndex].classList.add(sortDirection[colIndex] ? 'asc' : 'desc');

        // Hàm so sánh để sắp xếp
        const compareFn = (a, b) => {
            // Lấy giá trị từ ô cần so sánh
            let aVal = a.getElementsByTagName("td")[colIndex].textContent.trim();
            let bVal = b.getElementsByTagName("td")[colIndex].textContent.trim();
            
            // Xử lý riêng cho cột tên câu lạc bộ
            if (colIndex === 1) {
                return sortDirection[colIndex] ? 
                    aVal.localeCompare(bVal) : // Sắp xếp tăng dần
                    bVal.localeCompare(aVal);  // Sắp xếp giảm dần
            }
            
            // Chuyển đổi sang số cho các cột số
            aVal = Number(aVal) || aVal;
            bVal = Number(bVal) || bVal;
            
            // So sánh và trả về kết quả
            if (sortDirection[colIndex]) {
                return aVal > bVal ? 1 : -1; // Sắp xếp tăng dần
            } else {
                return aVal < bVal ? 1 : -1; // Sắp xếp giảm dần
            }
        };

        // Thực hiện sắp xếp các hàng
        rows.sort(compareFn);
        
        // Cập nhật lại nội dung bảng
        body.innerHTML = '';
        rows.forEach(row => body.appendChild(row));
        // Đảo ngược hướng sắp xếp cho lần nhấp tiếp theo
        sortDirection[colIndex] = !sortDirection[colIndex];
    }
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
