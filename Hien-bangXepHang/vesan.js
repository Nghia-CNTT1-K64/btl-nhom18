const stadiumMap = document.getElementById('stadiumMap');
const selectedSeatsInput = document.getElementById('selectedSeats');
const bookingForm = document.getElementById('bookingForm');
const bookingsList = document.getElementById('bookings');
let selectedSeats = [];
let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || {};
// SUA O DAY





function createStadiumMap() {
    clearStadiumMap();

    // Khán đài A (Trên)
    addStandLabel('Khán đài A');
    for (let row = 1; row <= 3; row++) { // Tạo 3 hàng cho khán đài A
        for (let i = 1; i <= 10; i++) { // Mỗi hàng có 10 ghế
            const seatNum = (row - 1) * 10 + i; // Tính số ghế dựa trên 10 ghế mỗi hàng
            addSeat('A', seatNum);
        }
    }

    // Thêm đường kẻ ngang sau khán đài A
    addFullWidthDivider();

    // Khán đài B
    addStandLabel('Khán đài B');
    for (let row = 1; row <= 2; row++) { // Tạo 3 hàng cho khán đài B
        for (let i = 1; i <= 10; i++) { // Mỗi hàng có 10 ghế
            const seatNum = (row - 1) * 10 + i;
            addSeat('B', seatNum);
        }
    }

    // Thêm đường kẻ ngang sau khán đài B
    addFullWidthDivider();

    // Khán đài C
    addStandLabel('Khán đài C');
    for (let row = 1; row <= 3; row++) { // Tạo 3 hàng cho khán đài C
        for (let i = 1; i <= 10; i++) { // Mỗi hàng có 10 ghế
            const seatNum = (row - 1) * 10 + i;
            addSeat('C', seatNum);
        }
    }

    // Thêm đường kẻ ngang sau khán đài C
    addFullWidthDivider();

    // Khán đài D (Dưới)
    addStandLabel('Khán đài D');
    for (let row = 1; row <= 2; row++) { // Tạo 4 hàng cho khán đài D
        for (let i = 1; i <= 10; i++) { // Mỗi hàng có 10 ghế
            const seatNum = (row - 1) * 10 + i;
            addSeat('D', seatNum);
        }
    }
}

function addFullWidthDivider() {
    const divider = document.createElement('div');
    divider.classList.add('full-width-divider');
    document.querySelector('.stadium-map').appendChild(divider);
}







function clearStadiumMap() {
    while (stadiumMap.firstChild) {
        stadiumMap.removeChild(stadiumMap.firstChild);
    }
}

function addSeat(stand, number) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = `${stand}${number}`;
    
    const seatId = `${stand}${number}`;
    if (bookedSeats[seatId]) {
        seat.classList.add('unavailable');
    } else {
        seat.classList.add('available');
        seat.addEventListener('click', () => toggleSeat(seat, seatId));
    }
    
    stadiumMap.appendChild(seat);
}

function addEmptyCell() {
    const emptyCell = document.createElement('div');
    stadiumMap.appendChild(emptyCell);
}

function addField() {
    const field = document.createElement('div');
    field.className = 'field';
    field.innerHTML = `
        <div class="pitch-lines">
            <div class="center-circle"></div>
            <div class="center-line"></div>
            <div class="penalty-area left"></div>
            <div class="penalty-area right"></div>
        </div>
    `;
    stadiumMap.appendChild(field);
}

function addStandLabel(label) {
    const standLabel = document.createElement('div');
    standLabel.className = 'stand-label';
    standLabel.textContent = label;
    stadiumMap.appendChild(standLabel);
}

function toggleSeat(seatElement, seatNumber) {
    if (seatElement.classList.contains('selected')) {
        seatElement.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
        seatElement.classList.add('selected');
        selectedSeats.push(seatNumber);
    }
    selectedSeatsInput.value = selectedSeats.join(',');
}

function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    booking.seats.forEach(seat => {
        bookedSeats[seat] = true;
    });
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));

    displayBookings();
    createStadiumMap();
}

function displayBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookingsList.innerHTML = '';
    bookings.forEach((booking, index) => {
        const li = document.createElement('li');
        li.textContent = `Đặt vé ${index + 1}: ${booking.name} - ${booking.match} - Ghế: ${booking.seats.join(', ')}`;
        bookingsList.appendChild(li);
    });
}

// Thêm CSS cho sân bóng
const fieldStyle = document.createElement('style');
fieldStyle.textContent = `
.field .pitch-lines {
    width: 100%;
    height: 100%;
    position: relative;
    border: 2px solid white;
}

.center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-radius: 50%;
}

.center-line {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 2px;
    background-color: white;
}

.penalty-area {
    position: absolute;
    width: 30%;
    height: 60%;
    border: 2px solid white;
    top: 50%;
    transform: translateY(-50%);
}

.penalty-area.left {
    left: 0;
}

.penalty-area.right {
    right: 0;
}
`;

document.head.appendChild(fieldStyle);

createStadiumMap();
displayBookings();

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
        alert('Vui lòng chọn ít nhất một chỗ ngồi.');
    } else {
        const booking = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            match: document.getElementById('match').value,
            seats: selectedSeats
        };
        saveBooking(booking);
        alert(`Bạn đã đặt vé thành công cho ghế: ${selectedSeats.join(', ')}. Cảm ơn bạn!`);
        bookingForm.reset();
        selectedSeats = [];
        selectedSeatsInput.value = '';
    }
});