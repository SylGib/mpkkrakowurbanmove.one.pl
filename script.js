// Nawigacja
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        this.classList.add('active');
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).classList.add('active');
        
        document.querySelector('.nav-menu').classList.remove('show');
    });
});

// Przełącznik motywów
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Wczytaj zapisany motyw
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
}

// Menu mobilne
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Przycisk powrotu na górę
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Zamknij menu po kliknięciu poza nim
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
        navMenu.classList.remove('show');
    }
});
