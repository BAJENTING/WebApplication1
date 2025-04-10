document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');
    const deleteButton = document.getElementById('delete-event');

    // Load existing events
    loadEvents();

    // Handle form submission
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveEvent();
    });

    // Handle delete button click
    deleteButton.addEventListener('click', () => {
        deleteEvent();
    });

    function loadEvents() {
        // Fetch events from the server (for now, use the sample events)
        const events = getSampleEvents();
        eventList.innerHTML = '';

        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.title} (${event.start.toLocaleString()} - ${event.end.toLocaleString()})`;
            li.dataset.id = event.id;
            li.addEventListener('click', () => {
                loadEventIntoForm(event);
            });
            eventList.appendChild(li);
        });
    }

    function saveEvent() {
        const id = document.getElementById('event-id').value;
        const title = document.getElementById('event-title').value;
        const start = new Date(document.getElementById('event-start').value);
        const end = new Date(document.getElementById('event-end').value);
        const location = document.getElementById('event-location').value;
        const type = document.getElementById('event-type').value;

        // Save event to the server (for now, log to console)
        console.log({ id, title, start, end, location, type });

        // Reload events
        loadEvents();
    }

    function deleteEvent() {
        const id = document.getElementById('event-id').value;

        // Delete event from the server (for now, log to console)
        console.log(`Delete event with id: ${id}`);

        // Reload events
        loadEvents();
    }

    function loadEventIntoForm(event) {
        document.getElementById('event-id').value = event.id;
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-start').value = event.start.toISOString().slice(0, 16);
        document.getElementById('event-end').value = event.end.toISOString().slice(0, 16);
        document.getElementById('event-location').value = event.location;
        document.getElementById('event-type').value = event.type;
    }

    function getSampleEvents() {
        return [
            {
                id: 1,
                title: "HOA Meeting",
                start: new Date(2025, 3, 5, 19, 0),
                end: new Date(2025, 3, 5, 20, 30),
                location: "Community Center",
                type: "meeting"
            },
            {
                id: 2,
                title: "Community BBQ",
                start: new Date(2025, 3, 12, 12, 0),
                end: new Date(2025, 3, 12, 15, 0),
                location: "Central Park",
                type: "social"
            },
            // Add more sample events as needed
        ];
    }
});
