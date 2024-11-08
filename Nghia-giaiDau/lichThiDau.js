// Hàm để hiển thị/ẩn các trận đấu dựa trên tháng được chọn
function filterByMonth(selectedMonth) {
    // Xóa class active từ tất cả các link tháng
    document.querySelectorAll('.month-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Thêm class active vào tháng được chọn
    event.target.classList.add('active');

    // Lấy tất cả các vòng đấu
    const vongDaus = document.querySelectorAll('.vong-dau');
    
    vongDaus.forEach(vongDau => {
        if (selectedMonth === 'all') {
            vongDau.style.display = 'block';
        } else if (selectedMonth === 'latest') {
            
            const vongs = Array.from(vongDaus);
            vongs.forEach(v => v.style.display = 'none');
            vongs[vongs.length - 1].style.display = 'block';
        } else {

            const dateText = vongDau.querySelector('p').textContent;
            const month = dateText.match(/Tháng (\d+)/)[1];
            vongDau.style.display = (month === selectedMonth) ? 'block' : 'none';
        }
    });
}

// Hàm để lọc trận đấu theo đội bóng và vòng đấu
function filterMatches() {
    const selectedClub = document.getElementById('clubs').value;
    const selectedRound = document.getElementById('rounds').value;
    
    const vongDaus = document.querySelectorAll('.vong-dau');
    
    vongDaus.forEach(vongDau => {
        const roundNumber = vongDau.querySelector('h1').textContent.match(/\d+/)[0];
        const tables = vongDau.querySelectorAll('.match-table');
        let hasVisibleMatch = false;
        
        tables.forEach(table => {
            const allTbodies = table.querySelectorAll('tbody');
            let hasVisibleMatchInTable = false;
            
            allTbodies.forEach(tbody => {
                const clubs = tbody.getAttribute('data-club').split(',');
                let showMatch = true;
                
                if (selectedClub !== 'all' && !clubs.includes(selectedClub)) {
                    showMatch = false;
                }
                
                if (selectedRound !== 'all' && roundNumber !== selectedRound) {
                    showMatch = false;
                }
        
                tbody.style.display = showMatch ? 'table-row-group' : 'none';
                
                if (showMatch) {
                    hasVisibleMatchInTable = true;
                    hasVisibleMatch = true;
                }
            });
        
            const tableHeader = table.querySelector('h3');
            const tableDate = table.querySelector('p');
            const tableThead = table.querySelector('thead');
            
            if (tableHeader) tableHeader.style.display = hasVisibleMatchInTable ? 'block' : 'none';
            if (tableDate) tableDate.style.display = hasVisibleMatchInTable ? 'block' : 'none';
            if (tableThead) tableThead.style.display = hasVisibleMatchInTable ? 'table-header-group' : 'none';
            table.style.display = hasVisibleMatchInTable ? 'table' : 'none';
        });
        
        vongDau.style.display = hasVisibleMatch ? 'block' : 'none';
    });
}

// Thêm event listener cho các link tháng
document.addEventListener('DOMContentLoaded', function() {
    const monthLinks = document.querySelectorAll('.month-link');
    
    monthLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let month = 'all';
            
            if (this.textContent === 'Mới nhất') {
                month = 'latest';
            } else if (this.textContent === 'Tất cả') {
                month = 'all';
            } else {
                
                month = this.textContent.match(/\d+/)[0];
            }
            
            filterByMonth(month);
        });
    });

    
    const searchButton = document.querySelector('button');
    searchButton.addEventListener('click', function() {
        this.classList.add('loading');
        setTimeout(() => {
            filterMatches();
            this.classList.remove('loading');
        }, 300);
    });
});


function resetFilters() {
    document.getElementById('clubs').value = 'all';
    document.getElementById('rounds').value = 'all';
    document.querySelectorAll('.month-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.month-link:last-child').classList.add('active');
    
    const vongDaus = document.querySelectorAll('.vong-dau');
    vongDaus.forEach(vongDau => {
        vongDau.style.display = 'block';
    });
}

