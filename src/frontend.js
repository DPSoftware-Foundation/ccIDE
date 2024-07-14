var uploadpopup = document.getElementById('upload-popup');
var aboutpopup = document.getElementById('about-popup');
var librarypopup = document.getElementById('library-popup');

document.addEventListener('DOMContentLoaded', function () {
    var tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltips.map(function (tooltip) {
        return new bootstrap.Tooltip(tooltip);
    });
});

// Event listener to close the upload-popup with fade-out effect
document.getElementById('uploadCloseBtn').addEventListener('click', function() {
    uploadpopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
    setTimeout(function() {
        uploadpopup.style.display = 'none'; // Hide popup after animation completes
        uploadpopup.style.animation = ''; // Reset animation property
    }, 300); // Adjust to match animation duration in milliseconds
});

document.getElementById('aboutCloseBtn').addEventListener('click', function() {
    aboutpopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
    setTimeout(function() {
        aboutpopup.style.display = 'none'; // Hide popup after animation completes
        aboutpopup.style.animation = ''; // Reset animation property
    }, 300); // Adjust to match animation duration in milliseconds
});

document.getElementById('libraryCloseBtn').addEventListener('click', function() {
    librarypopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
    setTimeout(function() {
        librarypopup.style.display = 'none'; // Hide popup after animation completes
        librarypopup.style.animation = ''; // Reset animation property
    }, 300); // Adjust to match animation duration in milliseconds
});

//--------------------------------

// Close the upload-popup if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target == uploadpopup) {
        uploadpopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
        setTimeout(function() {
            uploadpopup.style.display = 'none'; // Hide popup after animation completes
            uploadpopup.style.animation = ''; // Reset animation property
        }, 300); // Adjust to match animation duration in milliseconds
    }
});

window.addEventListener('click', function(event) {
    if (event.target == aboutpopup) {
        aboutpopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
        setTimeout(function() {
            aboutpopup.style.display = 'none'; // Hide popup after animation completes
            aboutpopup.style.animation = ''; // Reset animation property
        }, 300); // Adjust to match animation duration in milliseconds
    }
});

window.addEventListener('click', function(event) {
    if (event.target == librarypopup) {
        librarypopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
        setTimeout(function() {
            librarypopup.style.display = 'none'; // Hide popup after animation completes
            librarypopup.style.animation = ''; // Reset animation property
        }, 300); // Adjust to match animation duration in milliseconds
    }
});

function openlibraryselect() {
    librarypopup.style.display = 'block';
}

