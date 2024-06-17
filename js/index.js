document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            root.classList.remove('light');
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }
    });

    // Set initial theme
    root.classList.add('light');

    // Display current time
    const timeElement = document.getElementById('current-time');
    const updateTime = () => {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    };
    updateTime();
    setInterval(updateTime, 1000);

    // Message board functionality
    const messageForm = document.getElementById('message-form');
    const messageBoard = document.getElementById('message-board');

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageContent = document.getElementById('message-content').value;
        if (messageContent) {
            const messageElement = document.createElement('p');
            messageElement.textContent = messageContent;
            messageBoard.appendChild(messageElement);
            document.getElementById('message-content').value = '';
        }
    });
});
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var logo = document.querySelector('.logo');

    if (window.scrollY > 10) {
        header.classList.add('shrink');
        logo.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
        logo.classList.remove('shrink');
    }
});