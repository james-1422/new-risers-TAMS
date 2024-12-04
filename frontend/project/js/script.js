document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const searchForm = document.querySelector('.search-form');

    // Toggle navbar visibility
    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
    };

    // Redirect login button to another page
    document.querySelector('#login-btn').onclick = () => {
        window.location.href = "components/login.html"; // Replace "login.html" with the actual page URL
    };

    // Toggle search form visibility
    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
    };

    // Remove all active classes on scroll
    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };
});

let themeBtn = document.querySelector('#theme-btn');

themeBtn.onclick = () => {
    themeBtn.classList.toggle('fa-sun');

    if (themeBtn.classList.contains('fa-sun')) {
        document.body.classList.add('active');
    } else {
        document.body.classList.remove('active');
    }
};
