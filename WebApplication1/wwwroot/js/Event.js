// Sample events data (in a real implementation, this would come from an admin-managed database)
const events = [
    {
        id: 1,
        title: "HOA Meeting",
        start: new Date(2025, 3, 5, 19, 0), // April 5, 2025, 7:00 PM
        end: new Date(2025, 3, 5, 20, 30),  // April 5, 2025, 8:30 PM
        location: "Community Center",
        type: "meeting"
    },
    {
        id: 2,
        title: "Community BBQ",
        start: new Date(2025, 3, 12, 12, 0), // April 12, 2025, 12:00 PM
        end: new Date(2025, 3, 12, 15, 0),   // April 12, 2025, 3:00 PM
        location: "Central Park",
        type: "social"
    },
    {
        id: 3,
        title: "Neighborhood Watch Meeting",
        start: new Date(2025, 3, 20, 18, 30), // April 20, 2025, 6:30 PM
        end: new Date(2025, 3, 20, 19, 30),   // April 20, 2025, 7:30 PM
        location: "Community Hall",
        type: "meeting"
    },
    {
        id: 4,
        title: "Pool Maintenance",
        start: new Date(2025, 3, 1, 8, 0), // April 1, 2025, 8:00 AM
        end: new Date(2025, 3, 6, 17, 0),  // April 6, 2025, 5:00 PM
        location: "Community Pool",
        type: "maintenance"
    },
    {
        id: 5,
        title: "HOA Fee Due",
        start: new Date(2025, 3, 15),
        end: new Date(2025, 3, 15),
        type: "other"
    },
    {
        id: 6,
        title: "HOA Fee Adjustment",
        start: new Date(2025, 4, 1), // May 1, 2025
        end: new Date(2025, 4, 1),
        type: "other"
    }
];

// Current date and view state
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// DOM Elements
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const upcomingEventsContainer = document.getElementById('upcoming-events-container');

// Initialize calendar
function initCalendar() {
    renderCalendar();
    renderUpcomingEvents();

    // Event listeners for navigation
    prevMonthButton.addEventListener('click', () => {
        navigateMonth(-1);
    });

    nextMonthButton.addEventListener('click', () => {
        navigateMonth(1);
    });
}

// Navigate to previous/next month
function navigateMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
}

// Render the calendar
function renderCalendar() {
    // Clear existing calendar
    calendarGrid.innerHTML = '';

    // Update month/year display
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Add day headers
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of the month and total days
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Get the day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Get total days in the month
    const totalDays = lastDayOfMonth.getDate();

    // Get last day of previous month
    const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Add days from previous month
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
        const prevMonthDay = lastDayPrevMonth - i;
        const dayElement = createDayElement(prevMonthDay, true);

        // Add events for previous month
        const prevMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
        const prevYear = prevMonth === 11 ? currentYear - 1 : currentYear;
        addEventsToDay(dayElement, prevYear, prevMonth, prevMonthDay);

        calendarGrid.appendChild(dayElement);
    }

    // Add days for current month
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
        const isToday = day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

        const dayElement = createDayElement(day, false, isToday);

        // Add events
        addEventsToDay(dayElement, currentYear, currentMonth, day);

        calendarGrid.appendChild(dayElement);
    }
}

// Helper to create a day element
function createDayElement(day, isOtherMonth = false, isToday = false) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');

    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }

    if (isToday) {
        dayElement.classList.add('today');
    }

    const dayNumber = document.createElement('div');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = day;

    dayElement.appendChild(dayNumber);

    return dayElement;
}

// Add events to a day
function addEventsToDay(dayElement, year, month, day) {
    const dayEvents = events.filter(event => {
        return event.start.getFullYear() === year &&
            event.start.getMonth() === month &&
            event.start.getDate() === day;
    });

    dayEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event', event.type);
        eventElement.textContent = event.title;
        dayElement.appendChild(eventElement);
    });
}

// Render upcoming events section
function renderUpcomingEvents() {
    // Sort events by date
    const upcoming = events.filter(event => event.start > new Date()).sort((a, b) => a.start - b.start);

    upcoming.slice(0, 3).forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        const eventDate = document.createElement('div');
        eventDate.classList.add('event-date');

        const eventMonth = document.createElement('div');
        eventMonth.classList.add('month');
        eventMonth.textContent = event.start.toLocaleString('default', { month: 'short' });

        const eventDay = document.createElement('div');
        eventDay.classList.add('day');
        eventDay.textContent = event.start.getDate();

        eventDate.appendChild(eventMonth);
        eventDate.appendChild(eventDay);

        const eventDetails = document.createElement('div');
        eventDetails.classList.add('event-details');

        const eventTitle = document.createElement('h3');
        eventTitle.textContent = event.title;
        eventDetails.appendChild(eventTitle);

        const eventLocation = document.createElement('p');
        eventLocation.textContent = `Location: ${event.location}`;
        eventDetails.appendChild(eventLocation);

        eventCard.appendChild(eventDate);
        eventCard.appendChild(eventDetails);

        upcomingEventsContainer.appendChild(eventCard);
    });
}

// Initialize the page
initCalendar();
