// Nawigacja
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Usuń aktywną klasę ze wszystkich linków i sekcji
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // Aktywuj kliknięty link i odpowiadającą mu sekcję
        this.classList.add('active');
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).classList.add('active');
        
        // Zamknij menu mobilne jeśli otwarte
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
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
});

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

// Funkcje do formularzy
function showAddForm(type) {
    document.getElementById(type + 'Form').classList.remove('hidden');
}

function hideAddForm(type) {
    document.getElementById(type + 'Form').classList.add('hidden');
}

// Dodawanie pojazdu
function addVehicle() {
    const name = document.getElementById('vehicleName').value;
    const model = document.getElementById('vehicleModel').value;
    const year = document.getElementById('vehicleYear').value;
    const line = document.getElementById('vehicleLine').value;
    const status = document.getElementById('vehicleStatusSelect').value;
    const type = document.getElementById('vehicleType').value;

    if (!name || !model || !year || !line) {
        alert('Wypełnij wszystkie pola!');
        return;
    }

    const vehicleCard = document.createElement('div');
    vehicleCard.className = 'vehicle-card';
    
    let statusClass = '';
    let statusText = '';
    switch(status) {
        case 'W trasie':
            statusClass = 'status-trasie';
            statusText = 'W trasie';
            break;
        case 'Na postoju':
            statusClass = 'status-postoj';
            statusText = 'Na postoju';
            break;
        case 'Serwis':
            statusClass = 'status-serbwis';
            statusText = 'Serwis';
            break;
    }

    vehicleCard.innerHTML = `
        <div class="vehicle-image">
            <i class="fas fa-${type === 'bus' ? 'bus' : 'tram'}"></i>
        </div>
        <div class="vehicle-info">
            <h3>${name}</h3>
            <p><i class="fas fa-tag"></i> ${model}</p>
            <p><i class="fas fa-calendar"></i> Rok: ${year}</p>
            <p><i class="fas fa-map-marker-alt"></i> Linia: ${line}</p>
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
    `;

    document.getElementById('vehiclesGrid').appendChild(vehicleCard);
    
    // Wyczyść formularz
    document.getElementById('vehicleName').value = 'Autobus ';
    document.getElementById('vehicleModel').value = '';
    document.getElementById('vehicleYear').value = '';
    document.getElementById('vehicleLine').value = '';
    
    hideAddForm('vehicle');
}

// Dodawanie linii
function addLine() {
    const number = document.getElementById('lineNumber').value;
    const type = document.getElementById('lineType').value;
    const route = document.getElementById('lineRoute').value;
    const frequency = document.getElementById('lineFrequency').value;

    if (!number || !route || !frequency) {
        alert('Wypełnij wszystkie pola!');
        return;
    }

    const lineCard = document.createElement('div');
    lineCard.className = 'line-card';
    
    // Różne kolory dla różnych typów
    let color = type === 'bus' ? '#e30613' : '#0055a5';

    lineCard.innerHTML = `
        <div class="line-header">
            <span class="line-number" style="background: ${color};">${number}</span>
            <span class="line-type">
                <i class="fas fa-${type === 'bus' ? 'bus' : 'tram'}"></i> 
                ${type === 'bus' ? 'Autobus' : 'Tramwaj'}
            </span>
        </div>
        <div class="line-route">
            <i class="fas fa-arrow-right"></i>
            <span>${route}</span>
        </div>
        <div class="line-schedule">
            <span><i class="fas fa-clock"></i> ${frequency}</span>
            <span class="line-status active">Aktywna</span>
        </div>
    `;

    document.getElementById('linesList').appendChild(lineCard);
    
    // Wyczyść formularz
    document.getElementById('lineNumber').value = '';
    document.getElementById('lineRoute').value = '';
    document.getElementById('lineFrequency').value = '';
    
    hideAddForm('line');
}

// Dodaj obsługę dwukrotnego kliknięcia do usuwania
document.addEventListener('dblclick', function(e) {
    const vehicleCard = e.target.closest('.vehicle-card');
    const lineCard = e.target.closest('.line-card');
    
    if (vehicleCard && confirm('Czy na pewno usunąć ten pojazd?')) {
        vehicleCard.remove();
    }
    
    if (lineCard && confirm('Czy na pewno usunąć tę linię?')) {
        lineCard.remove();
    }
});

// Zapisz stan motywu w localStorage
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Wczytaj zapisany motyw
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
}