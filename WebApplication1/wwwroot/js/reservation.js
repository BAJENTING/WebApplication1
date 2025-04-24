// Store events data
let reservations = [

];

// Current date
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Initialize the calendar
document.addEventListener('DOMContentLoaded', function () {
    renderCalendar(currentMonth, currentYear);

    // Set min date for the date picker to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').setAttribute('min', today);
});

function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 = Sunday

    // Update month display
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

    // Clear previous calendar days
    const calendarDaysContainer = document.querySelector('.calendar-grid');
    // Keep the day headers (first 7 items) and remove the rest
    while (calendarDaysContainer.children.length > 7) {
        calendarDaysContainer.removeChild(calendarDaysContainer.lastChild);
    }

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day inactive-day';
        calendarDaysContainer.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';

        // Check if this is today
        const currentDateObj = new Date();
        if (day === currentDateObj.getDate() && month === currentDateObj.getMonth() && year === currentDateObj.getFullYear()) {
            dayCell.classList.add('today');
        }

        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        // Add events for this day
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = reservations.filter(event => event.date === dateStr);

        for (const event of dayEvents) {
            const eventIndicator = document.createElement('div');
            eventIndicator.className = 'event-indicator';
            eventIndicator.textContent = `${event.facility}: ${event.eventName}`;
            dayCell.appendChild(eventIndicator);
        }

        // Add click event to select date
        dayCell.addEventListener('click', function () {
            const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            document.getElementById('eventDate').value = selectedDate;
            // If a facility has been selected, scroll to the form
            if (document.getElementById('facilityName').textContent) {
                document.getElementById('reservationForm').scrollIntoView({ behavior: 'smooth' });
            }
        });

        calendarDaysContainer.appendChild(dayCell);
    }

    // Add empty cells for days after the last day of month if needed
    const totalDays = startDay + daysInMonth;
    const remainingCells = 7 - (totalDays % 7);
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day inactive-day';
            calendarDaysContainer.appendChild(emptyDay);
        }
    }
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

function showReservationForm(facilityName) {
    document.getElementById('facilityName').textContent = facilityName;
    document.getElementById('reservationForm').style.display = 'block';
    document.getElementById('reservationForm').scrollIntoView({ behavior: 'smooth' });

    // Reset form fields
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('attendees').value = '';
    document.getElementById('description').value = '';

    // Hide any previous messages
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

function cancelReservation() {
    document.getElementById('reservationForm').style.display = 'none';
    document.getElementById('facilityGrid').scrollIntoView({ behavior: 'smooth' });
}

function submitReservation() {
    // Get form values
    const facilityName = document.getElementById('facilityName').textContent;
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const attendees = document.getElementById('attendees').value;

    // Validate form
    if (!eventName || !eventDate || !startTime || !endTime || !attendees) {
        document.getElementById('errorMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMessage').style.display = 'none';
        }, 3000);
        return;
    }

    // Check for conflicts
    const conflicts = reservations.filter(r =>
        r.facility === facilityName &&
        r.date === eventDate &&
        ((r.startTime <= startTime && r.endTime > startTime) ||
            (r.startTime < endTime && r.endTime >= endTime) ||
            (startTime <= r.startTime && endTime > r.startTime))
    );

    if (conflicts.length > 0) {
        document.getElementById('errorMessage').textContent = 'Time slot already reserved. Please choose another time.';
        document.getElementById('errorMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('errorMessage').textContent = 'Please fill out all required fields.';
        }, 3000);
        return;
    }

    // Add new reservation
    const newReservation = {
        facility: facilityName,
        eventName: eventName,
        date: eventDate,
        startTime: startTime,
        endTime: endTime,
        attendees: attendees,
        description: document.getElementById('description').value
    };

    reservations.push(newReservation);

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Hide form and reset values
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('reservationForm').style.display = 'none';

        // Refresh calendar to show new reservation
        renderCalendar(currentMonth, currentYear);

        // Scroll back to facilities grid
        document.getElementById('facilityGrid').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

function showAllFacilities() {
    document.getElementById('reservationForm').style.display = 'none';
    document.getElementById('facilityGrid').scrollIntoView({ behavior: 'smooth' });
}

function goBack() {
    // In a real application, this would take you back to the dashboard
    // For this demo, we'll just show a message
    alert('In a real application, this would navigate back to the dashboard page.');
}
// Function to save reservations to localStorage so they persist across sessions
function saveReservationsToStorage() {
    localStorage.setItem('userReservations', JSON.stringify(reservations));
}

// Function to load reservations from localStorage
function loadReservationsFromStorage() {
    const storedReservations = localStorage.getItem('userReservations');
    if (storedReservations) {
        reservations = JSON.parse(storedReservations);
    }
}

