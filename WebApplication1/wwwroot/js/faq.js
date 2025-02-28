function toggleSection(sectionId) {
    console.log("Toggling section:", sectionId); // Debugging line
    const section = document.getElementById(sectionId);
    if (section.classList.contains('visible')) {
        section.classList.remove('visible');
        section.style.display = 'none'; // Hide the section
    } else {
        // Hide all other sections
        document.querySelectorAll('.content.visible').forEach(content => {
            content.classList.remove('visible');
            content.style.display = 'none'; // Hide other sections
        });
        section.classList.add('visible');
        section.style.display = 'block'; // Show the selected section
    }
}

// Initially hide the FAQ and Feedback content
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('faqContent').style.display = 'none';
    document.getElementById('feedbackContent').style.display = 'none';
});
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}