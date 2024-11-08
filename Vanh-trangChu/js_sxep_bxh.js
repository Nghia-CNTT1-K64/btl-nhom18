
        document.addEventListener("DOMContentLoaded", function () {
            let table = document.querySelector(".tbody.ct-bxh");
            let sortDirection = false;
            let sortIcon = document.getElementById("sort-icon");

            
            function sortTableByPoints() {
                let rows = Array.from(table.querySelectorAll("tr"));
                
                rows.sort((a, b) => {
                    let pointA = parseInt(a.cells[4].textContent);
                    let pointB = parseInt(b.cells[4].textContent);

                    if (sortDirection) {
                        return pointA - pointB; 
                    } else {
                        return pointB - pointA; 
                    }
                });

                rows.forEach((row, index) => {
                    
                    row.cells[0].textContent = index + 1;
                    table.appendChild(row); 
                });

                sortDirection = !sortDirection;

                if (sortDirection) {
                    sortIcon.textContent = '▼'; 
                } else {
                    sortIcon.textContent = '▲'; 
                }
            }

            document.getElementById("sort-diem").addEventListener("click", sortTableByPoints);
        });