// Modify your existing submitReservation function to save to localStorage
function submitReservation() {
    // Get form values
    const facilityName = document.getElementById('facilityName').textContent;
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const attendees = document.getElementById('attendees').value;

    // Validate form
    if (!eventName || !eventDate || !startTime || !endTime || !attendees) {
        document.getElementById('errorMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMessage').style.display = 'none';
        }, 3000);
        return;
    }

    // Check for conflicts
    const conflicts = reservations.filter(r =>
        r.facility === facilityName &&
        r.date === eventDate &&
        ((r.startTime <= startTime && r.endTime > startTime) ||
            (r.startTime < endTime && r.endTime >= endTime) ||
            (startTime <= r.startTime && endTime > r.startTime))
    );

    if (conflicts.length > 0) {
        document.getElementById('errorMessage').textContent = 'Time slot already reserved. Please choose another time.';
        document.getElementById('errorMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('errorMessage').textContent = 'Please fill out all required fields.';
        }, 3000);
        return;
    }

    // Format date for display
    const dateObj = new Date(eventDate);
    const formattedDate = `${dateObj.toLocaleDateString('en-US', { month: 'short' })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    // Add new reservation with a status and formatted date for display
    const newReservation = {
        id: Date.now(), // Simple unique ID
        facility: facilityName,
        eventName: eventName,
        date: eventDate, // Original date format for filtering
        displayDate: formattedDate, // Formatted date for display
        startTime: startTime,
        endTime: endTime,
        attendees: attendees,
        description: document.getElementById('description').value,
        status: 'Upcoming'
    };

    reservations.push(newReservation);

    // Save to localStorage
    saveReservationsToStorage();

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Hide form and reset values
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('reservationForm').style.display = 'none';

        // Refresh calendar to show new reservation
        renderCalendar(currentMonth, currentYear);

        // Scroll back to facilities grid
        document.getElementById('facilityGrid').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Function to get time difference between now and reservation date
function getTimeDifference(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);

    const reservationDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    return reservationDate - now;
}

// Function to update reservation statuses
function updateReservationStatuses() {
    const now = new Date();

    reservations.forEach(reservation => {
        const reservationDateTime = new Date(`${reservation.date}T${reservation.endTime}`);

        if (reservationDateTime < now) {
            reservation.status = 'Completed';
        } else {
            reservation.status = 'Upcoming';
        }
    });

    saveReservationsToStorage();
}

// Modify your goBack function to actually navigate to the dashboard
function goBack() {
    // In a real application with server-side routing, you would redirect to the dashboard page
    // For client-side only, we'll show the dashboard in the current view
    window.location.href = "/Home";

    // If you're not using routing and want to simulate navigation, comment out the above and uncomment:
    // showDashboard();
}

// Add this to your initialization code
document.addEventListener('DOMContentLoaded', function () {
    // Load existing reservations
    loadReservationsFromStorage();

    // Update statuses of reservations
    updateReservationStatuses();

    // Render calendar
    renderCalendar(currentMonth, currentYear);

    // Set min date for the date picker to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').setAttribute('min', today);
});

// Use this function to check if we're on the dashboard page
function isDashboardPage() {
    return window.location.pathname.includes('/dashboard');
}

// Function to render the user's reservations in the dashboard
function renderDashboardReservations() {
    // Only execute if we're on the dashboard page
    if (!isDashboardPage()) return;

    const reservationsList = document.getElementById('dashboard-reservations');
    if (!reservationsList) return;

    // Clear existing reservations
    reservationsList.innerHTML = '';

    // Update reservation statuses before rendering
    updateReservationStatuses();

    // Sort reservations by date (upcoming first)
    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA - dateB;
    });

    // Group by status (Upcoming first)
    const upcomingReservations = sortedReservations.filter(r => r.status === 'Upcoming');
    const completedReservations = sortedReservations.filter(r => r.status === 'Completed');

    // Render upcoming reservations first
    upcomingReservations.forEach(reservation => {
        const reservationItem = createReservationElement(reservation);
        reservationsList.appendChild(reservationItem);
    });

    // Then render completed reservations
    completedReservations.forEach(reservation => {
        const reservationItem = createReservationElement(reservation);
        reservationsList.appendChild(reservationItem);
    });

    // If no reservations, show a message
    if (reservations.length === 0) {
        const noReservations = document.createElement('div');
        noReservations.className = 'no-reservations';
        noReservations.textContent = 'No reservations found.';
        reservationsList.appendChild(noReservations);
    }
}

// Helper function to create a reservation element
function createReservationElement(reservation) {
    const reservationItem = document.createElement('div');
    reservationItem.className = 'reservation-item';

    const statusClass = reservation.status.toLowerCase();

    reservationItem.innerHTML = `
                <div class="facility-name">${reservation.facility}</div>
                <div class="reservation-details">
                    ${reservation.displayDate} • ${reservation.startTime} - ${reservation.endTime}
                </div>
                <div class="reservation-status">
                    <span class="status-badge ${statusClass}">${reservation.status}</span>
                </div>
            `;

    return reservationItem;
}

// Call this function when the dashboard page loads
function initializeDashboard() {
    if (isDashboardPage()) {
        loadReservationsFromStorage();
        updateReservationStatuses();
        renderDashboardReservations();
    }
}

// Add this to your window.onload or similar initialization
window.addEventListener('load', function () {
    initializeDashboard();
});
function saveReservationsToStorage() {
    localStorage.setItem('userReservations', JSON.stringify(reservations));
}

// Function to load reservations from localStorage
function loadReservationsFromStorage() {
    const storedReservations = localStorage.getItem('userReservations');
    if (storedReservations) {
        reservations = JSON.parse(storedReservations);
    }
}

// Function to get time difference between now and reservation date
function getTimeDifference(dateStr, timeStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);

    const reservationDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    return reservationDate - now;
}

// Function to update reservation statuses
function updateReservationStatuses() {
    const now = new Date();

    reservations.forEach(reservation => {
        const reservationDateTime = new Date(`${reservation.date}T${reservation.endTime}`);

        if (reservationDateTime < now) {
            reservation.status = 'Completed';
        } else {
            reservation.status = 'Upcoming';
        }
    });

    saveReservationsToStorage();
}

// Function to render the user's reservations in the dashboard
function renderDashboardReservations() {
    // Check if we're on the dashboard page by looking for the dashboard-reservations element
    const reservationsList = document.getElementById('dashboard-reservations');
    if (!reservationsList) return;

    // Clear existing reservations
    reservationsList.innerHTML = '';

    // Update reservation statuses before rendering
    updateReservationStatuses();

    // Sort reservations by date (upcoming first)
    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA - dateB;
    });

    // Group by status (Upcoming first)
    const upcomingReservations = sortedReservations.filter(r => r.status === 'Upcoming');
    const completedReservations = sortedReservations.filter(r => r.status === 'Completed');

    // Render upcoming reservations first
    upcomingReservations.forEach(reservation => {
        const reservationItem = createReservationElement(reservation);
        reservationsList.appendChild(reservationItem);
    });

    // Then render completed reservations
    completedReservations.forEach(reservation => {
        const reservationItem = createReservationElement(reservation);
        reservationsList.appendChild(reservationItem);
    });

    // If no reservations, show a message
    if (sortedReservations.length === 0) {
        const noReservations = document.createElement('div');
        noReservations.className = 'no-reservations';
        noReservations.textContent = 'No reservations found. Click below to make one!';
        reservationsList.appendChild(noReservations);
    }
}

// Helper function to create a reservation element
function createReservationElement(reservation) {
    const reservationItem = document.createElement('div');
    reservationItem.className = 'reservation-item';

    const statusClass = reservation.status.toLowerCase();

    reservationItem.innerHTML = `
                <div class="facility-name">${reservation.facility}</div>
                <div class="reservation-details">
                    ${reservation.displayDate} • ${reservation.startTime} - ${reservation.endTime}
                </div>
                <div class="reservation-status">
                    <span class="status-badge ${statusClass}">${reservation.status}</span>
                </div>
            `;

    return reservationItem;
}

// Add this to the submitReservation function in the reservations page
function submitReservation() {
    // Get form values
    const facilityName = document.getElementById('facilityName').textContent;
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const attendees = document.getElementById('attendees').value;

    // Validate form
    if (!eventName || !eventDate || !startTime || !endTime || !attendees) {
        document.getElementById('errorMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMessage').style.display = 'none';
        }, 3000);
        return;
    }

    // Check for conflicts
    const conflicts = reservations.filter(r =>
        r.facility === facilityName &&
        r.date === eventDate &&
        ((r.startTime <= startTime && r.endTime > startTime) ||
            (r.startTime < endTime && r.endTime >= endTime) ||
            (startTime <= r.startTime && endTime > r.startTime))
    );

    if (conflicts.length > 0) {
        document.getElementById('errorMessage').textContent = 'Time slot already reserved. Please choose another time.';
        document.getElementById('errorMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('errorMessage').textContent = 'Please fill out all required fields.';
        }, 3000);
        return;
    }

    // Format date for display
    const dateObj = new Date(eventDate);
    const formattedDate = `${dateObj.toLocaleDateString('en-US', { month: 'short' })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    // Add new reservation with a status and formatted date for display
    const newReservation = {
        id: Date.now(), // Simple unique ID
        facility: facilityName,
        eventName: eventName,
        date: eventDate, // Original date format for filtering
        displayDate: formattedDate, // Formatted date for display
        startTime: startTime,
        endTime: endTime,
        attendees: attendees,
        description: document.getElementById('description').value,
        status: 'Upcoming'
    };

    reservations.push(newReservation);

    // Save to localStorage
    saveReservationsToStorage();

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Hide form and reset values
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('reservationForm').style.display = 'none';

        // Refresh calendar to show new reservation
        renderCalendar(currentMonth, currentYear);

        // Scroll back to facilities grid
        document.getElementById('facilityGrid').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Initialize everything when the document loads
document.addEventListener('DOMContentLoaded', function () {
    // Load existing reservations
    loadReservationsFromStorage();

    // Update statuses of reservations
    updateReservationStatuses();

    // Render calendar if on the reservation page
    if (document.getElementById('currentMonth')) {
        renderCalendar(currentMonth, currentYear);

        // Set min date for the date picker to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').setAttribute('min', today);
    }

    // Render dashboard reservations if on the dashboard page
    renderDashboardReservations();
});